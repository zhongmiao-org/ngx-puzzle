/**
 * 聚合函数沙箱 - 执行外部JavaScript代码的安全环境
 * 支持智能缓存和基础聚合函数
 */
export class AggregationSandbox {
	private readonly functionCache = new Map<
		string,
		{
			func: Function;
			lastUsed: number;
			useCount: number;
		}
	>();

	private readonly aggregationContext: any;
	private readonly MAX_CACHE_SIZE = 50;
	private readonly CACHE_TTL = 5 * 60 * 1000; // 5分钟
	private cleanupTimer?: any;

	constructor() {
		this.aggregationContext = this.createSandboxContext();
		this.startCacheCleanup();
	}

	private createSandboxContext() {
		const context = {
			// 基础聚合函数
			sum: (data: any[], field?: string): number => {
				if (!Array.isArray(data)) return 0;
				let total = 0;
				for (const item of data) {
					const value = field ? item[field] : item;
					total += Number(value) || 0;
				}
				return total;
			},

			avg: (data: any[], field?: string): number => {
				if (!Array.isArray(data) || data.length === 0) return 0;
				return context.sum(data, field) / data.length;
			},

			count: (data: any[]): number => {
				return Array.isArray(data) ? data.length : 0;
			},

			max: (data: any[], field?: string): number | null => {
				if (!Array.isArray(data) || data.length === 0) return null;
				let maxVal = -Infinity;
				for (const item of data) {
					const value = Number(field ? item[field] : item) || 0;
					if (value > maxVal) maxVal = value;
				}
				return maxVal === -Infinity ? null : maxVal;
			},

			min: (data: any[], field?: string): number | null => {
				if (!Array.isArray(data) || data.length === 0) return null;
				let minVal = Infinity;
				for (const item of data) {
					const value = Number(field ? item[field] : item) || 0;
					if (value < minVal) minVal = value;
				}
				return minVal === Infinity ? null : minVal;
			},

			// 数组操作函数
			filter: (data: any[], predicate: (item: any, index: number) => boolean): any[] => {
				if (!Array.isArray(data)) return [];
				return data.filter(predicate);
			},

			map: (data: any[], mapper: (item: any, index: number) => any): any[] => {
				if (!Array.isArray(data)) return [];
				return data.map(mapper);
			},

			groupBy: (data: any[], field: string): Record<string, any[]> => {
				if (!Array.isArray(data)) return {};
				const groups: Record<string, any[]> = {};
				for (const item of data) {
					const key = String(item[field]);
					if (!groups[key]) groups[key] = [];
					groups[key].push(item);
				}
				return groups;
			},

			sortBy: (data: any[], field: string, order: 'asc' | 'desc' = 'asc'): any[] => {
				if (!Array.isArray(data)) return [];
				const result = [...data];
				result.sort((a, b) => {
					const aVal = a[field];
					const bVal = b[field];
					if (aVal > bVal) return order === 'desc' ? -1 : 1;
					if (aVal < bVal) return order === 'desc' ? 1 : -1;
					return 0;
				});
				return result;
			},

			unique: (data: any[], field?: string): any[] => {
				if (!Array.isArray(data)) return [];
				if (field) {
					const seen = new Set();
					return data.filter((item) => {
						const value = item[field];
						if (seen.has(value)) return false;
						seen.add(value);
						return true;
					});
				} else {
					return [...new Set(data)];
				}
			},

			take: (data: any[], count: number): any[] => {
				if (!Array.isArray(data)) return [];
				return data.slice(0, count);
			},

			skip: (data: any[], count: number): any[] => {
				if (!Array.isArray(data)) return [];
				return data.slice(count);
			},

			// 分组聚合
			groupSum: (data: any[], groupField: string, sumField: string): any[] => {
				const groups = context.groupBy(data, groupField);
				return Object.entries(groups).map(([key, items]) => ({
					group: key,
					sum: context.sum(items, sumField),
					count: items.length,
					data: items,
				}));
			},

			groupAvg: (data: any[], groupField: string, avgField: string): any[] => {
				const groups = context.groupBy(data, groupField);
				return Object.entries(groups).map(([key, items]) => ({
					group: key,
					avg: context.avg(items, avgField),
					count: items.length,
					data: items,
				}));
			},
			// 多字段分组聚合
			groupMultiSum: (data: any[], groupField: string, sumFields: string[]): any[] => {
				const groups = context.groupBy(data, groupField);
				return Object.entries(groups).map(([key, items]) => {
					const result: any = {
						group: key,
						count: items.length,
						data: items,
					};

					// 为每个字段计算聚合值
					sumFields.forEach((field) => {
						result[`${field}_sum`] = context.sum(items, field);
						result[`${field}_avg`] = Math.round(context.avg(items, field));
						result[`${field}_max`] = context.max(items, field);
						result[`${field}_min`] = context.min(items, field);
					});

					return result;
				});
			},

			// 简化版多字段求和
			groupSumMulti: (data: any[], groupField: string, ...sumFields: string[]): any[] => {
				const groups = context.groupBy(data, groupField);
				return Object.entries(groups).map(([key, items]) => {
					const result: any = {
						group: key,
						count: items.length,
					};

					// 只计算求和
					sumFields.forEach((field) => {
						result[field] = context.sum(items, field);
					});

					return result;
				});
			},

			// 时间序列聚合
			timeSeriesSum: (data: any[], dateField: string, valueField: string): any[] => {
				if (!Array.isArray(data)) return [];
				const grouped = data.reduce((acc, item) => {
					const date = new Date(item[dateField]).toISOString().split('T')[0];
					if (!acc[date]) {
						acc[date] = 0;
					}
					acc[date] += Number(item[valueField]) || 0;
					return acc;
				}, {});
				return Object.entries(grouped)
					.sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
					.map(([date, value]) => ({ date: new Date(date), value }));
			},

			// 工具函数
			Math,
			isArray: Array.isArray,
			isObject: (value: any): boolean => value !== null && typeof value === 'object' && !Array.isArray(value),
			isNumber: (value: any): boolean => typeof value === 'number' && !isNaN(value),
			isString: (value: any): boolean => typeof value === 'string',

			// 调试输出
			console: {
				log: (...args: any[]) => {
					if (typeof console !== 'undefined' && console.log) {
						console.log('[聚合沙箱]', ...args);
					}
				},
			},
		};

		return Object.freeze(context);
	}

	/**
	 * 执行JavaScript代码 - 兼容parseFunctions的使用方式
	 * @param functionString JavaScript函数字符串
	 * @param data 输入数据
	 * @returns 执行结果
	 */
	execute(functionString: string, data: any): any {
		try {
			// 检查智能缓存
			let cached = this.functionCache.get(functionString);

			if (cached) {
				// 更新使用统计
				cached.lastUsed = Date.now();
				cached.useCount++;
				return cached.func(data);
			}

			// 编译新函数
			const compiledFunction = this.compileFunction(functionString);

			// 智能缓存管理
			this.manageCache(functionString, compiledFunction);

			// 执行函数
			return compiledFunction(data);
		} catch (error) {
			console.error('[聚合沙箱] 执行失败:', error);
			console.error('[聚合沙箱] 函数字符串:', functionString);
			throw error;
		}
	}

	private compileFunction(functionString: string): Function {
		// 安全性检查
		if (!this.isSafeFunctionString(functionString)) {
			throw new Error('不安全的函数字符串');
		}

		try {
			// 处理不同的函数格式
			const normalizedFunction = this.normalizeFunction(functionString);

			// 提取上下文变量，避免使用with语句
			const contextKeys = Object.keys(this.aggregationContext);
			const contextValues = Object.values(this.aggregationContext);

			// 创建参数列表：data + 所有上下文变量
			const parameterList = ['data', ...contextKeys];

			// 构建函数体，直接调用归一化后的函数
			const functionBody = `
        return (${normalizedFunction})(data);
      `;

			// 创建新函数，将上下文变量作为参数传入
			const func = new Function(...parameterList, functionBody);

			// 返回绑定了上下文的函数
			return (data: any) => func(data, ...contextValues);
		} catch (error) {
			throw new Error(`函数编译失败: ${error}`);
		}
	}

	private normalizeFunction(functionString: string): string {
		let trimmed = functionString.trim();

		// 处理箭头函数: (data) => { ... }
		const arrowMatch = trimmed.match(/^\s*\(\s*(\w+)\s*\)\s*=>\s*\{([\s\S]*)\}\s*$/);
		if (arrowMatch) {
			const paramName = arrowMatch[1];
			const functionBody = arrowMatch[2];
			return `function(${paramName}) { ${functionBody} }`;
		}

		// 处理简化箭头函数: (data) => expression
		const simpleArrowMatch = trimmed.match(/^\s*\(\s*(\w+)\s*\)\s*=>\s*(.+)$/);
		if (simpleArrowMatch) {
			const paramName = simpleArrowMatch[1];
			const expression = simpleArrowMatch[2];
			return `function(${paramName}) { return ${expression}; }`;
		}

		// 处理普通函数
		if (trimmed.startsWith('function')) {
			return trimmed;
		}

		// 其他情况，尝试包装为函数
		return `function(data) { return (${trimmed}); }`;
	}

	private isSafeFunctionString(str: string): boolean {
		const dangerousPatterns = [
			/\b(eval|Function|setTimeout|setInterval|setImmediate)\b/,
			/\b(window|document|global|globalThis|self|top|parent|frames)\b/,
			/\b(process|require|import|export|module)\b/,
			/\b(XMLHttpRequest|fetch|WebSocket|EventSource)\b/,
			/\.constructor|__proto__|prototype/,
			/delete\s+/,
			/\bthrow\s+/,
		];

		return !dangerousPatterns.some((pattern) => pattern.test(str));
	}

	private manageCache(functionString: string, compiledFunction: Function) {
		// 如果缓存已满，清理最不常用的
		if (this.functionCache.size >= this.MAX_CACHE_SIZE) {
			this.evictLeastUsed();
		}

		// 添加到缓存
		this.functionCache.set(functionString, {
			func: compiledFunction,
			lastUsed: Date.now(),
			useCount: 1,
		});
	}

	private evictLeastUsed() {
		let leastUsedKey = '';
		let lowestScore = Infinity;

		for (const [key, cache] of this.functionCache) {
			// 综合考虑使用频率和最后使用时间
			const timeFactor = Date.now() - cache.lastUsed;
			const useFactor = 1 / (cache.useCount + 1);
			const score = timeFactor * 0.7 + useFactor * 0.3;

			if (score < lowestScore) {
				lowestScore = score;
				leastUsedKey = key;
			}
		}

		if (leastUsedKey) {
			this.functionCache.delete(leastUsedKey);
		}
	}

	private startCacheCleanup() {
		this.cleanupTimer = setInterval(() => {
			const now = Date.now();
			for (const [key, cache] of this.functionCache) {
				if (now - cache.lastUsed > this.CACHE_TTL) {
					this.functionCache.delete(key);
				}
			}
		}, 60000); // 每分钟清理一次
	}

	/**
	 * 获取缓存统计
	 */
	getCacheStats() {
		return {
			size: this.functionCache.size,
			maxSize: this.MAX_CACHE_SIZE,
			entries: Array.from(this.functionCache.entries()).map(([key, cache]) => ({
				key: key.substring(0, 50) + '...',
				useCount: cache.useCount,
				lastUsed: new Date(cache.lastUsed).toLocaleString(),
			})),
		};
	}

	/**
	 * 清理缓存
	 */
	clearCache() {
		this.functionCache.clear();
	}

	/**
	 * 销毁沙箱
	 */
	destroy() {
		if (this.cleanupTimer) {
			clearInterval(this.cleanupTimer);
		}
		this.clearCache();
	}
}

/**
 * 创建类似于parseFunctions的函数 - 兼容现有使用方式
 */
export function createAggregationParser() {
	const sandbox = new AggregationSandbox();

	return (functionString: string, context?: any) => {
		return (data: any) => {
			return sandbox.execute(functionString, data);
		};
	};
}

/**
 * 全局单例沙箱实例 - 用于性能优化
 */
let globalSandbox: AggregationSandbox | null = null;

/**
 * 获取全局沙箱实例
 */
export function getGlobalSandbox(): AggregationSandbox {
	if (!globalSandbox) {
		globalSandbox = new AggregationSandbox();
	}
	return globalSandbox;
}

/**
 * 简化版执行函数 - 直接使用全局沙箱
 */
export function executeAggregation(functionString: string, data: any): any {
	return getGlobalSandbox().execute(functionString, data);
}

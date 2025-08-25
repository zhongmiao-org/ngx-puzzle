
export class SafeTimeConverter {
	private static readonly TIME_FIELD_PATTERNS = [
		/.*date$/i, /.*time$/i, /.*at$/i, /^date.*/i, /^time.*/i,
		/timestamp/i, /expire/i, /start/i, /end/i, /begin/i, /finish/i,
		/created/i, /updated/i, /modified/i, /deleted/i, /published/i,
		/scheduled/i, /deadline/i, /due/i, /expires/i, /valid/i
	];

	private static readonly ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;

	/**
	 * 时区偏移量（小时）- 默认减去8小时（UTC+8转换为UTC）
	 */
	private static readonly TIMEZONE_OFFSET_HOURS = 8;

	/**
	 * 转换数据中的时间字段，统一减去8小时
	 * @param data 原始数据数组
	 * @returns 转换后的数据数组
	 */
	static convertTimeFields(data: any[]): any[] {
		if (!data || !Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			if (!item || typeof item !== 'object') {
				return item;
			}

			const convertedItem = { ...item };

			Object.keys(convertedItem).forEach(key => {
				const value = convertedItem[key];

				if (this.isTimeField(key) && this.isTimeString(value)) {
					convertedItem[key] = this.parseAndAdjustTime(value);
				}
			});

			return convertedItem;
		});
	}

	/**
	 * 解析时间字符串并减去8小时
	 * @param dateString ISO 格式的时间字符串
	 * @returns 调整后的 Date 对象
	 */
	private static parseAndAdjustTime(dateString: string): Date {
		if (!dateString || typeof dateString !== 'string') {
			return new Date(dateString);
		}

		// 解析 ISO 字符串的各个部分
		const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{3})?Z?$/);

		if (match) {
			const [, year, month, day, hour, minute, second, millisecond] = match;

			// 创建 UTC 时间戳
			const utcTimestamp = Date.UTC(
				parseInt(year, 10),
				parseInt(month, 10) - 1, // 月份从0开始
				parseInt(day, 10),
				parseInt(hour, 10),
				parseInt(minute, 10),
				parseInt(second, 10),
				millisecond ? parseInt(millisecond.slice(1), 10) : 0
			);

			// 减去8小时 (8 * 60 * 60 * 1000 毫秒)
			const adjustedTimestamp = utcTimestamp - (this.TIMEZONE_OFFSET_HOURS * 60 * 60 * 1000);

			return new Date(adjustedTimestamp);
		}

		// 如果格式不匹配，使用原生解析方式，然后减去8小时
		const originalDate = new Date(dateString);

		if (!isNaN(originalDate.getTime())) {
			const adjustedTimestamp = originalDate.getTime() - (this.TIMEZONE_OFFSET_HOURS * 60 * 60 * 1000);
			return new Date(adjustedTimestamp);
		}

		return originalDate;
	}

	/**
	 * 判断字段名是否为时间字段
	 * @param fieldName 字段名
	 * @returns 是否为时间字段
	 */
	private static isTimeField(fieldName: string): boolean {
		if (!fieldName || typeof fieldName !== 'string') {
			return false;
		}

		return this.TIME_FIELD_PATTERNS.some(pattern => pattern.test(fieldName));
	}

	/**
	 * 判断值是否为时间字符串
	 * @param value 待判断的值
	 * @returns 是否为时间字符串
	 */
	private static isTimeString(value: any): boolean {
		return typeof value === 'string' && this.ISO_DATE_REGEX.test(value);
	}

	/**
	 * 手动调整指定 Date 对象的时间（减去8小时）
	 * @param date 原始 Date 对象
	 * @returns 调整后的 Date 对象
	 */
	static adjustTimeZone(date: Date): Date {
		if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
			return date;
		}

		const adjustedTimestamp = date.getTime() - (this.TIMEZONE_OFFSET_HOURS * 60 * 60 * 1000);
		return new Date(adjustedTimestamp);
	}

	/**
	 * 将调整后的时间转换为显示格式
	 * @param date 调整后的 Date 对象
	 * @param format 格式化选项
	 * @returns 格式化后的时间字符串
	 */
	static formatAdjustedTime(date: Date, format: 'date' | 'datetime' | 'time' = 'datetime'): string {
		if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
			return '';
		}

		const options: Intl.DateTimeFormatOptions = {
			timeZone: 'UTC', // 使用 UTC 时区显示
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		};

		if (format === 'datetime' || format === 'time') {
			options.hour = '2-digit';
			options.minute = '2-digit';
			options.second = '2-digit';
			options.hour12 = false;
		}

		if (format === 'time') {
			delete options.year;
			delete options.month;
			delete options.day;
		}

		return new Intl.DateTimeFormat('sv-SE', options).format(date);
	}

	/**
	 * 批量调整时间数组
	 * @param dates Date 对象数组
	 * @returns 调整后的 Date 对象数组
	 */
	static adjustTimeArray(dates: Date[]): Date[] {
		if (!dates || !Array.isArray(dates)) {
			return [];
		}

		return dates.map(date => this.adjustTimeZone(date));
	}
}

/**
 * 处理图表数据，转换时间字段并按时间排序
 * @param rawData 原始数据数组
 * @param sortField 排序字段，默认为 'prodDate'
 * @param sortOrder 排序顺序，'asc' 为升序，'desc' 为降序
 * @returns 处理后的数据数组
 */
export function processChartData(
	rawData: any[],
	sortField: string = 'prodDate',
	sortOrder: 'asc' | 'desc' = 'asc'
): any[] {
	if (!rawData || !Array.isArray(rawData)) {
		console.warn('processChartData: 输入数据不是有效数组');
		return [];
	}

	try {
		// 转换时间字段（减去8小时）
		const convertedData = SafeTimeConverter.convertTimeFields(rawData);

		// 按指定字段排序
		const sortedData = convertedData.sort((a, b) => {
			const valueA = a[sortField];
			const valueB = b[sortField];

			// 处理空值
			if (!valueA && !valueB) return 0;
			if (!valueA) return sortOrder === 'asc' ? 1 : -1;
			if (!valueB) return sortOrder === 'asc' ? -1 : 1;

			// 获取时间戳进行比较
			const timeA = valueA instanceof Date ? valueA.getTime() : new Date(valueA).getTime();
			const timeB = valueB instanceof Date ? valueB.getTime() : new Date(valueB).getTime();

			// 处理无效日期
			if (isNaN(timeA) && isNaN(timeB)) return 0;
			if (isNaN(timeA)) return sortOrder === 'asc' ? 1 : -1;
			if (isNaN(timeB)) return sortOrder === 'asc' ? -1 : 1;

			const diff = timeA - timeB;
			return sortOrder === 'asc' ? diff : -diff;
		});

		// 处理完成，所有时间已减去8小时

		return sortedData;

	} catch (error) {
		console.error('processChartData: 处理数据时发生错误', error);
		return rawData; // 出错时返回原始数据
	}
}

/**
 * 批量处理多个数据源的时间字段
 * @param dataSources 数据源数组
 * @returns 处理后的数据源数组
 */
export function processMultipleDataSources(dataSources: any[][]): any[][] {
	if (!dataSources || !Array.isArray(dataSources)) {
		return [];
	}

	return dataSources.map(dataSource => processChartData(dataSource));
}

/**
 * 验证和修复时间数据
 * @param data 数据数组
 * @param timeFields 时间字段数组
 * @returns 验证和修复结果
 */
export function validateAndFixTimeData(data: any[], timeFields: string[]): {
	isValid: boolean;
	fixedData: any[];
	errors: string[];
	statistics: {
		totalRecords: number;
		validRecords: number;
		fixedRecords: number;
		invalidRecords: number;
	};
} {
	const errors: string[] = [];
	const fixedData: any[] = [];
	let validRecords = 0;
	let fixedRecords = 0;

	data.forEach((item, index) => {
		const fixedItem = { ...item };
		let itemNeedsFix = false;

		timeFields.forEach(field => {
			const value = fixedItem[field];

			if (value) {
				if (typeof value === 'string' && SafeTimeConverter['isTimeString'](value)) {
					// 正常的时间字符串，进行时区调整
					fixedItem[field] = SafeTimeConverter['parseAndAdjustTime'](value);
				} else if (value instanceof Date) {
					// 已经是 Date 对象，进行时区调整
					fixedItem[field] = SafeTimeConverter.adjustTimeZone(value);
				} else {
					// 尝试修复无效的时间格式
					try {
						const parsedDate = new Date(value);
						if (!isNaN(parsedDate.getTime())) {
							fixedItem[field] = SafeTimeConverter.adjustTimeZone(parsedDate);
							itemNeedsFix = true;
						} else {
							errors.push(`记录 ${index + 1} 的字段 "${field}" 无法解析: ${value}`);
						}
					} catch (e) {
						errors.push(`记录 ${index + 1} 的字段 "${field}" 解析失败: ${value}`);
					}
				}
			}
		});

		if (itemNeedsFix) {
			fixedRecords++;
		} else {
			validRecords++;
		}

		fixedData.push(fixedItem);
	});

	return {
		isValid: errors.length === 0,
		fixedData,
		errors,
		statistics: {
			totalRecords: data.length,
			validRecords,
			fixedRecords,
			invalidRecords: data.length - validRecords - fixedRecords
		}
	};
}

import { Injectable } from '@angular/core';
import { executeAggregation, getGlobalSandbox } from 'ngx-puzzle/core/utils';

@Injectable({
	providedIn: 'root'
})
export class AggregationService {
	/**
	 * 执行聚合函数 - 推荐使用这个方法
	 */
	execute(functionString: string, data: any): any {
		return executeAggregation(functionString, data);
	}

	/**
	 * 兼容parseFunctions的使用方式
	 */
	parseFunctions(functionString: string, context?: any) {
		return (data: any) => executeAggregation(functionString, data);
	}

	/**
	 * 获取缓存统计
	 */
	getCacheStats() {
		return getGlobalSandbox().getCacheStats();
	}

	/**
	 * 清理缓存
	 */
	clearCache() {
		getGlobalSandbox().clearCache();
	}
}

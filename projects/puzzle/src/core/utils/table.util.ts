// // import { ColDef } from 'ag-grid-community';
// import { SafeAny } from '../../core';
//
// /**
//  * 使用 columnDefs 中的 lookups 信息格式化数据
//  * @param data 原始数据数组
//  * @param columnDefs 列定义数组，包含 lookups 信息
//  * @returns 格式化后的数据数组
//  */
// export function formatDataWithLookups(data: SafeAny[], columnDefs: ColDef[]): SafeAny[] {
// 	if (!data || data.length === 0 || !columnDefs || columnDefs.length === 0) {
// 		return data;
// 	}
//
// 	// 创建字段到lookups的映射，便于快速查找
// 	const fieldLookupsMap = new Map<string, Record<string | number, string>>();
//
// 	columnDefs.forEach((colDef) => {
// 		const lookups = (colDef as any).lookups;
// 		if (colDef.field && lookups) {
// 			fieldLookupsMap.set(colDef.field, lookups);
// 		}
// 	});
//
// 	// 如果没有任何需要转换的字段，直接返回原数据
// 	if (fieldLookupsMap.size === 0) {
// 		return data;
// 	}
//
// 	// 格式化每行数据
// 	return data.map((row) => {
// 		const formattedRow = { ...row };
//
// 		fieldLookupsMap.forEach((lookups, fieldName) => {
// 			if (row.hasOwnProperty(fieldName)) {
// 				const originalValue = row[fieldName];
// 				const formattedValue = lookups[originalValue];
//
// 				// 如果找到对应的标签，则替换；否则保持原值
// 				if (formattedValue !== undefined) {
// 					formattedRow[fieldName] = formattedValue;
// 				}
// 			}
// 		});
//
// 		return formattedRow;
// 	});
// }
//
// /**
//  * 使用 columnDefs 中的 fieldType 信息格式化日期和时间戳数据
//  * 专门处理 ISO 格式的日期字符串 (如: 2025-08-14T00:00:00Z)
//  * @param data 原始数据数组
//  * @param columnDefs 列定义数组，包含 fieldType 信息
//  * @returns 格式化后的数据数组
//  */
// export function formatDataWithDateTimezone(data: SafeAny[], columnDefs: ColDef[]): SafeAny[] {
// 	if (!data || data.length === 0 || !columnDefs || columnDefs.length === 0) {
// 		return data;
// 	}
//
// 	// 创建字段到日期类型的映射
// 	const fieldDateTypeMap = new Map<string, string>();
//
// 	columnDefs.forEach((colDef) => {
// 		const fieldType = (colDef as any).fieldType;
// 		if (colDef.field && fieldType && (fieldType === 'DATE' || fieldType === 'TIMESTAMP')) {
// 			fieldDateTypeMap.set(colDef.field, fieldType);
// 		}
// 	});
//
// 	// 如果没有需要转换的日期字段，直接返回原数据
// 	if (fieldDateTypeMap.size === 0) {
// 		return data;
// 	}
//
// 	// 格式化每行数据
// 	return data.map((row) => {
// 		const formattedRow = { ...row };
//
// 		fieldDateTypeMap.forEach((fieldType, fieldName) => {
// 			if (row.hasOwnProperty(fieldName)) {
// 				const originalValue = row[fieldName];
//
// 				// 保留空值，直接返回 null
// 				if (originalValue === null || originalValue === undefined || originalValue === '') {
// 					formattedRow[fieldName] = null;
// 					return;
// 				}
//
// 				// 只处理字符串类型的 ISO 日期格式
// 				if (typeof originalValue === 'string' && originalValue.includes('T') && originalValue.includes('Z')) {
// 					const date = new Date(originalValue);
//
// 					if (fieldType === 'DATE') {
// 						// DATE 类型只显示日期部分: 2025-08-14
// 						formattedRow[fieldName] = date.toISOString().split('T')[0];
// 					} else if (fieldType === 'TIMESTAMP') {
// 						// TIMESTAMP 类型显示日期和时间: 2025-08-14 00:00:00
// 						formattedRow[fieldName] = date.toISOString().replace('T', ' ').replace('Z', '');
// 					}
// 				}
// 			}
// 		});
//
// 		return formattedRow;
// 	});
// }
//
// /**
//  * 综合格式化函数，同时处理 lookups 和日期时间格式化
//  * @param data 原始数据数组
//  * @param columnDefs 列定义数组
//  * @returns 格式化后的数据数组
//  */
// export function formatDataWithLookupsAndDateTime(data: SafeAny[], columnDefs: ColDef[]): SafeAny[] {
// 	// 先应用 lookups 格式化
// 	let formattedData = formatDataWithLookups(data, columnDefs);
//
// 	// 再应用日期时间格式化
// 	formattedData = formatDataWithDateTimezone(formattedData, columnDefs);
//
// 	return formattedData;
// }
//

import { EditorBaseField } from 'ngx-puzzle/core/interfaces';

export function convertFormDataToOptions<TOptions, TEditorField extends EditorBaseField>(
	form: Record<string, any>,
	editorOptions: TOptions,
	editorFields: TEditorField[],
): TOptions {
	const newOptions = { ...editorOptions };

	const processFields = (fields: any[], formData: Record<string, any>, options: TOptions) => {
		for (const field of fields) {
			if (field.schemaType === 'group' && field.fields) {
				processFields(field.fields, formData, options);
			} else if (field.schemaType === 'array') {
				const arrayForm = formData[field.key] || [];
				const arrayValue = arrayForm.map((itemForm: any) => {
					const item: Record<string, any> = {};
					for (const itemField of field.fields || []) {
						// 没有值就不赋值了
						const value = itemForm[itemField.key];
						if (
							value === undefined ||
							(itemField.schemaType === 'color' && itemForm[itemField.key] === '') ||
							(itemField.schemaType === 'multiColorSelect' && !itemForm[itemField.key].length)
						) {
							continue;
						}
						if (itemField.path?.includes('.')) {
							setOptionValue(item, itemField.path!, itemForm[itemField.key]);
						} else {
							item[itemField.key] = itemForm[itemField.key];
						}
					}
					return item;
				});
				setOptionValue(options, field.path!, arrayValue);
			} else {
				setOptionValue(options, field.path!, formData[field.key]);
			}
		}
	};

	for (const field of editorFields) {
		if (field.schemaType === 'group' && field.fields) {
			// Handle group fields with children
			processFields(field.fields, form, newOptions);
		} else if (field.schemaType === 'array') {
			// Handle direct fields (like series and axes) that don't have children
			processFields([field], form, newOptions);
		}
	}

	return newOptions;
}

export function convertOptionsToFormData<TOptions, TEditorField extends EditorBaseField>(
	options: TOptions,
	editorFields: TEditorField[],
): Record<string, any> {
	const form: Record<string, any> = {};

	const processFields = (fields: any[], formData: Record<string, any>) => {
		for (const field of fields) {
			if (field.schemaType === 'group' && field.fields) {
				processFields(field.fields, formData);
			} else if (field.schemaType === 'array') {
				const arrayData = getOptionValue(field.path!, options) || [];
				formData[field.key] = arrayData.map((item: any) => {
					const itemForm: Record<string, any> = {};
					for (const itemField of field.fields || []) {
						if (itemField.path?.includes('.')) {
							// 嵌套路径
							itemForm[itemField.key] = getOptionValue(itemField.path!, item);
						} else {
							itemForm[itemField.key] = item[itemField.key];
						}
					}
					return itemForm;
				});
			} else {
				formData[field.key] = getOptionValue(field.path!, options);
			}
		}
	};

	for (const field of editorFields) {
		if (field.schemaType === 'group' && field.fields) {
			// Handle group fields with children
			processFields(field.fields, form);
		} else if (field.schemaType === 'array') {
			// Handle direct fields (like series and axes) that don't have children
			processFields([field], form);
		}
	}
	return form;
}

export function setOptionValue(options: any, path: string, value: any): void {
	const keys = path.split('.');
	let obj = options;
	for (let i = 0; i < keys.length - 1; i++) {
		obj[keys[i]] ??= {};
		obj = obj[keys[i]];
	}
	obj[keys[keys.length - 1]] = value;
}

export function getOptionValue(path: string, options: any): any {
	return path.split('.').reduce((o, p) => o?.[p], options);
}

export function updateFormData(
	formData: Record<string, any>,
	key: string,
	value: any,
	parentKey?: string,
	index?: number,
): Record<string, any> {
	// 先复制一份当前表单数据（或 _options）用于更新
	let updatedFormData = { ...formData };
	if (parentKey !== undefined && index !== undefined) {
		// 更新数组字段中的某项的某个字段
		const arrayCopy = [...updatedFormData[parentKey]]; // 克隆数组
		const itemCopy = { ...arrayCopy[index] }; // 克隆当前项
		itemCopy[key] = value; // 修改子字段
		arrayCopy[index] = itemCopy; // 替换原数组中的项
		updatedFormData[parentKey] = arrayCopy; // 替换更新后的数组
	} else {
		// 普通字段更新
		updatedFormData[key] = value;
	}
	return updatedFormData;
}

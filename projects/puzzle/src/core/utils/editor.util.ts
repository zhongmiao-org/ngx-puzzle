import { EditorBaseField } from '../../core';
import { isEqual } from 'lodash';

export function convertFormDataToOptions<TOptions, TEditorField extends EditorBaseField>(
  form: Record<string, any>,
  editorOptions: TOptions,
  editorFields: TEditorField[]
): TOptions {
  const newOptions = { ...editorOptions };

  const processFields = (fields: any[], formData: Record<string, any>, options: TOptions) => {
    for (const field of fields) {
      // 跳过标记为不转换的字段
      if (field?.skipConversion) {
        continue;
      }
      if (field.schemaType === 'group' && field.children) {
        processFields(field.children, formData, options);
      } else if (field.schemaType === 'array') {
        const arrayForm = formData[field.key] || [];
        const arrayValue = arrayForm.map((itemForm: any) => {
          const item: Record<string, any> = {};
          // 使用 children 而不是 itemSchema
          for (const itemField of field.children || []) {
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
              setOptionValue(item, itemField.path, itemForm[itemField.key]);
            } else {
              item[itemField.key] = itemForm[itemField.key];
            }
          }
          return item;
        });
        // 添加 path 检查
        if (field.path) {
          setOptionValue(options, field.path, arrayValue);
        } else {
          console.warn('convertFormDataToOptions: field.path is missing for array field', field);
        }
      } else {
        const value = formData[field.key];
        if (
          value === undefined ||
          (field.schemaType === 'color' && value === '') ||
          (field.schemaType === 'multiColorSelect' && Array.isArray(value) && value.length === 0)
        ) {
          continue;
        }
        // 添加 path 检查
        if (field.path) {
          setOptionValue(options, field.path, value);
        } else {
          console.warn('convertFormDataToOptions: field.path is missing for field', field);
        }
      }
    }
  };

  // 直接处理 editorFields，不再区分 section 层级
  processFields(editorFields, form, newOptions);

  return newOptions;
}


export function convertOptionsToFormData<TOptions, TEditorField extends EditorBaseField>(
  options: TOptions | null | undefined,
  editorFields: TEditorField[]
): Record<string, any> {
  const form: Record<string, any> = {};
  const safeOptions = options || ({} as TOptions);

  const processFields = (fields: any[], formData: Record<string, any>) => {
    for (const field of fields) {
      // 跳过标记为不转换的字段
      if (field?.skipConversion) {
        continue;
      }

      if (field.schemaType === 'group' && field.children) {
        processFields(field.children, formData);
      } else if (field.schemaType === 'array') {
        const arrayData = getOptionValue(field.path, safeOptions) || [];
        formData[field.key] = arrayData.map((item: any) => {
          const itemForm: Record<string, any> = {};
          // 使用 children 而不是 itemSchema
          for (const itemField of field.children || []) {
            if (itemField.path?.includes('.')) {
              itemForm[itemField.key] = getOptionValue(itemField.path, item, itemField.defaultValue);
            } else {
              const value = item[itemField.key];
              itemForm[itemField.key] = value === undefined && itemField.defaultValue !== undefined ? itemField.defaultValue : value;
            }
          }
          return itemForm;
        });
      } else {
        formData[field.key] = getOptionValue(field.path, safeOptions, field.defaultValue);
      }
    }
  };

  // 直接处理 editorFields，不再区分 section 层级
  processFields(editorFields, form);

  return form;
}

export function setOptionValue(options: any, path: string, value: any): void {
  // 添加安全检查
  if (!path) {
    console.warn('setOptionValue: path is invalid', path);
    return;
  }

  const keys = path.split('.');
  let obj = options;
  for (let i = 0; i < keys.length - 1; i++) {
    obj[keys[i]] ??= {};
    obj = obj[keys[i]];
  }
  obj[keys[keys.length - 1]] = value;
}

export function getOptionValue(path: string, options: any, defaultValue?: any): any {
  // 添加安全检查
  if (!path) {
    console.warn('getOptionValue: path is invalid', path);
    return defaultValue;
  }

  let value = path.split('.').reduce((o, p) => o?.[p], options);
  if (defaultValue !== undefined) {
    value = value ?? defaultValue;
  }
  return value;
}

export function updateFormData(
  formData: Record<string, any>,
  key: string,
  value: any,
  parentKey?: string,
  index?: number
): Record<string, any> {
  let currentValue: any;

  // 获取当前值用于比较
  if (parentKey !== undefined && index !== undefined) {
    // 数组字段中的某项的某个字段
    currentValue = formData[parentKey]?.[index]?.[key];
  } else {
    // 普通字段
    currentValue = formData[key];
  }

  // 使用 lodash 的 isEqual 进行深度比较
  if (isEqual(currentValue, value)) {
    // 值没有变化，直接返回原始 formData
    return formData;
  }

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

export function valueFormatter() {}

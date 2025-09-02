// table 配置 (ngx-tethys)
import { fieldComponentTypes, SafeAny } from '../types';
import { BaseSelectOption, EditorBaseField, ComponentBaseProps } from 'ngx-puzzle/core';

export interface ComponentTableProps<TData = SafeAny> extends ComponentBaseProps {
  table: TableConfig<TData>;
}

// 列配置（对齐 thy-table 常见列属性）
export interface TableColumnDef {
  field: string;
  header: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  resizable?: boolean;
  fixed?: 'left' | 'right' | null;
  hidden?: boolean;
  type?: 'text' | 'number' | 'date' | 'tag' | 'custom';
}

export interface TableConfig<TData = SafeAny> {
  rowDataUrl: string;
  columns?: TableColumnDef[];
  rowData?: TData[];
  // 表级属性（对齐 thy-table 能力，保留常用项）
  size?: 'sm' | 'md' | 'lg';
  bordered?: boolean;
  striped?: boolean;
  hover?: boolean;
  rowSelection?: 'none' | 'single' | 'multiple';
  virtualScroll?: boolean;
  pageIndex?: number;
  pageSize?: number;
  total?: number;
  rowKey?: string;
  stickyHeader?: boolean;
  tableStyles: Record<string, SafeAny>;
}

// 表格组件字段（编辑器）
export interface EditorTableField<TData = any> extends EditorBaseField {
  headerSetting?: EditorTableHeader[];
  rowData?: TData[];
  children?: EditorTableField[];
  options?: BaseSelectOption[];
}

export interface EditorTableHeader {
  field: string;
  headerName: string;
  schemaType: fieldComponentTypes;
  clearable?: boolean;
  options?: BaseSelectOption[];
}

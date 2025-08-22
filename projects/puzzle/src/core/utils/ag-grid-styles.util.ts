import { hexToRgbString } from './util';


/**
 * 样式缓存管理器
 */
export class AgGridStyleCache {
	private _lastStylesString: string = '';
	private _cachedStyles: Record<string, string> | null = null;

	/**
	 * 获取缓存的样式，如果样式发生变化则重新生成
	 */
	getStyles(styles: Record<string, string>): Record<string, string> {
		const currentStylesString = JSON.stringify(styles);

		if (this._lastStylesString !== currentStylesString || !this._cachedStyles) {
			this._lastStylesString = currentStylesString;
			this._cachedStyles = generateAgGridDynamicStyles(styles);
		}

		return this._cachedStyles;
	}

	/**
	 * 清空缓存
	 */
	clearCache(): void {
		this._lastStylesString = '';
		this._cachedStyles = null;
	}
}

/**
 * 生成基础样式映射
 */
function createBaseStyles(styles: Record<string, string>): Record<string, string> {
	return {
		// 整体样式
		'--ag-grid-bg-color-rgb': hexToRgbString(styles?.['agGridBgColor'] || '#ffffff'),
		'--ag-grid-bg-color-alpha': styles?.['agGridBgColorAlpha'] ?? '1',
		'--ag-grid-text-color-rgb': hexToRgbString(styles?.['agGridTextColor'] || '#212529'),
		'--ag-grid-text-color-alpha': styles?.['agGridTextColorAlpha'] ?? '1',
		'--ag-grid-border-color-rgb': hexToRgbString(styles?.['agGridBorderColor'] || '#bdc3c7'),
		'--ag-grid-border-color-alpha': styles?.['agGridBorderColorAlpha'] ?? '1',
	};
}

/**
 * 生成表头样式映射
 */
function createHeaderStyles(styles: Record<string, string>): Record<string, string> {
	return {
		'--ag-grid-header-bg-color-rgb': hexToRgbString(styles?.['agGridHeaderBgColor'] || '#f8f9fa'),
		'--ag-grid-header-bg-color-alpha': styles?.['agGridHeaderBgColorAlpha'] ?? '1',
		'--ag-grid-header-text-color-rgb': hexToRgbString(styles?.['agGridHeaderTextColor'] || '#212529'),
		'--ag-grid-header-text-color-alpha': styles?.['agGridHeaderTextColorAlpha'] ?? '1',
		'--ag-grid-header-border-color-rgb': hexToRgbString(styles?.['agGridHeaderBorderColor'] || '#181d1f'),
		'--ag-grid-header-border-color-alpha': styles?.['agGridHeaderBorderColorAlpha'] ?? '0.15',
		'--ag-grid-header-hover-color-rgb': hexToRgbString(styles?.['agGridHeaderHoverColor'] || '#e9ecef'),
		'--ag-grid-header-hover-color-alpha': styles?.['agGridHeaderHoverColorAlpha'] ?? '1',
	};
}

/**
 * 生成行样式映射
 */
function createRowStyles(styles: Record<string, string>): Record<string, string> {
	return {
		'--ag-grid-row-bg-color-rgb': hexToRgbString(styles?.['agGridRowBgColor'] || '#ffffff'),
		'--ag-grid-row-bg-color-alpha': styles?.['agGridRowBgColorAlpha'] ?? '1',
		'--ag-grid-row-text-color-rgb': hexToRgbString(styles?.['agGridRowTextColor'] || '#212529'),
		'--ag-grid-row-text-color-alpha': styles?.['agGridRowTextColorAlpha'] ?? '1',
		'--ag-grid-row-border-color-rgb': hexToRgbString(styles?.['agGridRowBorderColor'] || '#bdc3c7'),
		'--ag-grid-row-border-color-alpha': styles?.['agGridRowBorderColorAlpha'] ?? '0.3',
		'--ag-grid-row-hover-color-rgb': hexToRgbString(styles?.['agGridRowHoverColor'] || '#f8f9fa'),
		'--ag-grid-row-hover-color-alpha': styles?.['agGridRowHoverColorAlpha'] ?? '1',
		'--ag-grid-row-selected-color-rgb': hexToRgbString(styles?.['agGridRowSelectedColor'] || '#dbeafe'),
		'--ag-grid-row-selected-color-alpha': styles?.['agGridRowSelectedColorAlpha'] ?? '1',
	};
}

/**
 * 生成单元格样式映射
 */
function createCellStyles(styles: Record<string, string>): Record<string, string> {
	return {
		'--ag-grid-cell-bg-color-rgb': hexToRgbString(styles?.['agGridCellBgColor'] || '#ffffff'),
		'--ag-grid-cell-bg-color-alpha': styles?.['agGridCellBgColorAlpha'] ?? '1',
		'--ag-grid-cell-border-color-rgb': hexToRgbString(styles?.['agGridCellBorderColor'] || '#bdc3c7'),
		'--ag-grid-cell-border-color-alpha': styles?.['agGridCellBorderColorAlpha'] ?? '0',
		'--ag-grid-cell-focus-color-rgb': hexToRgbString(styles?.['agGridCellFocusColor'] || '#2563eb'),
		'--ag-grid-cell-focus-color-alpha': styles?.['agGridCellFocusColorAlpha'] ?? '1',
	};
}

/**
 * 生成侧边栏样式映射
 */
function createSidebarStyles(styles: Record<string, string>): Record<string, string> {
	return {
		'--ag-grid-sidebar-bg-color-rgb': hexToRgbString(styles?.['agGridSidebarBgColor'] || '#f8f9fa'),
		'--ag-grid-sidebar-bg-color-alpha': styles?.['agGridSidebarBgColorAlpha'] ?? '1',
		'--ag-grid-sidebar-text-color-rgb': hexToRgbString(styles?.['agGridSidebarTextColor'] || '#212529'),
		'--ag-grid-sidebar-text-color-alpha': styles?.['agGridSidebarTextColorAlpha'] ?? '1',
		'--ag-grid-sidebar-border-color-rgb': hexToRgbString(styles?.['agGridSidebarBorderColor'] || '#bdc3c7'),
		'--ag-grid-sidebar-border-color-alpha': styles?.['agGridSidebarBorderColorAlpha'] ?? '1',
		'--ag-grid-sidebar-button-bg-color-rgb': hexToRgbString(styles?.['agGridSidebarButtonBgColor'] || '#ffffff'),
		'--ag-grid-sidebar-button-bg-color-alpha': styles?.['agGridSidebarButtonBgColorAlpha'] ?? '1',
		'--ag-grid-sidebar-button-hover-color-rgb': hexToRgbString(styles?.['agGridSidebarButtonHoverColor'] || '#e9ecef'),
		'--ag-grid-sidebar-button-hover-color-alpha': styles?.['agGridSidebarButtonHoverColorAlpha'] ?? '1',
		'--ag-grid-sidebar-button-selected-color-rgb': hexToRgbString(styles?.['agGridSidebarButtonSelectedColor'] || '#2563eb'),
		'--ag-grid-sidebar-button-selected-color-alpha': styles?.['agGridSidebarButtonSelectedColorAlpha'] ?? '0.1',
	};
}

/**
 * 生成其他控件样式映射
 */
function createControlStyles(styles: Record<string, string>): Record<string, string> {
	return {
		// 工具面板样式
		'--ag-grid-tool-panel-bg-color-rgb': hexToRgbString(styles?.['agGridToolPanelBgColor'] || '#f8f9fa'),
		'--ag-grid-tool-panel-bg-color-alpha': styles?.['agGridToolPanelBgColorAlpha'] ?? '1',
		'--ag-grid-tool-panel-text-color-rgb': hexToRgbString(styles?.['agGridToolPanelTextColor'] || '#212529'),
		'--ag-grid-tool-panel-text-color-alpha': styles?.['agGridToolPanelTextColorAlpha'] ?? '1',

		// 菜单样式
		'--ag-grid-menu-bg-color-rgb': hexToRgbString(styles?.['agGridMenuBgColor'] || '#ffffff'),
		'--ag-grid-menu-bg-color-alpha': styles?.['agGridMenuBgColorAlpha'] ?? '1',
		'--ag-grid-menu-text-color-rgb': hexToRgbString(styles?.['agGridMenuTextColor'] || '#212529'),
		'--ag-grid-menu-text-color-alpha': styles?.['agGridMenuTextColorAlpha'] ?? '1',

		// 输入框样式
		'--ag-grid-input-bg-color-rgb': hexToRgbString(styles?.['agGridInputBgColor'] || '#ffffff'),
		'--ag-grid-input-bg-color-alpha': styles?.['agGridInputBgColorAlpha'] ?? '1',
		'--ag-grid-input-text-color-rgb': hexToRgbString(styles?.['agGridInputTextColor'] || '#212529'),
		'--ag-grid-input-text-color-alpha': styles?.['agGridInputTextColorAlpha'] ?? '1',

		// 按钮样式
		'--ag-grid-button-bg-color-rgb': hexToRgbString(styles?.['agGridButtonBgColor'] || '#f8f9fa'),
		'--ag-grid-button-bg-color-alpha': styles?.['agGridButtonBgColorAlpha'] ?? '1',
		'--ag-grid-button-text-color-rgb': hexToRgbString(styles?.['agGridButtonTextColor'] || '#212529'),
		'--ag-grid-button-text-color-alpha': styles?.['agGridButtonTextColorAlpha'] ?? '1',

		// 调整大小手柄样式
		'--ag-grid-resize-handle-color-rgb': hexToRgbString(styles?.['agGridResizeHandleColor'] || '#000000'),
		'--ag-grid-resize-handle-color-alpha': styles?.['agGridResizeHandleColorAlpha'] ?? '0',
	};
}

/**
 * 生成完整的 ag-grid 动态样式
 */
export function generateAgGridDynamicStyles(styles: Record<string, string>): Record<string, string> {
	return {
		...createBaseStyles(styles),
		...createHeaderStyles(styles),
		...createRowStyles(styles),
		...createCellStyles(styles),
		...createSidebarStyles(styles),
		...createControlStyles(styles),
	};
}

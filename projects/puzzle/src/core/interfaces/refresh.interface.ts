import { RefreshIntervalUnitEnum } from '../enums';

export interface RefreshConfig {
	// 是否启用定时刷新
	enabled: boolean;
	// 刷新间隔数值
	interval: number;
	// 刷新间隔单位
	intervalUnit: RefreshIntervalUnitEnum;
	// 最大刷新次数（可选）
	maxRefreshCount?: number;
	// 当前已刷新次数
	currentRefreshCount?: number;
	// 最后刷新时间
	lastRefreshTime?: Date;
	// 绑定控件 id
	controlIds?: string[];
}

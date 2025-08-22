// chart 配置
// import { AgChartOptions } from 'ag-charts-community';
import { ComponentBaseProps } from './component-config.interface';
import { SafeAny } from 'ngx-puzzle/core';

export interface ComponentChartProps extends ComponentBaseProps {
	chart: SafeAny;
}

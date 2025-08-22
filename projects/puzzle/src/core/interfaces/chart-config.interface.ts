// chart 配置
import { AgChartOptions } from 'ag-charts-community';
import { ComponentBaseProps } from './component-config.interface';

export interface ComponentChartProps extends ComponentBaseProps {
	chart: AgChartOptions;
}

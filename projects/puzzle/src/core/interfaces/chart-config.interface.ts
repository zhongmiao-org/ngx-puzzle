import { ComponentBaseProps } from './component-config.interface';
import { EChartsOption } from 'echarts';

export interface ComponentChartProps extends ComponentBaseProps {
  chart: EChartsOption;
}

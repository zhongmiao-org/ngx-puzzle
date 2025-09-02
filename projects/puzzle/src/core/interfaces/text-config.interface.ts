// text 配置
import { SafeAny } from '../types';
import { ComponentBaseProps } from 'ngx-puzzle/core';

export interface ComponentTextProps extends ComponentBaseProps {
  text: TextConfig;
}

export interface TextConfig {
  content?: string;
  styles: Record<string, SafeAny>;
}

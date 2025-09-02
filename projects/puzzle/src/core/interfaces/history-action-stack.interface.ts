import { actionTypes } from '../types';
import { ComponentBaseProps, ComponentConfig } from 'ngx-puzzle/core';

export interface HistoryActionStack<TConfigProps extends ComponentBaseProps = ComponentBaseProps, TSubType = string> {
  type: actionTypes;
  config: ComponentConfig<TConfigProps, TSubType>;
  timestamp: number;
}

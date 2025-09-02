import { ComponentBaseProps, ComponentConfig, DataRequestConfig, Position, Size } from './index';
import { actionTypes } from '../types';

export interface CanvasMediator<TConfigProps extends ComponentBaseProps = ComponentBaseProps, TSubType = string> {
  addComponent(config: ComponentConfig<TConfigProps, TSubType>): void;

  /**
   * 全量更新,慎用
   * @param config
   */
  updateComponentConfig(config: ComponentConfig<TConfigProps, TSubType>): void;
  updateComponentProps(id: string, props: TConfigProps): void;
  selectComponent(id: string): void;
  movingComponent(id: string, position: Position): void;
  resizeComponent(id: string, size: Size, position: Position): void;
  removeComponent(id: string): void;
  recordHistory(config: ComponentConfig<TConfigProps, TSubType>, activeType: actionTypes): void;
  updateDataRequest(id: string, dataRequest: DataRequestConfig): void;

  handleDeleteKeyPress(event: KeyboardEvent): void;
  handleUndoKeyPress(event: KeyboardEvent): void;
}

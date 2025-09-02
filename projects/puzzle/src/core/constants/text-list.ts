import { BaseSelectOption } from '../interfaces';
import { TextTypesEnum } from '../enums';

export const TEXT_TYPE_OPTIONS: BaseSelectOption<TextTypesEnum>[] = [
  { label: '标题', val: TextTypesEnum.headTitle },
  { label: '文本', val: TextTypesEnum.text }
];

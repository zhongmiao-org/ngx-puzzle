import { TextTypesEnum } from '../enums';
import { SafeAny } from '../types';
import { TEXT_CONTENT_FIELDS, TEXT_STYLE_FIELDS } from './fields';

export const TEXT_FIELDS_MAP: Partial<Record<TextTypesEnum, SafeAny>> = {
  [TextTypesEnum.headTitle]: [TEXT_CONTENT_FIELDS, TEXT_STYLE_FIELDS],
  [TextTypesEnum.text]: [TEXT_CONTENT_FIELDS, TEXT_STYLE_FIELDS]
};

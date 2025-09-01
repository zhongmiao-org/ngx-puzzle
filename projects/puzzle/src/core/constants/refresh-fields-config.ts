import { EditorBaseField } from '../interfaces';
import { REFRESH_FIELDS } from './fields';
import { RefreshIntervalUnitEnum } from '../enums';

export const REFRESH_CONFIG: EditorBaseField[] = [REFRESH_FIELDS];

export const DEFAULT_INTERVAL_MULTIPLIERS: Record<RefreshIntervalUnitEnum, number> = {
	[RefreshIntervalUnitEnum.seconds]: 1000,
	[RefreshIntervalUnitEnum.minutes]: 60 * 1000,
	[RefreshIntervalUnitEnum.hours]: 60 * 60 * 1000,
	[RefreshIntervalUnitEnum.days]: 24 * 60 * 60 * 1000,
};

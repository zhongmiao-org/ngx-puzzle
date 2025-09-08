import { ComponentConfig } from '../interfaces';
import { mainTypes, SafeAny } from '../types';
import { RefreshIntervalUnitEnum } from '../enums';

const BASIC_STYLES: Record<string, SafeAny> = {
  backgroundColor: '',
  backgroundColorAlpha: 1,
  backgroundImage: '',
  backgroundPositionX: 0, // %
  backgroundPositionY: 100, // %
  backgroundSize: 100, // %
  backgroundRepeat: 'no-repeat',
  paddingTop: 0, // px
  paddingBottom: 0, // px
  paddingLeft: 0, // px
  paddingRight: 0 // px
};

export const INIT_SETTINGS_CONFIG: { [key in mainTypes]: ComponentConfig } = {
  canvas: {
    id: 'canvas',
    size: { width: 2000, height: 2000 },
    type: 'canvas',
    subType: '',
    position: { x: 0, y: 0 },
    props: {
      styles: {
        backgroundColor: '',
        backgroundImage: '',
        backgroundColorAlpha: 1
      }
    }
  },
  chart: {
    id: '',
    type: 'chart',
    subType: '',
    position: { x: 0, y: 0 },
    size: { width: 300, height: 300 },
    props: {
      styles: { ...BASIC_STYLES }
    },
    refreshConfig: { enabled: false, interval: 30, intervalUnit: RefreshIntervalUnitEnum.minutes, controlIds: [] }
  },
  table: {
    id: '',
    type: 'table',
    subType: '',
    position: { x: 0, y: 0 },
    size: { width: 600, height: 300 },
    props: {
      styles: { ...BASIC_STYLES }
    },
    refreshConfig: { enabled: false, interval: 30, intervalUnit: RefreshIntervalUnitEnum.minutes, controlIds: [] }
  },
  text: {
    id: '',
    type: 'text',
    subType: '', // 标题，文字
    position: { x: 0, y: 0 },
    size: { width: 150, height: 50 },
    props: {
      styles: { ...BASIC_STYLES }
    }
  },
  control: {
    id: '',
    type: 'control',
    subType: '',
    position: { x: 0, y: 0 },
    size: { width: 200, height: 40 },
    props: {
      styles: { ...BASIC_STYLES }
    }
  }
};

import {
	DateTimeLayout,
	WeekNumbering,
	HourCycle,
	TimezoneMode,
	MonthMode,
	MonthEnglishStyle,
	WeekdayLang,
	ZhWeekdayStyle,
	EnWeekdayStyle,
	DateTimeOrder,
} from '../types';

export interface DateTimeConfig {
	layout?: DateTimeLayout;
	year?: {
		twoDigits?: boolean; // 25 vs 2025
		prefix?: string; // e.g., '' or 'Year '
		suffix?: string; // e.g., '年'
	};
	month?: {
		mode?: MonthMode;
		padZero?: boolean; // number mode only
		english?: MonthEnglishStyle;
	};
	day?: {
		padZero?: boolean;
		suffix?: string; // '日' or 'Day'
	};
	weekday?: {
		show?: boolean;
		lang?: WeekdayLang;
		zhStyle?: ZhWeekdayStyle; // 星期一 / 周一 / 一
		enStyle?: EnWeekdayStyle; // Monday / Mon / M
		numberStyle?: WeekNumbering; // 1-7 (Mon=1) or 0-6 (Sun=0)
	};

	hourCycle?: HourCycle; // 12 or 24
	hour?: { padZero?: boolean };
	minute?: { show?: boolean; padZero?: boolean };
	second?: { show?: boolean; padZero?: boolean };

	dateSeparator?: string; // '-', '/', '.', '年'
	timeSeparator?: string; // ':' or '.' or Chinese when using preset
	useChineseDate?: boolean; // 2025年01月15日
	useChineseTime?: boolean; // 14时30分25秒
	customFormat?: string; // e.g., 'YYYY-MM-DD HH:mm:ss'

	autoUpdate?: { enabled?: boolean; intervalSeconds?: number };
	updateOnLoad?: boolean; // update immediately on init
	timezone?: { mode?: TimezoneMode; offsetMinutes?: number }; // offset applied when mode='offset'

	show?: { date?: boolean; time?: boolean; weekday?: boolean };
	order?: DateTimeOrder;

	styles?: DateTimeStylesConfig;
}

export interface DateTimeStylesConfig {
	color?: string;
	fontSize?: string;
	fontWeight?: string | number;
	fontFamily?: string;
	textAlign?: 'left' | 'center' | 'right';
	backgroundColor?: string;
	border?: string;
	borderRadius?: string;
	padding?: string;
	display?: string;
}

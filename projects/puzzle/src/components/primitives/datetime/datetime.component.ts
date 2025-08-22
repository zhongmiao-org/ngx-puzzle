import { ChangeDetectionStrategy, Component, computed, effect, input, OnDestroy, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { StylesFormatPipe } from '../../pipes/styles-format.pipe';
import { DateTimeConfig } from '../../../core';

const DEFAULTS: DateTimeConfig = {
	layout: 'single',
	year: { twoDigits: false, prefix: '', suffix: '' },
	month: { mode: 'number', padZero: true, english: 'long' },
	day: { padZero: true, suffix: '' },
	weekday: { show: false, lang: 'zh', zhStyle: '星期', enStyle: 'long', numberStyle: 'mon-1-7' },
	hourCycle: 24,
	hour: { padZero: true },
	minute: { show: true, padZero: true },
	second: { show: true, padZero: true },
	dateSeparator: '-',
	timeSeparator: ':',
	useChineseDate: false,
	useChineseTime: false,
	customFormat: undefined,
	autoUpdate: { enabled: true, intervalSeconds: 1 },
	updateOnLoad: true,
	timezone: { mode: 'local', offsetMinutes: 0 },
	show: { date: true, time: true, weekday: false },
	order: 'date-time',
	styles: { textAlign: 'left' },
};

@Component({
	selector: 'imm-bi-datetime',
	standalone: true,
	imports: [NgStyle, StylesFormatPipe],
	templateUrl: './datetime.component.html',
	styleUrls: ['./datetime.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatetimeComponent implements OnDestroy {
	// Split first-level inputs (undefined by default; when provided, override defaults)
	year = input<DateTimeConfig['year'] | undefined>();
	month = input<DateTimeConfig['month'] | undefined>();
	day = input<DateTimeConfig['day'] | undefined>();
	weekday = input<DateTimeConfig['weekday'] | undefined>();

	hourCycle = input<DateTimeConfig['hourCycle'] | undefined>();
	hour = input<DateTimeConfig['hour'] | undefined>();
	minute = input<DateTimeConfig['minute'] | undefined>();
	second = input<DateTimeConfig['second'] | undefined>();

	dateSeparator = input<DateTimeConfig['dateSeparator'] | undefined>();
	timeSeparator = input<DateTimeConfig['timeSeparator'] | undefined>();
	useChineseDate = input<DateTimeConfig['useChineseDate'] | undefined>();
	useChineseTime = input<DateTimeConfig['useChineseTime'] | undefined>();
	customFormat = input<DateTimeConfig['customFormat'] | undefined>();

	autoUpdate = input<DateTimeConfig['autoUpdate'] | undefined>();
	updateOnLoad = input<DateTimeConfig['updateOnLoad'] | undefined>();
	timezone = input<DateTimeConfig['timezone'] | undefined>();

	show = input<DateTimeConfig['show'] | undefined>();
	order = input<DateTimeConfig['order'] | undefined>();

	layout = input<DateTimeConfig['layout'] | undefined>();

	styles = input<DateTimeConfig['styles'] | undefined>();

	// Internal state as signals
	private now = signal<Date>(new Date());
	private timerId: any = null;

	// Build effective config by merging DEFAULTS <- individual inputs (no aggregate config)
	private effectiveConfig = computed<DateTimeConfig>(() => {
		return {
			...DEFAULTS,
			year: this.year() ?? DEFAULTS.year,
			month: this.month() ?? DEFAULTS.month,
			day: this.day() ?? DEFAULTS.day,
			weekday: this.weekday() ?? DEFAULTS.weekday,
			hourCycle: this.hourCycle() ?? DEFAULTS.hourCycle,
			hour: this.hour() ?? DEFAULTS.hour,
			minute: this.minute() ?? DEFAULTS.minute,
			second: this.second() ?? DEFAULTS.second,
			dateSeparator: this.dateSeparator() ?? DEFAULTS.dateSeparator,
			timeSeparator: this.timeSeparator() ?? DEFAULTS.timeSeparator,
			useChineseDate: this.useChineseDate() ?? DEFAULTS.useChineseDate,
			useChineseTime: this.useChineseTime() ?? DEFAULTS.useChineseTime,
			customFormat: this.customFormat() ?? DEFAULTS.customFormat,
			autoUpdate: this.autoUpdate() ?? DEFAULTS.autoUpdate,
			updateOnLoad: this.updateOnLoad() ?? DEFAULTS.updateOnLoad,
			timezone: this.timezone() ?? DEFAULTS.timezone,
			show: this.show() ?? DEFAULTS.show,
			order: this.order() ?? DEFAULTS.order,
			layout: this.layout() ?? DEFAULTS.layout,
			styles: this.styles() ?? DEFAULTS.styles,
		};
	});

	// Derived timezone-adjusted date
	private zonedNow = computed(() => this.applyTimezone(this.now(), this.effectiveConfig().timezone));

	// Core formatted output according to config
	formatted = computed(() => this.formatDateTime(this.zonedNow(), this.effectiveConfig()));

	// Multi-line formatted output based on layout selection
	formattedLines = computed(() => {
		const cfg = this.effectiveConfig();
		if (cfg.customFormat) return [this.formatted()];
		const d = this.zonedNow();
		const showWeek = (cfg.show?.weekday ?? false) || (cfg.weekday?.show ?? false);
		const showDate = cfg.show?.date ?? true;
		const showTime = cfg.show?.time ?? true;
		const lines: string[] = [];
		switch (cfg.layout) {
			case 'separate': {
				// 独占一行: 年月日在上，星期在年月日下面，时间在最下面
				if (showDate) lines.push(this.getDatePart(d, cfg));
				if (showWeek) lines.push(this.getWeekday(d, cfg));
				if (showTime) lines.push(this.getTimePart(d, cfg));
				break;
			}
			case 'date-week-same-time-next': {
				const l1Parts: string[] = [];
				if (showDate) l1Parts.push(this.getDatePart(d, cfg));
				if (showWeek) l1Parts.push(this.getWeekday(d, cfg));
				const line1 = l1Parts.join(' ').trim();
				if (line1) lines.push(line1);
				if (showTime) lines.push(this.getTimePart(d, cfg));
				break;
			}
			case 'single':
			default: {
				lines.push(this.formatted());
			}
		}
		return lines.filter(Boolean);
	});

	private manageTimer = effect(
		() => {
			const cfg = this.effectiveConfig();
			if (this.timerId) {
				clearInterval(this.timerId);
				this.timerId = null;
			}
			const enabled = cfg.autoUpdate?.enabled ?? false;
			let effectiveSeconds = Math.max(1, cfg.autoUpdate?.intervalSeconds ?? 1);

			// Determine if minutes/seconds are shown
			let showsMinutes = cfg.minute?.show ?? true;
			let showsSeconds = cfg.second?.show ?? true;
			if (cfg.customFormat) {
				const tpl = cfg.customFormat!;
				const hasMinToken = /(mm|\bm\b)/.test(tpl);
				const hasSecToken = /(ss|\bs\b)/.test(tpl);
				showsMinutes = hasMinToken;
				showsSeconds = hasSecToken;
			}
			if (!(cfg.show?.time ?? true)) {
				showsMinutes = false;
				showsSeconds = false;
			}
			if (!showsSeconds && showsMinutes) {
				effectiveSeconds = 60;
			} else if (!showsSeconds && !showsMinutes) {
				effectiveSeconds = 3600;
			}

			if (cfg.updateOnLoad) {
				this.tick();
			}
			if (enabled) {
				this.timerId = setInterval(() => this.tick(), effectiveSeconds * 1000);
			}
		},
		{ allowSignalWrites: true },
	);

	private tick() {
		this.now.set(new Date());
	}

	ngOnDestroy() {
		if (this.timerId) {
			clearInterval(this.timerId);
		}
	}

	private applyTimezone(date: Date, tz?: DateTimeConfig['timezone']): Date {
		const mode = tz?.mode ?? 'local';
		if (mode === 'utc') {
			// Return a new Date representing the same UTC time
			return new Date(
				Date.UTC(
					date.getUTCFullYear(),
					date.getUTCMonth(),
					date.getUTCDate(),
					date.getUTCHours(),
					date.getUTCMinutes(),
					date.getUTCSeconds(),
					date.getUTCMilliseconds(),
				),
			);
		} else if (mode === 'offset') {
			const offsetMin = tz?.offsetMinutes ?? 0; // minutes east of UTC
			const localMs = date.getTime();
			const localOffsetMin = date.getTimezoneOffset(); // minutes west of UTC
			const targetOffsetDiffMin = -offsetMin - localOffsetMin; // adjust from local to target
			return new Date(localMs + targetOffsetDiffMin * 60_000);
		}
		return date; // local
	}

	private pad(num: number, width = 2): string {
		const s = String(Math.floor(Math.abs(num)));
		return (num < 0 ? '-' : '') + s.padStart(width, '0');
	}

	private formatDateTime(d: Date, cfg: DateTimeConfig): string {
		// Custom format takes precedence
		if (cfg.customFormat) {
			return this.formatWithTemplate(d, cfg);
		}

		const parts: string[] = [];
		const showWeek = (cfg.show?.weekday ?? false) || (cfg.weekday?.show ?? false);

		const seq: string[] = [];
		if (cfg.show?.date) seq.push(this.getDatePart(d, cfg));
		if (cfg.show?.time) seq.push(this.getTimePart(d, cfg));

		const ordered = cfg.order === 'time-date' ? seq.reverse() : seq;
		parts.push(ordered.filter(Boolean).join(' '));

		// Always append weekday after the main date/time when enabled
		if (showWeek) {
			parts.push(this.getWeekday(d, cfg));
		}

		return parts.filter(Boolean).join(' ');
	}

	private getDatePart(d: Date, cfg: DateTimeConfig): string {
		const y = d.getFullYear();
		const yearNumStr = cfg.year?.twoDigits ? String(y).slice(-2) : String(y);
		const yWithAffix = `${cfg.year?.prefix ?? ''}${yearNumStr}${cfg.year?.suffix ?? ''}`;

		const monthNum = d.getMonth() + 1;
		const dayNum = d.getDate();

		let monthStr = '';
		if (cfg.month?.mode === 'number') {
			monthStr = cfg.month?.padZero ? this.pad(monthNum) : String(monthNum);
		} else if (cfg.month?.mode === 'en') {
			monthStr = this.getEnglishMonth(d.getMonth(), cfg.month?.english ?? 'long');
		} else {
			// zh
			monthStr = this.getChineseMonth(monthNum);
		}

		const dayStr = (cfg.day?.padZero ? this.pad(dayNum) : String(dayNum)) + (cfg.day?.suffix ?? '');

		if (cfg.useChineseDate) {
			// 2025年01月15日 style, with year affixes applied around the numeric year
			const m = cfg.month?.mode === 'number' ? (cfg.month?.padZero ? this.pad(monthNum) : String(monthNum)) : monthStr;
			const dStr = cfg.day?.padZero ? this.pad(dayNum) : String(dayNum);
			return `${yWithAffix}年${m}月${dStr}日`;
		}

		const sep = cfg.dateSeparator ?? '-';
		// Construct as YYYY-MM-DD (apply year affixes even in numeric mode)
		const mForNum = cfg.month?.mode === 'number' ? monthStr : monthNum;
		const dd = cfg.day?.padZero ? this.pad(dayNum) : String(dayNum);
		const dateCore = [yWithAffix, mForNum, dd].join(sep);

		// If month/day are non-numeric language strings, present as "{month}{sep}{day} {yearWithAffix}"
		if (cfg.month?.mode !== 'number') {
			return `${monthStr}${sep}${dayStr} ${yWithAffix}`.trim();
		}

		return dateCore;
	}

	private getTimePart(d: Date, cfg: DateTimeConfig): string {
		const is12 = cfg.hourCycle === 12;
		let hours = d.getHours();
		const minutes = d.getMinutes();
		const seconds = d.getSeconds();

		let ampm = '';
		if (is12) {
			ampm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12 || 12;
		}

		const hh = cfg.hour?.padZero ? this.pad(hours) : String(hours);
		const mm = cfg.minute?.show ? (cfg.minute?.padZero ? this.pad(minutes) : String(minutes)) : null;
		const ss = cfg.second?.show ? (cfg.second?.padZero ? this.pad(seconds) : String(seconds)) : null;

		if (cfg.useChineseTime) {
			// 14时30分25秒
			const h = `${hh}时`;
			const m = mm != null ? `${mm}分` : '';
			const s = ss != null ? `${ss}秒` : '';
			return `${h}${m}${s}`.trim();
		}

		const sep = cfg.timeSeparator ?? ':';
		const core = [hh, mm, ss].filter((v) => v != null).join(sep);
		return is12 ? `${core} ${ampm}` : core;
	}

	private getWeekday(d: Date, cfg: DateTimeConfig): string {
		const day = d.getDay(); // 0 (Sun) - 6 (Sat)
		const zhMap = ['日', '一', '二', '三', '四', '五', '六'];
		const enLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const enShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		const enNarrow = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

		if (cfg.weekday?.lang === 'zh') {
			const base = zhMap[day];
			const style = cfg.weekday.zhStyle ?? '星期';
			if (style === 'none') return base;
			return `${style}${base}`;
		}
		if (cfg.weekday?.lang === 'en') {
			const s = cfg.weekday.enStyle ?? 'long';
			if (s === 'long') return enLong[day];
			if (s === 'short') return enShort[day];
			return enNarrow[day];
		}
		// number
		const style = cfg.weekday?.numberStyle ?? 'mon-1-7';
		if (style === 'mon-1-7') {
			return String(((day + 6) % 7) + 1); // Mon=1..Sun=7
		}
		return String(day); // Sun=0..Sat=6
	}

	private getEnglishMonth(idx: number, style: 'short' | 'long'): string {
		const long = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		return style === 'long' ? long[idx] : short[idx];
	}

	private getChineseMonth(n: number): string {
		const cn = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
		return cn[n - 1];
	}

	// Custom template formatter supporting common tokens
	private formatWithTemplate(d: Date, cfg: DateTimeConfig): string {
		const tpl = cfg.customFormat!;
		const is12 = cfg.hourCycle === 12;
		const rawH = d.getHours();
		const h12 = rawH % 12 || 12;
		const map: Record<string, string> = {
			YYYY: String(d.getFullYear()),
			YY: String(d.getFullYear()).slice(-2),
			MM: this.pad(d.getMonth() + 1),
			M: String(d.getMonth() + 1),
			DD: this.pad(d.getDate()),
			D: String(d.getDate()),
			HH: this.pad(is12 ? h12 : rawH),
			H: String(is12 ? h12 : rawH),
			hh: this.pad(h12),
			h: String(h12),
			mm: this.pad(d.getMinutes()),
			m: String(d.getMinutes()),
			ss: this.pad(d.getSeconds()),
			s: String(d.getSeconds()),
			A: rawH >= 12 ? 'PM' : 'AM',
			a: rawH >= 12 ? 'pm' : 'am',
			dddd: this.getWeekday(d, { weekday: { lang: 'en', enStyle: 'long', show: true } } as any),
			ddd: this.getWeekday(d, { weekday: { lang: 'en', enStyle: 'short', show: true } } as any),
			E: this.getWeekday(d, { weekday: { lang: 'number', numberStyle: 'mon-1-7', show: true } } as any),
			e: this.getWeekday(d, { weekday: { lang: 'number', numberStyle: 'sun-0-6', show: true } } as any),
			MMM: this.getEnglishMonth(d.getMonth(), 'short'),
			MMMM: this.getEnglishMonth(d.getMonth(), 'long'),
			CM: this.getChineseMonth(d.getMonth() + 1), // custom: Chinese month
			Cw: this.getWeekday(d, { weekday: { lang: 'zh', zhStyle: '星期', show: true } } as any), // custom Chinese weekday
		};

		// Replace tokens by descending length to avoid partial overlaps
		const tokens = Object.keys(map).sort((a, b) => b.length - a.length);
		let out = tpl;
		for (const t of tokens) {
			out = out.split(t).join(map[t]);
		}

		// Affixes if needed (year prefix/suffix and day suffix)
		if (cfg.year?.prefix || cfg.year?.suffix) {
			const year = cfg.year?.twoDigits ? String(d.getFullYear()).slice(-2) : String(d.getFullYear());
			out = out.replace(year, `${cfg.year?.prefix ?? ''}${year}${cfg.year?.suffix ?? ''}`);
		}
		if (cfg.day?.suffix) {
			const dd = this.pad(d.getDate());
			const dStr = String(d.getDate());
			out = out.replace(`${dd}`, `${dd}${cfg.day.suffix}`);
			out = out.replace(`${dStr}`, `${dStr}${cfg.day.suffix}`);
		}

		return out;
	}
}

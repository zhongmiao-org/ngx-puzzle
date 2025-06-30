export enum ChartTypesEnum {
	/**
	 * 面积图 - 用填充线下的区域展示定量数据
	 */
	area = 'area',

	/**
	 * 折线图 - 用直线连接数据点来展示信息
	 */
	line = 'line',

	/**
	 * 柱状图 - 用长度与数值成比例的矩形条展示数据
	 */
	bar = 'bar',

	/**
	 * 柱状折现混合图
	 */
	combination = 'combination',

	/**
	 * 箱线图（盒须图） - 通过四分位展示数据分布
	 */
	boxPlot = 'box-plot',

	/**
	 * 气泡图 - 展示三维数据（x轴、y轴和气泡大小）
	 */
	bubble = 'bubble',

	/**
	 * K线图 - 常用于展示金融数据的开盘价、最高价、最低价和收盘价
	 */
	candlestick = 'candlestick',

	/**
	 * 漏斗图 - 展示数据在不同阶段的逐步减少情况
	 */
	funnel = 'funnel',

	/**
	 * 热力图 - 用颜色矩阵展示数据值
	 */
	heatmap = 'heatmap',

	/**
	 * 直方图 - 通过数据分箱展示数值分布
	 */
	histogram = 'histogram',

	/**
	 * OHLC图（开盘-最高-最低-收盘图） - 展示价格波动的金融图表
	 */
	ohlc = 'ohlc',

	/**
	 * 范围面积图 - 展示高低值随时间的变化范围
	 */
	rangeArea = 'range-area',

	/**
	 * 范围柱状图 - 用柱形展示高低值之间的范围
	 */
	rangeBar = 'range-bar',

	/**
	 * 散点图 - 用点表示两个不同数值变量的值
	 */
	scatter = 'scatter',

	/**
	 * 瀑布图 - 展示连续引入数值的累积效果
	 */
	waterfall = 'waterfall',

	/**
	 * 环形图 - 中间有空洞的饼图变体
	 */
	donut = 'donut',

	/**
	 * 饼图 - 圆形统计图，分割成扇形以展示比例
	 */
	pie = 'pie',

	/**
	 * 雷达线图 - 在从同一点出发的轴上展示多变量数据
	 */
	radarLine = 'radar-line',

	/**
	 * 雷达面积图 - 在雷达图轴之间填充区域的图表
	 */
	radarArea = 'radar-area',

	/**
	 * 径向柱状图 - 在极坐标系中展示的柱状图
	 */
	radialBar = 'radial-bar',

	/**
	 * 径向条形图 - 在极坐标系中展示的条形图
	 */
	radialColumn = 'radial-column',

	/**
	 * 南丁格尔玫瑰图 - 展示数据分布的圆形直方图
	 */
	nightingale = 'nightingale',

	/**
	 * 矩形树图 - 用嵌套矩形展示层次结构数据
	 */
	treemap = 'treemap',

	/**
	 * 旭日图 - 层次结构数据的径向空间填充可视化
	 */
	sunburst = 'sunburst',

	/**
	 * 形状地图 - 使用形状/区域的地理地图
	 */
	mapShape = 'map-shape',

	/**
	 * 线地图 - 带有线条（如路线、连接）的地理地图
	 */
	mapLine = 'map-line',

	/**
	 * 标记地图 - 带有点标记的地理地图
	 */
	mapMarker = 'map-marker',

	/**
	 * 背景形状地图 - 以形状轮廓为背景的地图
	 */
	mapShapeBackground = 'map-shape-background',

	/**
	 * 背景线地图 - 以线条轮廓为背景的地图
	 */
	mapLineBackground = 'map-line-background',

	/**
	 * 桑基图 - 通过连接路径展示实体间的流动
	 */
	sankey = 'sankey',

	/**
	 * 弦图 - 可视化实体间的相互关系
	 */
	chord = 'chord',

	/**
	 * 金字塔图 - 展示比例关系的三角形图表
	 */
	pyramid = 'pyramid',

	/**
	 * 锥形漏斗图
	 */
	coneFunnel = 'cone-funnel',
}

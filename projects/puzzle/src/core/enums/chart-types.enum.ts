export enum ChartTypesEnum {
  /**
   * 折线图 - 用直线连接数据点来展示信息
   */
  line = 'line',

  /**
   * 柱状图 - 用长度与数值成比例的矩形条展示数据
   */
  bar = 'bar',

  /**
   * 箱线图（盒须图） - 通过四分位展示数据分布
   */
  boxPlot = 'box-plot',

  /**
   * K线图 - 常用于展示金融数据的开盘价、最高价、最低价和收盘价
   */
  candlestick = 'candlestick',

  /**
   * 雷达图
   */
  radar = 'radar',

  /**
   * 漏斗图 - 展示数据在不同阶段的逐步减少情况
   */
  funnel = 'funnel',

  /**
   * 热力图 - 用颜色矩阵展示数据值
   */
  heatmap = 'heatmap',

  /**
   * 散点图 - 用点表示两个不同数值变量的值
   */
  scatter = 'scatter',

  /**
   * 饼图 - 圆形统计图，分割成扇形以展示比例
   */
  pie = 'pie',

  /**
   * 矩形树图 - 用嵌套矩形展示层次结构数据
   */
  treemap = 'treemap',

  /**
   * 旭日图 - 层次结构数据的径向空间填充可视化
   */
  sunburst = 'sunburst',

  /**
   * 桑基图 - 通过连接路径展示实体间的流动
   */
  sankey = 'sankey',

  /**
   * 弦图 - 可视化实体间的相互关系
   */
  chord = 'chord',

  /**
   * 涟漪散点图 - 带动态涟漪效果的散点数据可视化
   */
  effectScatter = 'effect-scatter',
  /**
   * 线段图 - 用起点和终点的线段表示流向/轨迹
   */
  lines = 'lines',
  /**
   * 地图 - 基于地理坐标的数据可视化
   */
  map = 'map',
  /**
   * 平行坐标 - 多维数据的对比分析
   */
  parallel = 'parallel',
  /**
   * 象形柱图 - 使用图形符号渲染的柱状图
   */
  pictorialBar = 'pictorial-bar',
  /**
   * 主题河流图 - 展示主题随时间变化的流量
   */
  themeRiver = 'theme-river',
  /**
   * 树图 - 层级结构数据的节点连接图
   */
  tree = 'tree',
  /**
   * 仪表盘 - 指针式数值显示
   */
  gauge = 'gauge',
  /**
   * 关系图 - 节点-边关系网络可视化
   */
  graph = 'graph'
}

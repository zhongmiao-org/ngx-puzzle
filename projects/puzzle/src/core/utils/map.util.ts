import { GeoJSONFeatureCollection, OutputPoint } from '../../core';

/**
 * 将 GeoJSON FeatureCollection 转换为目标格式的点数组
 * @param geoJsonData GeoJSON 数据
 * @returns 转换后的点数组（包含 lat, lon 及所有 properties）
 */
export function convertGeoJSONToCustomFormat(geoJsonData: GeoJSONFeatureCollection): OutputPoint[] {
  return geoJsonData.features
    .filter((feature) => feature.geometry.type === 'Point')
    .map((feature) => ({
      lat: feature.geometry.coordinates[1], // 纬度
      lon: feature.geometry.coordinates[0], // 经度
      ...feature.properties // 展开所有属性
    }));
}

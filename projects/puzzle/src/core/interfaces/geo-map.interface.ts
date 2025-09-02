import { geometryType } from '../types';

export interface GeoJSONPoint {
  type: geometryType;
  coordinates: [number, number]; // [lon, lat]
}

export interface GeoJSONFeature {
  type: 'Feature';
  id?: number | string;
  geometry: GeoJSONPoint;
  properties: Record<string, any>; // 任意属性
  bbox?: [number, number, number, number]; // 可选边界框
}

export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

// 目标数据格式
export interface OutputPoint {
  lat: number;
  lon: number;
  [key: string]: any; // 允许任意其他属性（来自 properties）
}

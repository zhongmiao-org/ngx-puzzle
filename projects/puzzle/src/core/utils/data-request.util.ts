import { ApiSource, DataRequestConfig } from '../interfaces';
import { SafeAny } from '../types';
import { PuzzleDataSource } from '../services';

export function getDataRequestSources(dataRequest?: DataRequestConfig): PuzzleDataSource[] {
  return dataRequest?.sources || dataRequest?.apiSources || [];
}

export function setDataRequestSources<TSource extends PuzzleDataSource = PuzzleDataSource>(
  dataRequest: DataRequestConfig = {},
  sources: TSource[]
): DataRequestConfig {
  return {
    ...dataRequest,
    sources,
    apiSources: sources as ApiSource[]
  };
}

export function normalizeDataRequest(dataRequest?: DataRequestConfig | null): DataRequestConfig {
  const request = dataRequest || {};
  return setDataRequestSources(request, getDataRequestSources(request));
}

export function serializeDataSource(source?: SafeAny): string {
  return JSON.stringify(source || {});
}

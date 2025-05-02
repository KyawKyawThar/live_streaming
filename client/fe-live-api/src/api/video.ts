import logger from '@/lib/logger';
import { liveStreamApi } from './utils';
import { API_METHOD, ApiRequest, ApiResponse, ApiService } from '@/data/api';
import { VIDEO_FETCH_STATUS_CODE } from '@/data/types/stream';
import { i18nT } from '@/lib/i18n';

export const fetchVideoWithAuth = async (
  url: string
): Promise<{
  success: boolean;
  result: string;
  status: VIDEO_FETCH_STATUS_CODE;
}> => {
  const request: ApiRequest = {
    service: ApiService.liveStream,
    url,
    method: API_METHOD.GET,
    authToken: true,
    download: true,
  };

  try {
    const response: ApiResponse = await liveStreamApi(request);

    if (response.code === 202)
      return {
        success: false,
        result: i18nT('VideoEncoding'),
        status: VIDEO_FETCH_STATUS_CODE.ENCODING,
      };
    else if (response.code === 404)
      return {
        success: false,
        result: i18nT('404Video'),
        status: VIDEO_FETCH_STATUS_CODE.NOT_FOUND,
      };
    else if (response.success && response.data) {
      const contentType = response?.headers?.['content-type'] || 'video/mp4';
      const blob = new Blob([response.data], { type: contentType });
      return {
        success: true,
        result: URL.createObjectURL(blob),
        status: VIDEO_FETCH_STATUS_CODE.OK,
      };
    } else
      return {
        success: false,
        result: i18nT('FailedToFetchVideo'),
        status: VIDEO_FETCH_STATUS_CODE.UNKNOWN,
      };
  } catch (e) {
    logger.error(e);
    return {
      success: false,
      result: i18nT('UnexpectedError'),
      status: VIDEO_FETCH_STATUS_CODE.UNKNOWN,
    };
  }
};

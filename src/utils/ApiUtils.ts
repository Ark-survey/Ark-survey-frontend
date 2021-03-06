import axios, { AxiosResponse } from 'axios';
import { t } from 'i18next';
import { errorNotice } from 'src/components/Notice';

export const get = (server: string, resource: string, data: { [key: string]: string }) => {
  let params: string[] = [];
  Object.keys(data).map((key) => params.push(key + '=' + data[key]));
  axios
    .get(import.meta.env.VITE_ORIGIN_ENV + server + '/' + resource + '?' + params.join('&'))
    .then((res) => res.data)
    .catch(() => {
      errorNotice(t('network.error'));
    });
};

export const post: <T>(server: string, resource: string, data?: any) => Promise<AxiosResponse<T>> = <T>(
  server: string,
  resource: string,
  data?: any,
) =>
  axios
    .post<any, AxiosResponse<any, any>, T>(import.meta.env.VITE_ORIGIN_ENV + server + '/' + resource, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data)
    .catch(() => {
      errorNotice(t('network.error'));
    });

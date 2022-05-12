import axios, { AxiosResponse } from "axios";
import { TierListServer } from "./TierListServer";

const DOMAIN = {
  product: "http://81.68.95.59:3000/",
  dev: "http://localhost:3000/",
};

export const get = (server: string, resource: string, data: { [key: string]: string }) => {
  let params = []
  for (let key in data) {
    params.push(key + '=' + data[key])
  }
  axios.get(DOMAIN.dev + server + '/' + resource + '?' + params.join('&')).then(res => res.data)
}

export const post: <T, >(server: string, resource: string, data: any) => Promise<AxiosResponse<T>> =
  <T,>(server: string, resource: string, data: any) =>
    axios.post<any, AxiosResponse<any, any>, T>(DOMAIN.dev + server + '/' + resource, data, {
      headers: {
        'Content-Type': 'application/json'

      },
    }).then(res => res.data)

export { TierListServer }

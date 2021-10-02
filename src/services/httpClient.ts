import axios from "axios";

export interface IHttpClientGetParameters {
  url: string;
}

export interface IHttpClientPostParameters<T> {
  url: string;
  payload: T;
}

export interface IGetResponse<T> {
  headers: any;
  data: T;
}

const DEFAULT_HEADERS = {
  "x-api-key": process.env.API_KEY,
};

export function get<T>({
  url,
}: IHttpClientGetParameters): Promise<IGetResponse<T>> {
  return new Promise<IGetResponse<T>>((resolve, reject) => {
    axios
      .get(url, {
        headers: DEFAULT_HEADERS,
      })
      .then((response: any) => {
        resolve({
          data: response.data as T,
          headers: response.headers,
        });
      })
      .catch((response: any) => {
        reject(response);
      });
  });
}

export function del<T>({ url }: IHttpClientGetParameters): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    axios
      .delete(url, {
        headers: DEFAULT_HEADERS,
      })
      .then((response: any) => {
        resolve(response.data as T);
      })
      .catch((response: any) => {
        reject(response);
      });
  });
}

export function post<T>({
  url,
  payload,
}: IHttpClientPostParameters<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    axios
      .post(url, payload, {
        headers: DEFAULT_HEADERS,
      })
      .then((response: any) => {
        resolve(response.data as T);
      })
      .catch((response: any) => {
        reject(response);
      });
  });
}

import { AxiosError, AxiosResponse } from "axios";

type BaseRequest<T, V> = (params?: T) => Promise<AxiosResponse<V>>;

type SuccessResponse<V> = {
  code: "success";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { response: V; headers: Partial<Record<string, any>> };
};

type ErrorResponse<E = AxiosError> = {
  code: "error";
  error: E;
};

type BaseResponse<V, E> = Promise<SuccessResponse<V> | ErrorResponse<E>>;

export const requestHandler =
  <T, V, E = AxiosError>(request: BaseRequest<T, V>) =>
  async (params?: T): BaseResponse<V, E> => {
    try {
      const response = await request(params);
      const data = {
        response: response.data,
        headers: response.headers || {},
      };
      return { code: "success", data };
    } catch (e) {
      return { code: "error", error: e as E };
    }
  };

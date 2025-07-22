export interface Options {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown> | FormData;
  params?: Record<string, unknown>;
  headers?: HeadersInit;
}

export interface FetchResponse<T> {
  data: T;
  message?: string | null;
}

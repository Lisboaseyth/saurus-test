"use client";

import React from "react";
import { useLoading } from "../useLoading/hook";
import { FetchResponse, Options } from "./interface";

const defaultPagination = {
  pageIndex: 1,
  totalResults: null,
  pageSize: 10,
  totalPages: 1,
};

export default function useFetch<T>() {
  const [data, setData] = React.useState<T>();
  const [pagination, setPagination] = React.useState(defaultPagination);

  const { isLoading, executeAsyncFunction } = useLoading();

  const request = async (
    url: string,
    options: Options
  ): Promise<FetchResponse<T>> => {
    const params = new URLSearchParams();

    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => params.append(`${key}[]`, item));
        } else {
          params.append(key, String(value));
        }
      });
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers || {}),
    };

    const config: RequestInit = {
      method: options.method,
      headers,
    };

    if (options.method !== "GET" && options.body) {
      config.body = JSON.stringify(options.body);
    }
    try {
      const res = await executeAsyncFunction(() =>
        fetch(`${url}?${params.toString()}`, config)
      );

      if (!res.ok) {
        const errorData = await res.json();
        return Promise.reject(
          new Error(errorData.title || "An error occurred")
        );
      }

      const responseData = await res.json();
      const pags = {
        pageIndex: responseData.pageIndex,
        pageSize: responseData.pageSize,
        totalPages: responseData.totalPages,
        totalResults: responseData.totalResults,
      };

      setPagination(pags || defaultPagination);
      setData(responseData as T);

      return Promise.resolve({
        data: { ...responseData },
        message: responseData.title || null,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      return Promise.reject(new Error(errorMessage));
    }
  };
  return [request, isLoading, data, pagination] as const;
}

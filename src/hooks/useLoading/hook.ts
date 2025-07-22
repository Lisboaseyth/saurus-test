"use client";

import React from "react";

export function useLoading() {
  const [isLoading, setIsloading] = React.useState(false);

  const executeAsyncFunction = async <T>(
    asyncFunction: () => Promise<T>
  ): Promise<T> => {
    setIsloading(true);
    try {
      return await asyncFunction();
    } catch (error) {
      throw error;
    } finally {
      setIsloading(false);
    }
  };

  return {
    isLoading,
    executeAsyncFunction,
  };
}

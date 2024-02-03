// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: "productApi",
  // @ts-ignore
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL_KEY}/api/` }),
  endpoints: (builder) => ({
    getProductByName: builder.query({
      query: (name) => `${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductByNameQuery } = productApi;

import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            providesTags:['Product'],
            keepUnusedDataFor: 5,
        }),
        
        getProductDetails: builder.query({
            query: (productId) => ({
              url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: PRODUCTS_URL,
                method: 'POST',
                body: data,
            }),
            //it will stop it from being cached so that we have fresh data
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.id}`,
                method: 'PUT',
                body: data,
            }),
            //it will stop it from being cached so that we have fresh data
            invalidatesTags: ['Product'],
        })
    }),
});

export const {useGetProductsQuery,useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation} = productApiSlice
import { PRODUCTS_URL, UPLOADS_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: ({keyword, pageNumber}) => ({
        url: PRODUCTS_URL,
        params: {pageNumber, keyword}
      }),
      providesTags: ['Product'],
      keepUnusedDataFor: 5
    }),

    getProductDetails: builder.query({
      query: productId => ({
        url: `${PRODUCTS_URL}/${productId}`
      }),
      keepUnusedDataFor: 5
    }),
    createProduct: builder.mutation({
      query: data => ({
        url: PRODUCTS_URL,
        method: 'POST',
        body: data
      }),
      //it will stop it from being cached so that we have fresh data
      invalidatesTags: ['Product']
    }),
    updateProduct: builder.mutation({
      query: data => ({
        url: `${PRODUCTS_URL}/${data.id}`,
        method: 'PUT',
        body: data
      }),
      //it will stop it from being cached so that we have fresh data
      invalidatesTags: ['Product']
    }),

    uploadProductImage: builder.mutation({
      query: data => ({
        url: `${UPLOADS_URL}`,
        method: 'POST',
        body: data
      }),
      //it will stop it from being cached so that we have fresh data
      invalidatesTags: ['Product']
    }),

    deleteProduct: builder.mutation({
      query: productId => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE'
      })
    }),
createReview: builder.mutation({
    query:(data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
        
    }),
    invalidatesTags:['Product']
}),

getTopProducts: builder.query({
  query: () => `${PRODUCTS_URL}/top`,
  keepUnusedDataFor: 5,
}),
}),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery
} = productApiSlice

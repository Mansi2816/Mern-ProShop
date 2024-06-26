import { apiSlice } from "./apiSlice";
import { ORDERS_URL} from "../constants";


export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: order,
            }),
            keepUnusedDataFor: 5,
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
              url: `${ORDERS_URL}/${orderId}`,
              
              
            }),
            keepUnusedDataFor: 5,
        }),

        payOrder:builder.mutation({
            query: ({orderId, details}) => ({
       url: `${ORDERS_URL}/${orderId}/pay`,
       method: 'PUT',
       body: {...details},
            }),
            
            }),

        getMyOrders: builder.query({
            query: () => ({
              url: `${ORDERS_URL}/myorders`,
            }),
            keepUnusedDataFor: 5,
          }),

        getOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}`,
            }),
            keepUnusedDataFor: 5,
        }),
        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/delivered`,
                method: 'PUT',
            }),
            invalidatesTags: ['Order']
        }),

        deleteOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
                method: 'DELETE',
            }),
           
            invalidatesTags: ['Order']
        })
    }),
})

export const {useCreateOrderMutation, useGetOrderDetailsQuery, useGetMyOrdersQuery ,useGetOrdersQuery, useDeliverOrderMutation, useDeleteOrderMutation, usePayOrderMutation} = ordersApiSlice
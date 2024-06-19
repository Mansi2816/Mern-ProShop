import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),           
        }),
            register: builder.mutation({
                query:(data) => ({
                    url: `${USERS_URL}`,
                    method: 'POST',
                    body: data,
                })
            }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL
            }),
            //if we don't do this, we have to reload the page after deleting the user
            providesTags: ['Users'],
            keepUnusedDataFor: 5
        }),
      deleteUser: builder.mutation({
    query:(userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
    })
      })
    }),
});

export const {useLogoutMutation, useLoginMutation, useRegisterMutation, useDeleteUserMutation } = usersApiSliceuseGetUsersQuery
import { apiSlice } from '../../redux/action/auth';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BACKEND_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    if (localStorage.getItem('token')) {
      headers.set('authorization', `Bearer ${localStorage.getItem('token')}`);
    }
    return headers;
  },
});

export const userApi = apiSlice.injectEndpoints({
  tagTypes: ['getAllUser'],
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => {
        return {
          url: `/user`,
        };
      },

      providesTags: ['getAllUser'],
      transformResponse: (response, meta, args) => response.data,
    }),

    getDetailUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
      }),

      providesTags: ['getDetailUser'],
      transformResponse: (response, meta, args) => response.data[0],
    }),

    updateUserById: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/user/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['getUserById'],
      transformResponse: (response, meta, args) => response,
    }),

    deleteUser: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/user/${id}`,
          method: 'DELETE',
          body: data,
        };
      },
      providesTags: ['getDetailUser'],
      transformResponse: (response, meta, args) => response,
    }),
  }),
});

export const { useGetAllUserQuery, useGetUserByIdQuery, useUpdateUserByIdMutation } = userApi;

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

export const messageApi = apiSlice.injectEndpoints({
  tagTypes: ['getReceiverById'],
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getReceiverById: builder.query({
      query: (id) => ({
        url: `/message/${id}`,
      }),

      providesTags: ['getReceiverById'],
      transformResponse: (response, meta, args) => response.data,
    }),
    createMessage: builder.mutation({
      query: (data, id) => ({
        url: `/message/${id}`,
        method: 'POST',
        body: data,
      }),

      providesTags: ['createMessage'],
      transformResponse: (response, meta, args) => response,
    }),
  }),
});

export const { useGetReceiverByIdQuery, useCreateMessageMutation } = messageApi;

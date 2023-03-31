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

export const AuthApi = apiSlice.injectEndpoints({
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (data) => ({
        url: '/user/auth/login',
        method: 'POST',
        body: data,
      }),

      transformResponse: (response, meta, args) => response,
    }),

    userRegister: builder.mutation({
      query: (data) => ({
        url: '/user/auth/register',
        method: 'POST',
        body: data,
      }),

      transformResponse: (response, meta, args) => response,
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: '/user/auth/profile',
      }),

      transformResponse: (response, meta, args) => response.data,
    }),
  }),
});

export const { useUserLoginMutation, useUserRegisterMutation, useGetUserProfileQuery } = AuthApi;

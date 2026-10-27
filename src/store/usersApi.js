// src/store/usersApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

{/*
  fetchBaseQuery: A lightweight wrapper around the standard JavaScript fetch API designed specifically to handle headers, 
  base URLs, and response parsing.
  @reduxjs/toolkit/query/ vs @reduxjs/toolkit/query/react:
  The Core Package is @reduxjs/toolkit/query/, it handles the raw data fetching logic, caching rules, background refetching, and 
  store middleware. It knows nothing about React.
  adding /react at the end wraps the core engine and adds the special React integration layer. When you add /react to your import,
  you are telling Redux: "I am building a React application. Please turn on the React-specific features for me.

*/}


export const usersApi = createApi({
  reducerPath: "usersApi",          // tells Redux where to store all the cached data, loading states, and metadata inside your global Redux store object.
  baseQuery: fetchBaseQuery({ baseUrl: "https://reqres.in/api/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Get paginated list of users (e.g., page 1 or 2)
    getUsers: builder.query({
      query: (page = 1) => `users?page=${page}`,
      providesTags: ["User"],
    }),

    // Get a single user by ID
    getUserById: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // Create a new user
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),

    // Update an existing user
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        "User",
      ],
    }),

    // Delete a user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Export auto-generated hooks for usage in functional components
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;

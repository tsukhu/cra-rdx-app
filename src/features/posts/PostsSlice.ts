import { createSlice, createAction } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  loading: false,
  error: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetch: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    fetchSuccess: (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    },
    fetchFailure: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
  },
});

export default postsSlice.reducer;
export const { fetch, fetchSuccess, fetchFailure } = postsSlice.actions;
export const selectPosts = (state: { posts: { data: any; }; }) => state.posts.data;
export const selectLoading = (state: { posts: { loading: any; }; }) => state.posts.loading;
export const selectError = (state: { posts: { error: any; }; }) => state.posts.error;

export const fetchPostsAsync = createAction("POSTS_FETCH_ASYNC");


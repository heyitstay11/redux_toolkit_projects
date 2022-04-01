import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getPost = createAsyncThunk('post/getPost', async (id) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
                .then(res => res.json());
});

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: [],
        loading: false,
        error: null,
    },
    extraReducers: {
        [getPost.pending]: (state, action) => {
            state.loading = true;
        },
        [getPost.fulfilled]: (state, action) => {
            state.post = [action.payload];
            state.loading = false;
        },
        [getPost.pending]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});

export default postSlice.reducer;

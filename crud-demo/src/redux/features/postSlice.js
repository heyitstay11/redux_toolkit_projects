import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getPost = createAsyncThunk('post/getPost', async (id) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
                .then(res => res.json());
});

export const deletePost = createAsyncThunk('post/deletePost', async (id) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE'})
                .then(res => res.json());
});

export const createPost = createAsyncThunk('post/createPost', async ({ title, body}) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/`,
    { method: 'POST', headers: { Accept: 'application/json', "Content-type" : 'application/json'}, body: JSON.stringify({ title, body}) })
                .then(res => res.json());
});

export const updatePost = createAsyncThunk('post/createPost', async ({ id, body}) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,
    { method: 'PUT', headers: { Accept: 'application/json', "Content-type" : 'application/json'}, body: JSON.stringify({ body}) })
                .then(res => res.json());
});

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: [],
        loading: false,
        error: null,
        edit: false,
        body: '',
    },
    reducers: {
        setEdit: (state, action) => {
            state.edit = action.payload.edit;
            state.body = action.payload.body;
        }
    }
    ,
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
        [deletePost.pending]: (state, action) => {
            state.loading = true;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.post = action.payload;
            state.loading = false;
        },
        [deletePost.pending]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        [createPost.pending]: (state, action) => {
            state.loading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = [action.payload];
        },
        [createPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [updatePost.pending]: (state, action) => {
            state.loading = true;
        },
        [updatePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = [action.payload];
        },
        [updatePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const { setEdit } = postSlice.actions;
export default postSlice.reducer;

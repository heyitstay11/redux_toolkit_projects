import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCocktails = createAsyncThunk(
    "cocktails/fetchCocktails"
    , async () => {
        return fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
                    .then((res) => res.json())
    }
);

export const fetchSingleCocktail = createAsyncThunk(
    "cocktails/fetchiSingleCocktail"
    , async (id) => {
        return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
                    .then((res) => res.json())
    }
);

export const fetchSearchCocktails = createAsyncThunk(
    "cocktails/fetchiSearchCocktail"
    , async (searchText) => {
        return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
                    .then((res) => res.json())
    }
);

const cocktailSlice = createSlice({
    name: 'cocktails',
    initialState: {
        cocktails: [],
        cocktail: [],
        loading: false,
        error: null
    },
    extraReducers: {
        [fetchCocktails.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchCocktails.fulfilled]: (state, action) => {
            state.cocktails = action.payload.drinks;
            state.loading = false;
        },
        [fetchCocktails.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [fetchSingleCocktail.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchSingleCocktail.fulfilled]: (state, action) => {
            state.cocktail = action.payload.drinks;
            console.log( action.payload.drinks);
            state.loading = false;
        },
        [fetchSingleCocktail.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [fetchSearchCocktails.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchSearchCocktails.fulfilled]: (state, action) => {
            state.cocktails = action.payload.drinks;
            state.loading = false;
        },
        [fetchSearchCocktails.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export default cocktailSlice.reducer;
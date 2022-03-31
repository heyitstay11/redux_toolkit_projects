import { configureStore } from '@reduxjs/toolkit';
import cocktailReducer from './features/cocktailSlice';

export default configureStore({
    reducer : {
        app: cocktailReducer,
    }
})

import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import { postApi } from "./postApi";
// import postReducer from './postSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        [postApi.reducerPath]: postApi.reducer,
        //post: postReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postApi.middleware),
});




export default store
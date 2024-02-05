import { configureStore } from "@reduxjs/toolkit"
import ProductReducer from "../features/productList/ProductSlice";
import AuthReducer from "../features/auth/AuthSlice";


export const store = configureStore({
    reducer: {
        Products: ProductReducer,
        Users: AuthReducer
    }
})

export default store;
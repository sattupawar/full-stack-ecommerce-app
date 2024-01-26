import { configureStore } from "@reduxjs/toolkit"
import ProductReducer from "../features/productList/ProductSlice";


export const store = configureStore({
    reducer: {
        Products: ProductReducer,
    }
})

export default store;
import { configureStore } from "@reduxjs/toolkit"
import ProductReducer from "../features/productList/ProductSlice";
import AuthReducer from "../features/auth/AuthSlice";
import CartReducer from "../features/cart/CartSlice"

export const store = configureStore({
    reducer: {
        Products: ProductReducer,
        Users: AuthReducer,
        Cart: CartReducer,

    }
})

export default store;
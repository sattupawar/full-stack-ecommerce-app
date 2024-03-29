import { configureStore } from "@reduxjs/toolkit"
import ProductReducer from "../features/productList/ProductSlice";
import AuthReducer from "../features/auth/AuthSlice";
import CartReducer from "../features/cart/CartSlice"
import OrderReducer from "../features/order/OrderSlice"
import UserOrderReducer from "../features/user/UserSlice"
export const store = configureStore({
    reducer: {
        Products: ProductReducer,
        Users: AuthReducer,
        Cart: CartReducer,
        Orders: OrderReducer,
        UserOrders: UserOrderReducer

    }
})

export default store;
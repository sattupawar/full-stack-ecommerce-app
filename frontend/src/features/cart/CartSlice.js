import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToBasket, deleteAllItemsInBasket, deleteBasket, fetchBasketByUserId, updateBasket } from "./CartApi";
import { fetchProductByIdAsync } from "../productList/ProductSlice";


export const incrementAsync = createAsyncThunk("counter/fetchCount", async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
})

export const addToBasketAsync = createAsyncThunk("cart/addToBasket", async (item) => {
    const response = await addToBasket(item);
    return response.data;
})

export const fetchBasketByIdAsync = createAsyncThunk("cart/fetchBasketbyId", async (userId) => {
    const response = await fetchBasketByUserId(userId);
    return response.data;
})

export const updateBasketAsync = createAsyncThunk("cart/updateBasket", async (update) => {
    const response = await updateBasket(update);
    return response.data;
})
export const deleteBasketAsync = createAsyncThunk("cart/deleteBasket", async (itemId) => {
    const response = await deleteBasket(itemId);
    return response.data;
})

export const resetCart = createAsyncThunk("cart/deleteAllItemsInBasket", async (userid) => {
    const response = await deleteAllItemsInBasket(userid);
    return response.data;
})

export const CartSlice = createSlice({
    name: "cart",
    initialState: {
        status: "idle",
        items: [],
    },
    reducers: {

        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(incrementAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(incrementAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.value += action.payload
        }).addCase(addToBasketAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(addToBasketAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.items.push(action.payload)
        }).addCase(fetchBasketByIdAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(fetchBasketByIdAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.items = action.payload
        }).addCase(updateBasketAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(updateBasketAsync.fulfilled, (state, action) => {
            state.status = "idle"
            // index find karna padega :
            const index = state.items.findIndex(item => item.id == action.payload.id)
            state.items[index] = action.payload
        }).addCase(deleteBasketAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(deleteBasketAsync.fulfilled, (state, action) => {
            state.status = "idle"
            // index find karna padega :
            const index = state.items.findIndex(item => item.id == action.payload.id)
            state.items.splice(index, 1);
        }).addCase(resetCart.pending, (state) => {
            state.status = "loading"
        }).addCase(resetCart.fulfilled, (state, action) => {
            state.status = "idle"
            // index find karna padega :
            state.items = []
        })
    }

})

export const { increment, decrement, incrementByAmount } = CartSlice.actions;
export const selectBasket = (state) => state.Cart.items;

export default CartSlice.reducer;
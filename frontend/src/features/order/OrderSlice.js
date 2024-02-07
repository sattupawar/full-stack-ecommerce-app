import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToOrder } from "./OrderApis";


export const incrementAsync = createAsyncThunk("counter/fetchCount", async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
})
export const addToOrderAsync = createAsyncThunk("orders/addToOrder", async (order) => {
    const response = await addToOrder(order);
    return response.data;
})



export const OrderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        orderPlace: null
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
        }).addCase(addToOrderAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(addToOrderAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.orders.push(action.payload)
            state.orderPlace = action.payload;
        })
    }

})

export const { increment, decrement, incrementByAmount } = OrderSlice.actions;
export const selectOrderPlace = (state) => state.Orders.orderPlace

export default OrderSlice.reducer;
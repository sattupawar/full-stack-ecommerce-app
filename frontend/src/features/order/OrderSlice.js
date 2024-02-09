import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToOrder, fetchAllOrders } from "./OrderApis";


export const incrementAsync = createAsyncThunk("counter/fetchCount", async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
})
export const addToOrderAsync = createAsyncThunk("orders/addToOrder", async (order) => {
    const response = await addToOrder(order);
    return response.data;
})

export const fetchAllOrdersAsync = createAsyncThunk("orders/fetchAllOrders", async (pagination) => {
    const response = await fetchAllOrders(pagination);
    return response.data;
})


export const OrderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        orderPlace: null,
        totalOrders: 0
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
        },

        resetOrders: (state) => {
            state.orderPlace = null;
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
        }).addCase(fetchAllOrdersAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.orders = action.payload.orders
            state.totalOrders = action.payload.totalOrders
        })
    }

})

export const { increment, decrement, incrementByAmount, resetOrders } = OrderSlice.actions;
export const selectOrderPlace = (state) => state.Orders.orderPlace
export const selectTotalOrders = (state) => state.Orders.totalOrders
export const selectOrders = state => state.Orders.orders

export default OrderSlice.reducer;
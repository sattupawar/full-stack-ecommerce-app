import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductsFilter } from "./ProductLIstApi";

export const incrementAsync = createAsyncThunk("counter/fetchCount", async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
})


export const fetchProductsAsync = createAsyncThunk("productName/fetchProducts", async () => {
    const response = await fetchProducts();
    return response.data;
})

export const fetchProductsFilterAsync = createAsyncThunk("productName/fetchProductsFilter", async (filter) => {
    const response = await fetchProductsFilter(filter);
    return response.data
})

export const ProductSlice = createSlice({
    name: "productName",
    initialState: {
        list: []
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
        }).addCase(fetchProductsAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(fetchProductsAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.list = action.payload
        }).addCase(fetchProductsFilterAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(fetchProductsFilterAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.list = action.payload
        })
    }

})

export const { increment, decrement, incrementByAmount } = ProductSlice.actions;

export default ProductSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./ProductLIstApi";


export const incrementAsync = createAsyncThunk("counter/fetchCount", async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
})



export const CounterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 1
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
        })
    }

})

export const { increment, decrement, incrementByAmount } = CounterSlice.actions;

export default CounterSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUser, fetchLoggedInUserOrders } from "./UserApi";


export const incrementAsync = createAsyncThunk("counter/fetchCount", async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
})

export const fetchLoggedInUserAsync = createAsyncThunk("user/fetchLoggedInUser", async (userId) => {
    const response = await fetchLoggedInUser(userId);
    return response.data;
})

export const fetchLoggedInUsersOrdersAsync = createAsyncThunk("user/fetchLoggedInUserOrders", async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    return response.data;
})

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: null,
        userOrders: [],
        status: "idle"

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
        }).addCase(fetchLoggedInUserAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.userInfo = action.payload
        }).addCase(fetchLoggedInUsersOrdersAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(fetchLoggedInUsersOrdersAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.userOrders = action.payload
        })
    }

})

export const { increment, decrement, incrementByAmount } = UserSlice.actions;
export const selectUserOrders = (state) => state.UserOrders.userOrders;
export const selectUserInfo = (state) => state.UserOrders.userInfo
export default UserSlice.reducer;
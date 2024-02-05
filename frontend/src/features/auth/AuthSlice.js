import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser } from "./AuthApi";




export const createUserAsync = createAsyncThunk("auth/createUser", async (userData) => {
    const response = await createUser(userData);
    return response.data;
})
export const checkUserAsync = createAsyncThunk("auth/checkUser", async (loginInfo) => {
    const response = await checkUser(loginInfo);
    return response.data;
})


export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: null,
        error: null


    },
    reducers: {

        increment: state => {
            state.value += 1
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.pending, (state) => {
                state.status = "loading"
            }).addCase(createUserAsync.fulfilled, (state, action) => {
                state.status = "idle"
                state.isLoggedIn = action.payload
            }).addCase(checkUserAsync.pending, (state) => {
                state.status = "loading"
            }).addCase(checkUserAsync.fulfilled, (state, action) => {
                state.status = "idle"
                state.isLoggedIn = action.payload
            }).addCase(checkUserAsync.rejected, (state, action) => {
                state.status = "idle"
                state.error = action.error
            })
    }

})

export const { increment } = authSlice.actions;
export const selectLoggedUser = (state) => state.Users.isLoggedIn

export default authSlice.reducer;
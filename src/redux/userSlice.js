import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: null
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: () => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        }
    },
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure, logout } = counterSlice.actions

export default counterSlice.reducer
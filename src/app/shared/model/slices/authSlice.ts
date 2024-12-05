import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    authed: boolean;
}
const initialState: AuthState = {
    authed: false,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthStatus: (state = initialState, action: PayloadAction<boolean>) => {
            state.authed = action.payload;
        },
    }
})
export const { setAuthStatus } = authSlice.actions;
export default authSlice.reducer
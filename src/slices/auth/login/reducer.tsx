import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';

export const initialState = {
    user: "",
    error: "",// for error msg
    loading: false,
    isUserLogout: false,
    errorMsg: false,// for error
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginSuccess(state, action) {
            const cookies = new Cookies(null, { path: '/' });
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7); // Set expiration 7 days from now
            
            console.log(action.payload)
            cookies.remove('authToken');
            cookies.set('authToken', action.payload['authorization'], { expires: expirationDate });

            state.user = action.payload
            state.loading = false;
            state.errorMsg = false;
        },
        apiError(state, action) {
            state.error = action.payload;
            state.loading = true;
            state.isUserLogout = false;
            state.errorMsg = true;
        },
        resetLoginFlag(state) {
            state.error = "";
            state.loading = false;
            state.errorMsg = false;
        },
        logoutUserSuccess(state, action) {
            const cookies = new Cookies(null, { path: '/' });
            cookies.remove('authToken');
            localStorage.removeItem("authUser");
            
            state.isUserLogout = true
        },
    }
});
export const { loginSuccess, apiError, resetLoginFlag, logoutUserSuccess } = loginSlice.actions;
export default loginSlice.reducer;
import { getFirebaseBackend } from "helpers/firebase_helper";
import { postJwtValidation, postEmailVerification, postLogin, postJwtLogin, postRegister } from "helpers/fakebackend_helper";
import { loginSuccess, apiError, logoutUserSuccess, resetLoginFlag } from "./reducer";
import Cookies from 'universal-cookie';
import { ApiError, ApiResponse, isApiError } from "helpers/api_interfaces";

export const loginuser = (user: any, history: any) => async (dispatch: any) => {
    try {
        let response: ApiResponse = await postLogin({
            email: user.email,
            password: user.password
        })

        dispatch(loginSuccess(response));
        history('/dashboard');
    } catch (ex) {

        if (isApiError(ex)) {
            let error = ex as ApiError

            if (error.status == 403) { 
                history('/email-verification?email=' + user.email);
                return
            }
            if (error.status == 401) { 
                dispatch(apiError("Invalid credentials"));
                return
            }
            if (error.status == 404) { 
                dispatch(apiError("User not registered"));
                return
            }
        } 
        dispatch(apiError(JSON.stringify(ex)));
    }
}

export const emailVerification = (data: any, history: any) => async (dispatch: any) => {
    try {

        let response: ApiResponse = await postEmailVerification({
            code: data.code,
            email: data.email
        })

        dispatch(loginSuccess(response.data));
        history('/dashboard');
    } catch (ex) {
        
        if (isApiError(ex)) {
            let error = ex as ApiError

            if (error.status == 404) { 
                dispatch(apiError("Invalid Code"));
                return
            }

            if (error.status == 409) { 
                dispatch(apiError("The user is already registered and verified."));
                return
            }
        } 
        dispatch(apiError(JSON.stringify(ex)));
    }
}

export const jwtValidation = async (data: any): Promise<boolean> => {
    try {
        let response: any;
        console.log("data: " + JSON.stringify(data))
        response = await postJwtValidation(data)


        console.log("response: " + JSON.stringify(response))
        return true

    } catch (error) {
        return false
    }
}

export const logoutUser = () => async (dispatch: any) => {
    try {

        dispatch(logoutUserSuccess(true));

    } catch (error) {
        dispatch(apiError(error));
    }
};

export const resetLoginMsgFlag = () => {
    try {
        const response = resetLoginFlag();
        return response;
    } catch (error) {
        return error;
    }
};

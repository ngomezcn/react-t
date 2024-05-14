import { getFirebaseBackend } from "helpers/firebase_helper";
import { postJwtValidation, postEmailVerification, postFakeLogin, postJwtLogin } from "helpers/fakebackend_helper";
import { loginSuccess, apiError, logoutUserSuccess, resetLoginFlag } from "./reducer";
import Cookies from 'universal-cookie';

export const loginuser = (user: any, history: any) => async (dispatch: any) => {
    try {
        let response: any;

        response = await postFakeLogin({
            email: user.email,
            password: user.password
        })
        
        //localStorage.setItem("authUser", JSON.stringify(response));
        dispatch(loginSuccess(response));
        history('/dashboard');
    } catch (error) {
        dispatch(apiError(error));
    }
}

export const emailVerification = (data: any, history: any) => async (dispatch: any) => {
    try {
        let response: any;

        response = await postEmailVerification(data)

        dispatch(loginSuccess(response));
        history('/dashboard');
    } catch (error) {
        dispatch(apiError(error));
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

        /*localStorage.removeItem("authUser");

        const fireBaseBackend = getFirebaseBackend();
        if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            const response = fireBaseBackend.logout;
            dispatch(logoutUserSuccess(response));
        } else {
            dispatch(logoutUserSuccess(true));
        }*/

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


export const socialLogin = (type: any, history: any) => async (dispatch: any) => {
    try {
        let response: any;

        if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            const fireBaseBackend = getFirebaseBackend();
            response = fireBaseBackend.socialLoginUser(type);
        }

        const socialdata = await response;
        if (socialdata) {
            sessionStorage.setItem("authUser", JSON.stringify(socialdata));
            dispatch(loginSuccess(socialdata));
            history('/dashboard');
        }

    } catch (error) {
        dispatch(apiError(error));
    }
};
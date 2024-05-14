import { userForgetPasswordSuccess, userForgetPasswordError } from "./reducer"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";

import {
    postFakeForgetPwd,
    postJwtForgetPwd,
} from "../../../helpers/fakebackend_helper";

const fireBaseBackend = getFirebaseBackend();

export const userForgetPassword = (user, history) => async (dispatch) => {
    try {
        let response;

        response = postFakeForgetPwd({email: user.email})

        const data = await response;

        if (data) {
            dispatch(userForgetPasswordSuccess(
                "Reset link are sended to your mailbox, check there first"
            ))
        }
    } catch (forgetError) {
        dispatch(userForgetPasswordError(forgetError))
    }
}
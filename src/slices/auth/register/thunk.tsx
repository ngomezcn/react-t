//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postRegister,
  postJwtRegister,
} from "../../../helpers/fakebackend_helper";

// action
import {
  registerUserSuccessful,
  registerUserFailed,
  resetRegisterFlagChange,
  apiErrorChange
} from "./reducer";

import { ApiError, ApiResponse, isApiError } from "helpers/api_interfaces";

// Is user register successfull then direct plot user in redux.
export const registerUser = (user: any, history: any) => async (dispatch: any) => {
  try {
    let response;

    response = postRegister({
      email: user.email,
      username: user.username,
      password: user.password,
    });
    const data: any = await response;
    dispatch(registerUserSuccessful(data));
    history('/email-verification?email=' + user.email);

  } catch (ex) {

    if (isApiError(ex)) {
      let error = ex as ApiError

      if (error.status == 409) {
        dispatch(registerUserFailed("User already registered"));
        return
      }

    }
    dispatch(registerUserFailed(JSON.stringify(ex)));
  };
}

export const resetRegisterFlag = () => {
  try {
    const response = resetRegisterFlagChange();
    return response;
  } catch (error) {
    return error;
  }
};

export const apiError = () => {
  try {
    const response = apiErrorChange("");
    return response;
  } catch (error) {
    return error;
  }
};
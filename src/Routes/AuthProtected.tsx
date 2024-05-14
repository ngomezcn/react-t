import React from "react";
import { Navigate } from "react-router-dom";
import { jwtValidation } from "slices/auth/login/thunk";
import Cookies from 'universal-cookie';
import { postJwtValidation } from "helpers/fakebackend_helper";

const AuthProtected = (props) => {
  return (<React.Fragment>
    {props.children}
  </React.Fragment>);
};

export default AuthProtected;

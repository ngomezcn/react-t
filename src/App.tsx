import React, { useEffect, useState } from "react";
import "./App.css";
import { authProtectedRoutes, publicRoutes } from "./Routes/allRoutes";
import { Route, Routes } from "react-router-dom";
import VerticalLayout from "./Layouts/VerticalLayout";
import HorizontalLayout from "./Layouts/HorizontalLayout/index";
import "./assets/scss/theme.scss";
import NonAuthLayout from "./Layouts/NonLayout";
import ClipLoader from 'react-spinners/ClipLoader'
import PuffLoader from 'react-spinners/PuffLoader'
import { useNavigate } from "react-router-dom";

//constants
import {
  LAYOUT_TYPES,
} from "./Components/constants/layout";

import fakeBackend from "./helpers/AuthType/fakeBackend";

import { useSelector } from "react-redux";
import { createSelector } from 'reselect';
import AuthProtected from "./Routes/AuthProtected";
import { jwtValidation } from "./slices/auth/login/thunk"
import Cookies from 'universal-cookie';
import { Navigate } from "react-router-dom";

fakeBackend();  

const getLayout = (layoutType: any) => {
  let Layout = VerticalLayout;
  switch (layoutType) {
    case LAYOUT_TYPES.VERTICAL:
      Layout = VerticalLayout;
      break;
    case LAYOUT_TYPES.HORIZONTAL:
      Layout = HorizontalLayout;
      break;
    default:
      break;
  }
  return Layout;
};

function App() {
  const [loading, setLoading] = useState(false)
  const [authenticated, setAuthenticated] = useState(false);
  const cookies = new Cookies(null, { path: '/' });
  let navigate = useNavigate();

  const selectLeadData = createSelector(
    (state: any) => state.Layout,
    (layout) => ({
      layoutTypes: layout.layoutTypes
    })
  );
  const { layoutTypes } = useSelector(selectLeadData);

  const Layout = getLayout(layoutTypes);

  useEffect(() => {
    setLoading(true)

    const validateToken = async () => {
      const isValid = await jwtValidation({ "token": cookies.get("authToken") });
      console.log(isValid)
      setAuthenticated(isValid);
      if (!isValid) {
       navigate("/login");
      }

      setLoading(false);
    };

    validateToken();

  }, [])


  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      {loading && (
        <PuffLoader
          color={"#546DE4"}
          loading={loading}
          size={200}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </div>
    );
  }

  return (
    <React.Fragment>

      <Routes>

        {publicRoutes.map((route, idx) => (
          <Route path={route.path} key={idx}
            element={<NonAuthLayout>{route.component}</NonAuthLayout>} />
        ))}
        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            key={idx}
            element={
              <React.Fragment>
                <AuthProtected>
                  <Layout>
                    {route.component}
                  </Layout>
                </AuthProtected>
              </React.Fragment>
            }
          />
        ))}


      </Routes>

    </React.Fragment>
  );
}

export default App;

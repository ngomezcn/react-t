import React, { useState, useEffect } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import { Link } from "react-router-dom";
import withRouter from "../../Common/withRouter";
import { createSelector } from 'reselect';

// users
import user1 from "../../../assets/images/users/avatar-1.jpg";

import { useSelector } from "react-redux";

const ProfileMenu = (props: any) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  const [username, setUsername] = useState("null");

  const selectProfileProperties = createSelector(
    (state: any) => state.Profile,
    (profile) => ({
      user: profile.user,
    })
  );

  const { user } = useSelector(selectProfileProperties);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {

      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      setUsername(obj.displayName);
    }
  }, [user]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src= {'http://localhost:8080/api/v1/images/'+username+'.png'}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">{username || "admin"}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href={process.env.PUBLIC_URL + "/profile"}>
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </DropdownItem>
          
          
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withRouter(withTranslation()(ProfileMenu));
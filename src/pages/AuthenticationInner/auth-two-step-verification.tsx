import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Label,
  Input,
  Row,
} from "reactstrap"

// import images
import logodark from "../../assets/images/logo-dark.svg"
import logolight from "../../assets/images/logo-light.svg"
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup";

import { FormFeedback, Alert } from "reactstrap";
// Formik validation
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

//import thunk
import { emailVerification, resetLoginMsgFlag } from "slices/auth/login/thunk";

import withRouter from "Components/Common/withRouter";
import { createSelector } from 'reselect';

const TwostepVerification = (props: any) => {

  //meta title
  document.title = "Email";
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch: any = useDispatch();

  const selectProperties = createSelector(
    (state: any) => state.Login,
    (login) => ({
      error: login.error
    })
  );

  const { error } = useSelector(selectProperties);

  // Form validation 
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      digit1: "" || '',
      digit2: "" || '',
      digit3: "" || '',
      digit4: "" || '',
    },

    validationSchema: Yup.object({
      digit1: Yup.string().required("."),
      digit2: Yup.string().required("."),
      digit3: Yup.string().required("."),
      digit4: Yup.string().required("."),
    }),
    onSubmit: (values: any) => {
      console.log("RULA???")
      console.log(values)

      dispatch(emailVerification({
        "code": values.digit1+values.digit2+values.digit3+values.digit4,
        "email": searchParams.get("email"),
      }, props.router.navigate));
    }
  });


  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(resetLoginMsgFlag())
      }, 3000);
    }
  }, [dispatch, error])

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5 text-muted">
                <Link to="/dashboard" className="d-block auth-logo">
                  <img
                    src={logodark}
                    alt=""
                    height="20"
                    className="auth-logo-dark mx-auto"
                  />
                  <img
                    src={logolight}
                    alt=""
                    height="20"
                    className="auth-logo-light mx-auto"
                  />
                </Link>
                <p className="mt-3">React Admin & Dashboard Template</p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody>
                  <div className="p-2">
                    <div className="text-center">
                      <div className="avatar-md mx-auto">
                        <div className="avatar-title rounded-circle bg-light">
                          <i className="bx bxs-envelope h1 mb-0 text-primary"></i>
                        </div>
                      </div>
                      <div className="p-2 mt-4">
                        <h4>Verify your email</h4>
                        <p className="mb-5">
                          Please enter the 4 digit code sent to <span className="fw-semibold">{searchParams.get("email")}</span>
                        </p>

                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}>
                          <Row>
                            {error ? <div className="mb-3">
                              <Alert color="danger">{error}</Alert>
                            </div> : null}
                            <Col className="col-3">
                              <div className="mb-3">
                                <Label htmlFor="digit1-input" className="visually-hidden">Dight 1</Label>
                                <Input
                                  name="digit1"
                                  className="form-control form-control-lg text-center two-step"
                                  type="text"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.digit1 || ""}
                                  invalid={
                                    validation.touched.digit1 && validation.errors.digit1 ? true : false
                                  }
                                  maxLength={1}
                                  data-value="1"
                                  id="digit1-input" />
                              </div>
                            </Col>

                            <Col>
                              <div className="mb-3">
                                <Label htmlFor="digit3-input" className="visually-hidden">Dight 3</Label>
                                <Input
                                  name="digit2"
                                  className="form-control form-control-lg text-center two-step"
                                  type="text"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.digit2 || ""}
                                  invalid={
                                    validation.touched.digit2 && validation.errors.digit2 ? true : false
                                  }
                                  maxLength={1}
                                  data-value="1"
                                  id="digit2-input" />
                              </div>
                            </Col>

                            <Col>
                              <div className="mb-3">
                                <Label htmlFor="digit2-input" className="visually-hidden">Dight 2</Label>
                                <Input
                                  name="digit3"
                                  className="form-control form-control-lg text-center two-step"
                                  type="text"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.digit3 || ""}
                                  invalid={
                                    validation.touched.digit3 && validation.errors.digit3 ? true : false
                                  }
                                  maxLength={1}
                                  data-value="1"
                                  id="digit3-input" />
                              </div>
                            </Col>

                            <Col>
                              <div className="mb-3">
                                <Label htmlFor="digit4-input" className="visually-hidden">Dight 4</Label>
                                <Input
                                  name="digit4"
                                  className="form-control form-control-lg text-center two-step"
                                  type="text"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.digit4 || ""}
                                  invalid={
                                    validation.touched.digit4 && validation.errors.digit4 ? true : false
                                  }
                                  maxLength={1}
                                  data-value="1"
                                  id="digit4-input" />
                              </div>
                            </Col>

                          </Row>
                          <div className="mt-4">
                            <button className="btn btn-success w-md" type="submit">Confirm</button>
                          </div>
                        </Form>

                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Didn't receive a code ? <Link to="#" className="fw-medium text-primary"> Resend</Link>
                </p>
                <p>
                  © {new Date().getFullYear()} Mercantec. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(TwostepVerification);


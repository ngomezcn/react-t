import React from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Container, Row } from "reactstrap"

// import images
import logodark from "../../assets/images/logo-dark.svg"
import logolight from "../../assets/images/logo-light.svg"

const EmailVerification = () => {

  //meta title
  document.title="Email Verification | Mercantec - Quiz Project";

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
                        <p>
                          We have sent you verification email{" "}
                          <span className="fw-semibold">
                            example@abc.com
                          </span>
                          , Please check it
                        </p>
                        <div className="mt-4">
                          <Link
                            to="/dashboard"
                            className="btn btn-success w-md"
                          >
                            Verify email
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Didn&apos;t receive an email ?{" "}
                  <Link to="#" className="fw-medium text-primary">
                    {" "}
                    Resend{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Mercantec. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default EmailVerification

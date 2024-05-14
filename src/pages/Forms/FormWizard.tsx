import React, { useState } from "react"

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap"

import classnames from "classnames";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

const FormWizard = () => {

  //meta title
  document.title = "Form Wizard | Skote - React Admin & Dashboard Template";

  const [activeTab, setactiveTab] = useState<number>(1)
  const [activeTabVartical, setoggleTabVertical] = useState<number>(1)

  const [passedSteps, setPassedSteps] = useState([1])
  const [passedStepsVertical, setPassedStepsVertical] = useState([1])

  function toggleTab(tab: any) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab]
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab)
        setPassedSteps(modifiedSteps)
      }
    }
  }

  function toggleTabVertical(tab: any) {
    if (activeTabVartical !== tab) {
      var modifiedSteps = [...passedStepsVertical, tab]

      if (tab >= 1 && tab <= 4) {
        setoggleTabVertical(tab)
        setPassedStepsVertical(modifiedSteps)
      }
    }
  }

  // Wizard form
  const wizardformik : any= useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phoneno: "",
      email: "",
      address: "",
      //tab 2 
      panNo: "",
      vatNo: "",
      cstNo: "",
      taxNo: "",
      uin: "",
      declaration: "",
      //tab 3
      card: "",
      creditcard: "",
      creditno: "",
      cardvarification: "",
      expiratdata: ""
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("This field is required"),
      lastname: Yup.string().required("This field is required"),
      email: Yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Your Email"),
      phoneno: Yup.string().matches(/^[0-9]{10}$/).required("Please Enter Your Phone No"),
      address: Yup.string().required("This field is required"),
      //tab 2
      panNo: Yup.string().required("This field is required"),
      vatNo: Yup.string().required("This field is required"),
      cstNo: Yup.string().required("This field is required"),
      taxNo: Yup.string().required("This field is required"),
      uin: Yup.string().required("This field is required"),
      declaration: Yup.string().required("This field is required"),
      //tab 3
      card: Yup.string().required("This field is required"),
      creditcard: Yup.string().required("This field is required"),
      creditno: Yup.string().required("This field is required"),
      cardvarification: Yup.string().required("This field is required"),
      expiratdata: Yup.string().required("This field is required"),
    }),

    onSubmit: (values : any) => {
      // console.log("value", values.password);
    },
  });

  // Vertical Wizard form
  const verticalformik: any = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phoneno: "",
      email: "",
      address: "",
      //tab 2 
      panNo: "",
      vatNo: "",
      cstNo: "",
      taxNo: "",
      uin: "",
      declaration: "",
      //tab 3
      card: "",
      creditcard: "",
      creditno: "",
      cardvarification: "",
      expiratdata: ""
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("This field is required"),
      lastname: Yup.string().required("This field is required"),
      email: Yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Your Email"),
      phoneno: Yup.string().matches(/^[0-9]{10}$/).required("Please Enter Your Phone No"),
      address: Yup.string().required("This field is required"),
      //tab 2
      panNo: Yup.string().required("This field is required"),
      vatNo: Yup.string().required("This field is required"),
      cstNo: Yup.string().required("This field is required"),
      taxNo: Yup.string().required("This field is required"),
      uin: Yup.string().required("This field is required"),
      declaration: Yup.string().required("This field is required"),
      //tab 3
      card: Yup.string().required("This field is required"),
      creditcard: Yup.string().required("This field is required"),
      creditno: Yup.string().required("This field is required"),
      cardvarification: Yup.string().required("This field is required"),
      expiratdata: Yup.string().required("This field is required"),
    }),

    onSubmit: (values : any) => {
      // console.log("value", values.password);
    },
  });
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Form Wizard" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Basic Wizard</h4>
                  <div className="wizard clearfix">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem
                          className={classnames({ current: activeTab === 1 })}
                        >
                          <NavLink
                            className={classnames({ current: activeTab === 1 })}
                            onClick={() => {
                              setactiveTab(1)
                            }}
                            disabled={!(passedSteps || []).includes(1)}
                          >
                            <span className="number">1.</span> Seller Details
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 2 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => {
                              setactiveTab(2)
                            }}
                            disabled={!(passedSteps || []).includes(2)}
                          >
                            <span className="number">2.</span> Company
                            Document
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 3 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 3 })}
                            onClick={() => {
                              setactiveTab(3)
                            }}
                            disabled={!(passedSteps || []).includes(3)}
                          >
                            <span className="number">3.</span> Bank Details
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 4 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 4 })}
                            onClick={() => {
                              setactiveTab(4)
                            }}
                            disabled={!(passedSteps || []).includes(4)}
                          >
                            <span className="number">4.</span> Confirm Detail
                          </NavLink>
                        </NavItem>
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <TabContent activeTab={activeTab} className="body">
                        <TabPane tabId={1}>
                          <Form onSubmit={wizardformik.handleSubmit}>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    First name
                                  </Label>
                                  <Input
                                    type="text"
                                    name="fristname"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    placeholder="Enter Your First Name"
                                    value={wizardformik.values.firstname}
                                    onChange={wizardformik.handleChange}
                                    onBlur={wizardformik.handleBlur}
                                  />
                                  {
                                    wizardformik.errors.firstname && wizardformik.touched.firstname ? (
                                      <span className="text-danger">{wizardformik.errors.firstname}</span>
                                    ) : null
                                  }
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-lastname-input2">
                                    Last name
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    name="lastname"
                                    id="basicpill-lastname-input2"
                                    placeholder="Enter Your Last Name"
                                    value={wizardformik.values.lastname}
                                    onChange={wizardformik.handleChange}
                                    onBlur={wizardformik.handleBlur}
                                  />
                                  {
                                    wizardformik.errors.lastname && wizardformik.touched.lastname ? (
                                      <span className="text-danger">{wizardformik.errors.lastname}</span>
                                    ) : null
                                  }
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-phoneno-input3">
                                    Phone
                                  </Label>
                                  <Input
                                    type="text"
                                    name="phoneno"
                                    className="form-control"
                                    id="basicpill-phoneno-input3"
                                    placeholder="Enter Your Phone No."
                                    value={wizardformik.values.phoneno}
                                    onChange={wizardformik.handleChange}
                                    onBlur={wizardformik.handleBlur}
                                  />
                                  {
                                    wizardformik.errors.phoneno && wizardformik.touched.phoneno ? (
                                      <span className="text-danger">{wizardformik.errors.phoneno}</span>
                                    ) : null
                                  }
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-email-input4">
                                    Email
                                  </Label>
                                  <Input
                                    type="email"
                                    className="form-control"
                                    id="basicpill-email-input4"
                                    name="email"
                                    placeholder="Enter Your Email ID"
                                    value={wizardformik.values.email}
                                    onChange={wizardformik.handleChange}
                                    onBlur={wizardformik.handleBlur}
                                  />
                                  {
                                    wizardformik.errors.email && wizardformik.touched.email ? (
                                      <span className="text-danger">{wizardformik.errors.email}</span>
                                    ) : null
                                  }
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="12">
                                <div className="mb-3">
                                  <Label for="basicpill-address-input1">
                                    Address
                                  </Label>
                                  <textarea
                                    id="basicpill-address-input1"
                                    className="form-control"
                                    name="address"
                                    rows={2}
                                    placeholder="Enter Your Address"
                                    value={wizardformik.values.address}
                                    onChange={wizardformik.handleChange}
                                    onBlur={wizardformik.handleBlur}
                                  />
                                  {
                                    wizardformik.errors.address && wizardformik.touched.address ? (
                                      <span className="text-danger">{wizardformik.errors.address}</span>
                                    ) : null
                                  }
                                </div>
                              </Col>
                            </Row>
                          </Form>
                        </TabPane>
                        <TabPane tabId={2}>
                          <div>
                            <Form>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-pancard-input5">
                                      PAN Card
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-pancard-input5"
                                      name="panNo"
                                      placeholder="Enter Your PAN No."
                                      value={wizardformik.values.panNo}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    />
                                    {
                                      wizardformik.errors.panNo && wizardformik.touched.panNo ? (
                                        <span className="text-danger">{wizardformik.errors.panNo}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>

                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-vatno-input6">
                                      VAT/TIN No.
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-vatno-input6"
                                      name="vatNo"
                                      placeholder="Enter Your VAT/TIN No."
                                      value={wizardformik.values.vatNo}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    />
                                    {
                                      wizardformik.errors.vatNo && wizardformik.touched.vatNo ? (
                                        <span className="text-danger">{wizardformik.errors.vatNo}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-cstno-input7">
                                      CST No.
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-cstno-input7"
                                      name="cstNo"
                                      placeholder="Enter Your CST No."
                                      value={wizardformik.values.cstNo}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    />
                                    {
                                      wizardformik.errors.cstNo && wizardformik.touched.cstNo ? (
                                        <span className="text-danger">{wizardformik.errors.cstNo}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>

                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-servicetax-input8">
                                      Service Tax No.
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-servicetax-input8"
                                      placeholder="Enter Your Service Tax No."
                                      name="taxNo"
                                      value={wizardformik.values.taxNo}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    />
                                    {
                                      wizardformik.errors.taxNo && wizardformik.touched.taxNo ? (
                                        <span className="text-danger">{wizardformik.errors.taxNo}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-companyuin-input9">
                                      Company UIN
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-companyuin-input9"
                                      name="uin"
                                      placeholder="Enter Your Company UIN"
                                      value={wizardformik.values.uin}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    />
                                    {
                                      wizardformik.errors.uin && wizardformik.touched.uin ? (
                                        <span className="text-danger">{wizardformik.errors.uin}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>

                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-declaration-input10">
                                      Declaration
                                    </Label>
                                    <Input
                                      type="text"
                                      name="declaration"
                                      className="form-control"
                                      id="basicpill-Declaration-input10"
                                      placeholder="Declaration Details"
                                      value={wizardformik.values.declaration}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    />
                                    {
                                      wizardformik.errors.declaration && wizardformik.touched.declaration ? (
                                        <span className="text-danger">{wizardformik.errors.declaration}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </TabPane>
                        <TabPane tabId={3}>
                          <div>
                            <Form>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-namecard-input11">
                                      Name on Card
                                    </Label>
                                    <Input
                                      type="text"
                                      name="card"
                                      className="form-control"
                                      id="basicpill-namecard-input11"
                                      placeholder="Enter Your Name on Card"
                                      value={wizardformik.values.card}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    />
                                    {
                                      wizardformik.errors.card && wizardformik.touched.card ? (
                                        <span className="text-danger">{wizardformik.errors.card}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>

                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label>Credit Card Type</Label>
                                    <select className="form-select"
                                      name="creditcard"
                                      value={wizardformik.values.creditcard}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}>
                                      <option>
                                        Select Card Type
                                      </option>
                                      <option value="AE">
                                        American Express
                                      </option>
                                      <option value="VI">Visa</option>
                                      <option value="MC">MasterCard</option>
                                      <option value="DI">Discover</option>
                                    </select>
                                    {
                                      wizardformik.errors.creditcard && wizardformik.touched.creditcard ? (
                                        <span className="text-danger">{wizardformik.errors.creditcard}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-cardno-input12">
                                      Credit Card Number
                                    </Label>
                                    <Input
                                      type="text"
                                      name="creditno"
                                      className="form-control"
                                      id="basicpill-cardno-input12"
                                      placeholder="Credit Card Number"
                                      value={wizardformik.values.creditno}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    />
                                    {
                                      wizardformik.errors.creditno && wizardformik.touched.creditno ? (
                                        <span className="text-danger">{wizardformik.errors.creditno}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>

                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-card-verification-input0">
                                      Card Verification Number
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      name="cardvarification"
                                      id="basicpill-card-verification-input0"
                                      placeholder="Credit Verification Number"
                                      value={wizardformik.values.cardvarification}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    />
                                    {
                                      wizardformik.errors.cardvarification && wizardformik.touched.cardvarification ? (
                                        <span className="text-danger">{wizardformik.errors.cardvarification}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-expiration-input13">
                                      Expiration Date
                                    </Label>
                                    <Input
                                      type="text"
                                      name="expiratdata"
                                      className="form-control"
                                      id="basicpill-expiration-input13"
                                      placeholder="Card Expiration Date"
                                      value={wizardformik.values.expiratdata}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    />
                                    {
                                      wizardformik.errors.expiratdata && wizardformik.touched.expiratdata ? (
                                        <span className="text-danger">{wizardformik.errors.expiratdata}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </TabPane>
                        <TabPane tabId={4}>
                          <div className="row justify-content-center">
                            <Col lg="6">
                              <div className="text-center">
                                <div className="mb-4">
                                  <i className="mdi mdi-check-circle-outline text-success display-4" />
                                </div>
                                <div>
                                  <h5>Confirm Detail</h5>
                                  <p className="text-muted">
                                    If several languages coalesce, the grammar
                                    of the resulting
                                  </p>
                                </div>
                              </div>
                            </Col>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                    <div className="actions clearfix">
                      <ul>
                        <li
                          className={
                            activeTab === 1 ? "previous disabled" : "previous"
                          }
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTab(activeTab - 1)
                            }}
                          >
                            Previous
                          </Link>
                        </li>
                        <li
                          className={activeTab === 4 ? "next disabled" : "next"}
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTab(activeTab + 1)
                            }}
                          >
                            Next
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Vertical Wizard</h4>
                  <div className="vertical-wizard wizard clearfix vertical">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem
                          className={classnames({
                            current: activeTabVartical === 1,
                          })}
                        >
                          <NavLink
                            className={classnames({
                              active: activeTabVartical === 1,
                            })}
                            onClick={() => {
                              toggleTabVertical(1)
                            }}
                            disabled={!(passedStepsVertical || []).includes(1)}
                          >
                            <span className="number">1.</span> Seller Details
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({
                            current: activeTabVartical === 2,
                          })}
                        >
                          <NavLink
                            className={classnames({
                              active: activeTabVartical === 2,
                            })}
                            onClick={() => {
                              toggleTabVertical(2)
                            }}
                            disabled={!(passedStepsVertical || []).includes(2)}
                          >
                            <span className="number">2.</span>{" "}
                            <span>Company Document</span>
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({
                            current: activeTabVartical === 3,
                          })}
                        >
                          <NavLink
                            className={
                              (classnames({
                                active: activeTabVartical === 3,
                              }),
                                "done")
                            }
                            onClick={() => {
                              toggleTabVertical(3)
                            }}
                            disabled={!(passedStepsVertical || []).includes(3)}
                          >
                            <span className="number">3.</span> Bank Details
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({
                            current: activeTabVartical === 4,
                          })}
                        >
                          <NavLink
                            className={
                              (classnames({
                                active: activeTabVartical === 4,
                              }),
                                "done")
                            }
                            onClick={() => {
                              toggleTabVertical(4)
                            }}
                            disabled={!(passedStepsVertical || []).includes(4)}
                          >
                            <span className="number">4.</span> Confirm Detail
                          </NavLink>
                        </NavItem>
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <TabContent
                        activeTab={activeTabVartical}
                        className="body"
                      >
                        <TabPane tabId={1}>
                          <Form onSubmit={verticalformik.handleSubmit}>
                            <Row>
                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-firstname-input12">
                                    First name
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    name="firstname"
                                    id="basicpill-firstname-input12"
                                    placeholder="Enter Your First Name"
                                    value={verticalformik.values.firstname}
                                    onChange={verticalformik.handleChange}
                                    onBlur={verticalformik.handleBlur}
                                  />
                                  {
                                    verticalformik.errors.firstname && verticalformik.touched.firstname ? (
                                      <span className="text-danger">{verticalformik.errors.firstname}</span>
                                    ) : null
                                  }
                                </FormGroup>
                              </Col>
                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-lastname-input22">
                                    Last name
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    name="lastname"
                                    id="basicpill-lastname-input22"
                                    placeholder="Enter Your Last Name"
                                    value={verticalformik.values.lastname}
                                    onChange={verticalformik.handleChange}
                                    onBlur={verticalformik.handleBlur}
                                  />
                                  {
                                    verticalformik.errors.lastname && verticalformik.touched.lastname ? (
                                      <span className="text-danger">{verticalformik.errors.lastname}</span>
                                    ) : null
                                  }
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-phoneno-input32">
                                    Phone
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    name="phoneno"
                                    id="basicpill-phoneno-input32"
                                    placeholder="Enter Your Phone No."
                                    value={verticalformik.values.phoneno}
                                    onChange={verticalformik.handleChange}
                                    onBlur={verticalformik.handleBlur}
                                  />
                                  {
                                    verticalformik.errors.phoneno && verticalformik.touched.phoneno ? (
                                      <span className="text-danger">{verticalformik.errors.phoneno}</span>
                                    ) : null
                                  }
                                </FormGroup>
                              </Col>
                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-email-input42">
                                    Email
                                  </Label>
                                  <Input
                                    type="email"
                                    className="form-control"
                                    id="basicpill-email-input42"
                                    placeholder="Enter Your Email ID"
                                    name="email"
                                    value={verticalformik.values.email}
                                    onChange={verticalformik.handleChange}
                                    onBlur={verticalformik.handleBlur}
                                  />
                                  {
                                    verticalformik.errors.email && verticalformik.touched.email ? (
                                      <span className="text-danger">{verticalformik.errors.email}</span>
                                    ) : null
                                  }
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="12">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-address-input12">
                                    Address
                                  </Label>
                                  <textarea
                                    id="basicpill-address-input12"
                                    className="form-control"
                                    rows={2}
                                    name="address"
                                    placeholder="Enter Your Address"
                                    value={verticalformik.values.address}
                                    onChange={verticalformik.handleChange}
                                    onBlur={verticalformik.handleBlur}
                                  />
                                  {
                                    verticalformik.errors.address && verticalformik.touched.address ? (
                                      <span className="text-danger">{verticalformik.errors.address}</span>
                                    ) : null
                                  }
                                </FormGroup>
                              </Col>
                            </Row>
                          </Form>
                        </TabPane>
                        <TabPane tabId={2}>
                          <div>
                            <Form>
                              <Row>
                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-pancard-input52">
                                      PAN Card
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      name="panNo"
                                      id="basicpill-pancard-input52"
                                      placeholder="Enter Your PAN Card No."
                                      value={verticalformik.values.panNo}
                                      onChange={verticalformik.handleChange}
                                      onBlur={verticalformik.handleBlur}
                                    />
                                    {
                                      verticalformik.errors.panNo && verticalformik.touched.panNo ? (
                                        <span className="text-danger">{verticalformik.errors.panNo}</span>
                                      ) : null
                                    }
                                  </FormGroup>
                                </Col>

                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-vatno-input62">
                                      VAT/TIN No.
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      name="vatNo"
                                      id="basicpill-vatno-input62"
                                      placeholder="Enter Your VAT/TIN No."
                                      value={verticalformik.values.vatNo}
                                      onChange={verticalformik.handleChange}
                                      onBlur={verticalformik.handleBlur}
                                    />
                                    {
                                      verticalformik.errors.vatNo && verticalformik.touched.vatNo ? (
                                        <span className="text-danger">{verticalformik.errors.vatNo}</span>
                                      ) : null
                                    }
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-cstno-input72">
                                      CST No.
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-cstno-input72"
                                      name="cstNo"
                                      placeholder="Enter Your CST No."
                                      value={verticalformik.values.cstNo}
                                      onChange={verticalformik.handleChange}
                                      onBlur={verticalformik.handleBlur}
                                    />
                                    {
                                      verticalformik.errors.cstNo && verticalformik.touched.cstNo ? (
                                        <span className="text-danger">{verticalformik.errors.cstNo}</span>
                                      ) : null
                                    }
                                  </FormGroup>
                                </Col>

                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-servicetax-input82">
                                      Service Tax No.
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-servicetax-input82"
                                      name="taxNo"
                                      placeholder="Enter Your Service Tax No."
                                      value={verticalformik.values.taxNo}
                                      onChange={verticalformik.handleChange}
                                      onBlur={verticalformik.handleBlur}
                                    />
                                    {
                                      verticalformik.errors.taxNo && verticalformik.touched.taxNo ? (
                                        <span className="text-danger">{verticalformik.errors.taxNo}</span>
                                      ) : null
                                    }
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-companyuin-input92">
                                      Company UIN
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      name="uin"
                                      id="basicpill-companyuin-input92"
                                      placeholder="Company UIN No."
                                      value={verticalformik.values.uin}
                                      onChange={verticalformik.handleChange}
                                      onBlur={verticalformik.handleBlur}
                                    />
                                    {
                                      verticalformik.errors.uin && verticalformik.touched.uin ? (
                                        <span className="text-danger">{verticalformik.errors.uin}</span>
                                      ) : null
                                    }
                                  </FormGroup>
                                </Col>

                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-declaration-input102">
                                      Declaration
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-Declaration-input102"
                                      name="declaration"
                                      placeholder="Declaration Details"
                                      value={verticalformik.values.declaration}
                                      onChange={verticalformik.handleChange}
                                      onBlur={verticalformik.handleBlur}
                                    />
                                    {
                                      verticalformik.errors.declaration && verticalformik.touched.declaration ? (
                                        <span className="text-danger">{verticalformik.errors.declaration}</span>
                                      ) : null
                                    }
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </TabPane>
                        <TabPane tabId={3}>
                          <div>
                            <Form>
                              <Row>
                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-namecard-input112">
                                      Name on Card
                                    </Label>
                                    <Input
                                      type="text"
                                      name="card"
                                      className="form-control"
                                      id="basicpill-namecard-input112"
                                      placeholder="Enter Your Name on Card"
                                      value={verticalformik.values.card}
                                      onChange={verticalformik.handleChange}
                                      onBlur={verticalformik.handleBlur}
                                    />
                                    {
                                      verticalformik.errors.card && verticalformik.touched.card ? (
                                        <span className="text-danger">{verticalformik.errors.card}</span>
                                      ) : null
                                    }
                                  </FormGroup>
                                </Col>

                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label>Credit Card Type</Label>
                                    <select className="form-select"
                                      name="creditcard"
                                      value={verticalformik.values.creditcard}
                                      onChange={verticalformik.handleChange}
                                      onBlur={verticalformik.handleBlur}
                                    >
                                      <option>Select Card Type</option>
                                      <option>American Express</option>
                                      <option>Visa</option>
                                      <option>MasterCard</option>
                                      <option>Discover</option>
                                    </select>
                                    {
                                      verticalformik.errors.creditcard && verticalformik.touched.creditcard ? (
                                        <span className="text-danger">{verticalformik.errors.creditcard}</span>
                                      ) : null
                                    }
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-cardno-input122">
                                      Credit Card Number
                                    </Label>
                                    <Input
                                      type="text"
                                      name="creditno"
                                      className="form-control"
                                      id="basicpill-cardno-input122"
                                      placeholder="Enter Your Card Number"
                                      value={verticalformik.values.creditno}
                                      onChange={verticalformik.handleChange}
                                      onBlur={verticalformik.handleBlur}
                                    />
                                    {
                                      verticalformik.errors.creditno && verticalformik.touched.creditno ? (
                                        <span className="text-danger">{verticalformik.errors.creditno}</span>
                                      ) : null
                                    }
                                  </FormGroup>
                                </Col>

                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-card-verification-input">
                                      Card Verification Number
                                    </Label>
                                    <Input
                                      type="text"
                                      name="cardvarification"
                                      className="form-control"
                                      id="basicpill-card-verification-input"
                                      placeholder="Card Verification Number"
                                      value={verticalformik.values.cardvarification}
                                      onChange={verticalformik.handleChange}
                                      onBlur={verticalformik.handleBlur}
                                    />
                                    {
                                      verticalformik.errors.cardvarification && verticalformik.touched.cardvarification ? (
                                        <span className="text-danger">{verticalformik.errors.cardvarification}</span>
                                      ) : null
                                    }
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-expiration-input132">
                                      Expiration Date
                                    </Label>
                                    <Input
                                      type="text"
                                      name="expiratdata"
                                      className="form-control"
                                      id="basicpill-expiration-input132"
                                      placeholder="Card Expiration Date"
                                      value={verticalformik.values.expiratdata}
                                      onChange={verticalformik.handleChange}
                                      onBlur={verticalformik.handleBlur}
                                    />
                                    {
                                      verticalformik.errors.expiratdata && verticalformik.touched.expiratdata ? (
                                        <span className="text-danger">{verticalformik.errors.expiratdata}</span>
                                      ) : null
                                    }
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </TabPane>
                        <TabPane tabId={4}>
                          <div className="row justify-content-center">
                            <Col lg="6">
                              <div className="text-center">
                                <div className="mb-4">
                                  <i className="mdi mdi-check-circle-outline text-success display-4" />
                                </div>
                                <div>
                                  <h5>Confirm Detail</h5>
                                  <p className="text-muted">
                                    If several languages coalesce, the grammar
                                    of the resulting
                                  </p>
                                </div>
                              </div>
                            </Col>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                    <div className="actions clearfix">
                      <ul>
                        <li
                          className={
                            activeTabVartical === 1
                              ? "previous disabled"
                              : "previous"
                          }
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTabVertical(activeTabVartical - 1)
                            }}
                          >
                            Previous
                          </Link>
                        </li>
                        <li
                          className={
                            activeTabVartical === 4 ? "next disabled" : "next"
                          }
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTabVertical(activeTabVartical + 1)
                            }}
                          >
                            Next
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default FormWizard

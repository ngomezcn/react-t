import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  TabContent,
  TabPane,
  NavItem,
  NavLink,
  Label,
  Button,
  Input,
  Form,
  FormGroup,
  FormFeedback
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from "yup";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { PatternFormat } from 'react-number-format';
//Dropzone
import Dropzone from "react-dropzone";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

//Import images
import verificationImg from "../../assets/images/verification-img.png";
import moment from "moment";

const CryptoKYCApplication = () => {

  //meta title
  document.title = "KYC Application | Skote - React Admin & Dashboard Template";

  const [modal, setModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [selectedFiles, setSelectedFiles] = useState<any>([]);

  const togglemodal = () => {
    setModal(!modal);
  };

  const [passedSteps, setPassedSteps] = useState([1]);

  const toggleTab = (tab: any) => {
    if (activeTab !== tab) {
      const modifiedSteps = [...passedSteps];
      modifiedSteps.push(tab);
      setActiveTab(tab);
      setPassedSteps(modifiedSteps);
    }
  };

  const handleAcceptedFiles = (files: any) => {
    const newImg = files.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setSelectedFiles([...selectedFiles, ...newImg]);
  };

  const formik: any = useFormik({
    initialValues: {
      kycfirstName: '',
      kyclastLname: '',
      kycPhoneno: '',
      kycbirthDate: '',
      kycSelectcity: ''
    },
    validationSchema: yup.object().shape({
      kycfirstName: yup.string().required('Please Enter Your Kycfirst Name'),
      kyclastLname: yup.string().required('Please Enter Your Kycfirst Lname'),
      kycPhoneno: yup.string().required('Please Enter Your Kyc Phoneno'),
      kycbirthDate: yup.string().required('Please Enter Your Kycbirth Date'),
      kycSelectcity: yup.string().required('Please Enter Your Kyc Selectcity')
    }),
    onSubmit: (values: any) => {
      // console.log("values", values);
    },
  });

  //confirm-email
  const confirmEmail: any = useFormik({
    initialValues: {
      pancard: '',
      vatno: '',
      cstno: '',
      servicetax: '',
      companyuin: '',
      declaration: ''
    },
    validationSchema: yup.object().shape({
      pancard: yup.number().required('Please Enter Your Pancard No'),
      vatno: yup.number().required('Please Enter Your Vat No'),
      cstno: yup.number().required('Please Enter Your Cst No'),
      servicetax: yup.number().required('Please Enter Your Tax'),
      companyuin: yup.number().required('Please Enter Your Company UIN'),
      declaration: yup.string().required('Please Enter Your Declaration')
    }),
    onSubmit: (values: any) => {
      // console.log("values", values);
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Crypto" breadcrumbItem="KYC Application" />
          <Row className="justify-content-center mt-lg-5">
            <Col xl={5} sm={8}>
              <Card>
                <CardBody>
                  <div className="text-center">
                    <Row className="justify-content-center">
                      <Col lg={10}>
                        <h4 className="mt-4 fw-semibold">KYC Verification </h4>
                        <p className="text-muted mt-3">Itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis perferendis asperiores repellat. </p>
                        <div className="mt-4">
                          <Button type="button" color="primary" onClick={togglemodal} >Click here for Verification  </Button>
                        </div>
                      </Col>
                    </Row>
                    <Row className="justify-content-center mt-5 mb-2">
                      <Col sm={6} xs={8}>
                        <div>
                          <img src={verificationImg} alt="" className="img-fluid" />
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* modal */}
                  <Modal isOpen={modal} role="dialog" size="lg" autoFocus={true} centered id="verificationModal" toggle={togglemodal}>
                    <ModalHeader toggle={togglemodal}>Verify your Account </ModalHeader>
                    <ModalBody>
                      <div id="kyc-verify-wizard" className="wizard clearfix">
                        <div className="steps clearfix">
                          <ul>
                            <NavItem
                              className={classnames({
                                current: activeTab === 1,
                              })}>
                              <NavLink
                                className={classnames({
                                  active: activeTab === 1,
                                })}
                                onClick={() => {
                                  toggleTab(1);
                                }}
                                disabled={!passedSteps.includes(1)}>
                                <span className="number">1.</span>
                                Personal Info
                              </NavLink>
                            </NavItem>
                            <NavItem
                              className={classnames({
                                current: activeTab === 2,
                              })} >
                              <NavLink
                                className={classnames({
                                  active: activeTab === 2,
                                })}
                                onClick={() => {
                                  toggleTab(2);
                                }} disabled={!passedSteps.includes(2)} >
                                <span className="number">2.</span>
                                Confirm email
                              </NavLink>
                            </NavItem>
                            <NavItem
                              className={classnames({
                                current: activeTab === 3,
                              })}>
                              <NavLink
                                className={classnames({
                                  active: activeTab === 3,
                                })}
                                onClick={() => {
                                  toggleTab(3);
                                }}
                                disabled={!passedSteps.includes(3)}
                              >
                                <span className="number">3.</span>
                                Document Verification
                              </NavLink>
                            </NavItem>
                          </ul>
                        </div>
                        <div className="content clearfix">
                          <TabContent activeTab={activeTab} className="twitter-bs-wizard-tab-content">
                            <TabPane tabId={1} id="personal-info" className="body current">
                              <Form onSubmit={formik.handleSubmit} autoComplete="off">
                                <Row>
                                  <Col lg={6}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="kycfirstname-input"> First name </Label>
                                      <Input
                                        type="text"
                                        id="kycfirstname-input"
                                        placeholder="Enter First name"
                                        name="kycfirstName"
                                        value={formik.values.kycfirstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        invalid={
                                          formik.touched.kycfirstName && formik.errors.kycfirstName ? true : false
                                        }
                                      />
                                      {formik.touched.kycfirstName && formik.errors.kycfirstName ? (
                                        <FormFeedback type="invalid">{formik.errors.kycfirstName}</FormFeedback>
                                      ) : null}
                                    </FormGroup>
                                  </Col>
                                  <Col lg={6}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="kyclastname-input" >Last name</Label>
                                      <Input
                                        type="text"
                                        id="kyclastname-input"
                                        placeholder="Enter Last name"
                                        name="kyclastLname"
                                        value={formik.values.kyclastLname}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        invalid={
                                          formik.touched.kyclastLname && formik.errors.kyclastLname ? true : false
                                        }
                                      />
                                      {formik.touched.kyclastLname && formik.errors.kyclastLname ? (
                                        <FormFeedback type="invalid">{formik.errors.kyclastLname}</FormFeedback>
                                      ) : null}
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg={6}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="kycphoneno-input" >Phone </Label>
                                      <PatternFormat
                                        className="form-control"
                                        name="kycPhoneno"
                                        id="kycphoneno-input"
                                        value={formik.values.kycPhoneno}
                                        format="(###) ####-####"
                                        onChange={formik.handleChange}
                                        placeholder="Enter Phone number"
                                        onBlur={formik.handleBlur}
                                      />
                                      {formik.touched.kycPhoneno && formik.errors.kycPhoneno ? (
                                        <span className="text-danger">{formik.errors.kycPhoneno}</span>
                                      ) : null}
                                    </FormGroup>
                                  </Col>
                                  <Col lg={6}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="kycbirthdate-input" > Date of birth </Label>
                                      <Flatpickr
                                        className="form-control d-block"
                                        id="orderdate"
                                        name="kycbirthDate"
                                        placeholder="Select date"
                                        options={{
                                          mode: "single",
                                          dateFormat: 'd M, Y',
                                        }}
                                        onChange={(kycbirthDate: any) => formik.setFieldValue("kycbirthDate", moment(kycbirthDate[0]).format("DD MMMM ,YYYY"))}
                                        value={formik.values.kycbirthDate || ''}
                                      />
                                      {formik.touched.kycbirthDate && formik.errors.kycbirthDate ? (
                                        <span className="text-danger">{formik.errors.kycbirthDate}</span>
                                      ) : null}
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg={12}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="kycselectcity-input"> City </Label>
                                      <select
                                        className="form-control"
                                        name="kycSelectcity"
                                        id="kycselectcity-input"
                                        value={formik.values.kycSelectcity}
                                        onChange={formik.handleChange}
                                      >
                                        <option value="san">San Francisco</option>
                                        <option value="Los">Los Angeles</option>
                                        <option value="san">San Diego</option>
                                      </select>
                                      {formik.errors.kycSelectcity && formik.touched.kycSelectcity ? (
                                        <span className="text-danger">{formik.errors.kycSelectcity}</span>
                                      ) : null}
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Form>
                            </TabPane>
                            <TabPane tabId={2} id="confirm-email">
                              <div>
                                <Form onSubmit={confirmEmail.handleSubmit} autoComplete="off">
                                  <Row>
                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Label htmlFor="basicpill-pancard-input">PAN Card</Label>
                                        <Input
                                          type="number"
                                          id="basicpill-pancard-input"
                                          placeholder="PAN Card No."
                                          name="pancard"
                                          value={formik.values.pancard}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          invalid={
                                            formik.touched.pancard && formik.errors.pancard ? true : false
                                          }
                                        />
                                        {formik.touched.pancard && formik.errors.pancard ? (
                                          <FormFeedback type="invalid">{formik.errors.pancard}</FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>

                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Label htmlFor="basicpill-vatno-input">VAT/TIN No.</Label>
                                        <Input
                                          type="number"
                                          id="basicpill-vatno-input"
                                          namne="vatno"
                                          placeholder="VAT/TIN No"
                                          value={formik.values.vatno}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          invalid={
                                            formik.touched.vatno && formik.errors.vatno ? true : false
                                          }
                                        />
                                        {formik.touched.vatno && formik.errors.vatno ? (
                                          <FormFeedback type="invalid">{formik.errors.vatno}</FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Label htmlFor="basicpill-cstno-input">CST No.</Label>
                                        <Input
                                          type="number"
                                          id="basicpill-cstno-input"
                                          placeholder="CST No."
                                          name="cstno"
                                          value={formik.values.cstno}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          invalid={
                                            formik.touched.cstno && formik.errors.cstno ? true : false
                                          }
                                        />
                                        {formik.touched.cstno && formik.errors.cstno ? (
                                          <FormFeedback type="invalid">{formik.errors.cstno}</FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>

                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Label htmlFor="basicpill-servicetax-input">Service Tax No.</Label>
                                        <Input
                                          type="number"
                                          id="basicpill-servicetax-input"
                                          placeholder="Service Tax No."
                                          name="servicetax"
                                          value={formik.values.servicetax}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          invalid={
                                            formik.touched.servicetax && formik.errors.servicetax ? true : false
                                          }
                                        />
                                        {formik.touched.servicetax && formik.errors.servicetax ? (
                                          <FormFeedback type="invalid">{formik.errors.servicetax}</FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Label htmlFor="basicpill-companyuin-input">Company UIN</Label>
                                        <Input
                                          type="number"
                                          id="basicpill-companyuin-input"
                                          placeholder="Company UIN"
                                          name="companyuin"
                                          value={formik.values.companyuin}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          invalid={
                                            formik.touched.companyuin && formik.errors.companyuin ? true : false
                                          }
                                        />
                                        {formik.touched.companyuin && formik.errors.companyuin ? (
                                          <FormFeedback type="invalid">{formik.errors.companyuin}</FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>

                                    <Col lg={6}>
                                      <div className="mb-3">
                                        <Label htmlFor="basicpill-declaration-input">Declaration</Label>
                                        <Input
                                          type="text"
                                          id="basicpill-Declaration-input"
                                          placeholder="Declaration"
                                          name="declaration"
                                          value={formik.values.declaration}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          invalid={
                                            formik.touched.declaration && formik.errors.declaration ? true : false
                                          }
                                        />
                                        {formik.touched.declaration && formik.errors.declaration ? (
                                          <FormFeedback type="invalid">{formik.errors.declaration}</FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                  </Row>
                                </Form>
                              </div>
                            </TabPane>
                            <TabPane tabId={3} id="doc-verification">
                              <h5 className="font-size-14 mb-3">
                                Upload document file for a verification
                              </h5>
                              <div className="kyc-doc-verification mb-3">
                                <Dropzone
                                  onDrop={(acceptedFiles: any) =>
                                    handleAcceptedFiles(acceptedFiles)
                                  }
                                >
                                  {({ getRootProps, getInputProps }: any) => (
                                    <div className="dropzone">
                                      <div
                                        className="dz-message needsclick"
                                        {...getRootProps()}
                                      >
                                        <Input {...getInputProps()} />
                                        <div className="mb-3">
                                          <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                                        </div>
                                        <h4>
                                          Drop files here or click to upload.
                                        </h4>
                                      </div>
                                    </div>
                                  )}
                                </Dropzone>
                                <ul className="list-unstyled mb-0" id="file-previews">
                                  {selectedFiles.map((file: any, index: any) => {
                                    return (
                                      <li className="mt-2 dz-image-preview" key=''>
                                        <div className="border rounded">
                                          <div className="d-flex flex-wrap gap-2 p-2">
                                            <div className="flex-shrink-0 me-3">
                                              <div className="avatar-sm bg-light rounded p-2">
                                                <img data-dz-thumbnail="" className="img-fluid rounded d-block" src={file.preview} alt={file.name} />
                                              </div>
                                            </div>
                                            <div className="flex-grow-1">
                                              <div className="pt-1">
                                                <h5 className="fs-md mb-1" data-dz-name>{file.path}</h5>
                                                <strong className="error text-danger" data-dz-errormessage></strong>
                                              </div>
                                            </div>
                                            <div className="flex-shrink-0 ms-3">
                                              <Button color="danger" size="sm"
                                                onClick={() => {
                                                  const newImages = [...selectedFiles];
                                                  newImages.splice(index, 1);
                                                  setSelectedFiles(newImages);
                                                }}>
                                                Delete</Button>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    )
                                  })}
                                </ul>
                              </div>
                            </TabPane>
                          </TabContent>
                        </div>
                        <div className="actions clearfix">
                          <ul role="menu" aria-label="Pagination">
                            <li
                              className={
                                activeTab === 1
                                  ? "previous disabled"
                                  : "previous"
                              }
                            >
                              <Link
                                to="#"
                                onClick={() => {
                                  toggleTab(activeTab - 1);
                                }}
                              >
                                Previous
                              </Link>
                            </li>
                            <li
                              className={
                                activeTab === 3 ? "next disabled" : "next"
                              }
                            >
                              <Link
                                to="#"
                                onClick={() => {
                                  toggleTab(activeTab + 1);
                                }}
                              >
                                Next
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CryptoKYCApplication;

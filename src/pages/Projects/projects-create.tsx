import React, { useState, useMemo, useCallback, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Button, Card, CardBody, Col, Container, Form, ModalHeader, ModalBody, Input, Label, Row, FormFeedback, UncontrolledTooltip, Modal } from "reactstrap";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import * as Yup from "yup";
import { useFormik } from "formik";
import TableContainer from '../../Components/Common/TableContainer';
import classnames from "classnames";
import { ToastContainer } from "react-toastify";
import Spinners from "Components/Common/Spinner";
import DeleteModal from '../../Components/Common/DeleteModal';
import {
  CardText,
  CardTitle,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  UncontrolledCollapse, CardSubtitle, Table, FormGroup, Badge
} from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import moment from "moment";
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";
import { projectAssignedTo } from "../../common/data";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';
import { EcoAction } from "./type";
import EcommerceOrdersModal from "./EcommerceOrdersModal";

import {
  getOrders as onGetOrders,
  addNewOrder as onAddNewOrder,
  updateOrder as onUpdateOrder,
  deleteOrder as onDeleteOrder,
} from "slices/thunk";
import SingleSelect from './SingleSelect'; // Ajusta la ruta según la ubicación real de tu componente
import Slidewithindicator from "./../Ui/CarouselTypes/slidewithindicator";

import img2 from "../../assets/images/small/img-2.jpg";

import { timeLimits } from "slices/create-question/thunk";

const CreateQuestion = () => {
  const [loading, setLoading] = useState(true)

  document.title = "Create Question | Mercantec - Quiz Project";

  const [timeLimitsList, setTimeLimitsList] = useState<any>([]);
  const [datos, setDatos] = useState<any>([]);
  const [activeTab1, setactiveTab1] = useState("5");
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSingleSelect, setIsSingleSelect] = useState(true);
  const [isSort, setIsSort] = useState(false);

  const obtenerDatos = async () => {
    let formatedData: any[] = JSON.parse('[{"id":1,"answer":"Enforcing routing policies","correct":true},{"id":2,"answer":"Marking interesting traffic for data policies","correct":false},{"id":3,"answer":"Applying security policies","correct":false}]')
    //let formatedData: any[] = []
    setDatos(formatedData);
  };

  const getTimeLimits = async () => {
    setTimeLimitsList(await timeLimits())
  };

  useEffect(() => {
    obtenerDatos();
    getTimeLimits();
  }, []);

  const handleAcceptedFiles = (files: any) => {
    const newImages = files?.map((file: any) => {
      return Object.assign(file, {
        priview: URL.createObjectURL(file),
      })
    })
    setSelectedFiles([...selectedFiles, ...newImages]);
  };

  const toggle1 = (tab: any) => {
    if (activeTab1 !== tab) {
      setactiveTab1(tab);
    }
  };

  const ddad = (newData) => {
    setDatos(null)
    let n = JSON.parse(JSON.stringify(newData))
    setDatos(n)
  };

  const handleQuestionTypeChange = (event) => {
    const selectedType = event.target.value;
    if (selectedType === '0') {
      setIsSingleSelect(true);
      setIsSort(false);

      datos.forEach(function (answer) {
        answer.correct = false
      });

    } else if (selectedType === '1') {

      setIsSingleSelect(false);
      setIsSort(false);

    } else if (selectedType === '2') {
      setIsSort(true);
    }
  };

  const timeLimitsHumanFriendly = (seconds) => {

    let text = ""
    if (seconds < 60) {
      return `${seconds} seconds`;
    } else if (seconds >= 60 && seconds < 120) {
      const remainingSeconds = seconds % 60;

      text = "1 minute"
      if (remainingSeconds != 0) {
        text = text + ` ${remainingSeconds} seconds`
      }

      return text;
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      text = `${minutes} minutes`
      if (remainingSeconds != 0) {
        text = text + ` ${remainingSeconds} seconds`
      }

      return text;
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Questions" breadcrumbItem="Create Question" />
          <Form id="createproject-form" onSubmit={(e: any) => {
            e.preventDefault();
            return false;
          }}>

            {
              loading ? <Spinners setLoading={setLoading} />
                :
                <Row>
                  <Col lg={8}>
                    <Card>
                      <CardBody>
                        <input type="hidden" className="form-control" id="formAction" name="formAction" defaultValue="add" />
                        <input type="hidden" className="form-control" id="project-id-input" />
                        <div className="mb-3">
                          <Label htmlFor="projectname-input">Question</Label>
                          <Input
                            id="projectname"
                            name="projectname"
                            type="text"
                            placeholder="Enter your question"

                          />
                        </div>
                        <div>
                          <Label>Insert Media (optional)</Label>

                          <Dropzone
                            onDrop={(acceptedFiles: any) => {
                              handleAcceptedFiles(acceptedFiles);
                            }}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div className="dropzone">
                                <div
                                  className="dz-message needsclick"
                                  {...getRootProps()}
                                >
                                  <input {...getInputProps()} />
                                  <div className="dz-message needsclick">
                                    <div className="mb-3">
                                      <i className="display-4 text-muted bx bxs-cloud-upload" />
                                    </div>
                                    <h4>Drop files here or click to upload.</h4>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Dropzone>

                          <div
                            className="dropzone-previews mt-3"
                            id="file-previews"
                          >
                            {selectedFiles.map((file: any, index: any) => {
                              return (
                                <div className="border rounded" key={index}>
                                  <div className="d-flex flex-wrap gap-2 p-2">
                                    <div className="flex-shrink-0 me-3">
                                      <div className="avatar-sm bg-light rounded p-2">
                                        <img data-dz-thumbnail="" className="img-fluid rounded d-block" src={file.priview} alt={file.name} />
                                      </div>
                                    </div>
                                    <div className="flex-grow-1">
                                      <div className="pt-1">
                                        <h5 className="fs-md mb-1" data-dz-name>{file.path}</h5>
                                        <strong className="error text-danger" data-dz-errormessage></strong>
                                      </div>
                                    </div>
                                    <div className="flex-shrink-0 ms-3">
                                      <Button variant="danger" size="sm" onClick={() => {
                                        const newImages = [...selectedFiles];
                                        newImages.splice(index, 1);
                                        setSelectedFiles(newImages);
                                      }}>Delete</Button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {isSort ? (
                          <p>Question Type Sort - Not Implemented</p>
                        ) : (
                          <SingleSelect answers={datos} updateDatos={ddad} isSingleSelect={isSingleSelect} />
                        )}

                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={4}>
                    <Card>
                      <CardBody>
                        <h5 className="card-title mb-3">Settings</h5>
                        <div className="mb-3">
                          <Label htmlFor="project-status-input">Answer Type</Label>
                          <select className="form-select pageSize" id="project-status-input" onChange={handleQuestionTypeChange}>
                            <option value="0">Single Select</option>
                            <option value="1">Multi-select</option>
                            <option value="2">Sort</option>
                          </select>
                          <div className="invalid-feedback">Please select project status.</div>
                        </div>

                        <div>
                          <Label htmlFor="project-visibility-input">Time Limit</Label>
                          <select className="form-select pageSize" id="project-visibility-input">
                            <option value="select">Select</option>
                            {timeLimitsList.map((it, index) => (
                              <option key={index} value={it.time_in_seconds}>{
                                timeLimitsHumanFriendly(it.time_in_seconds)

                              }</option>
                            ))}
                          </select>
                        </div>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <h5 className="card-title mb-3">Points</h5>

                        <div className="mb-3">
                          <Label htmlFor="project-visibility-input">Question Level</Label>
                          <select className="form-select pageSize" id="project-visibility-input">
                            <option value="select">Select</option>

                            <option key="0" value="{it.name}">"wtf"</option>

                           
                          </select>
                        </div>

                            

                        <div>
                          <Label htmlFor="project-visibility-input">Score calculation</Label>
                          <Nav pills className="navtab-bg nav-justified">
                            <NavItem>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  active: activeTab1 === "5",
                                })}
                                onClick={() => {
                                  toggle1("5");
                                }}
                              >
                                <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                <span className="d-none d-sm-block">Default</span>
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  active: activeTab1 === "6",
                                })}
                                onClick={() => {
                                  toggle1("6");
                                }}
                              >
                                <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                                <span className="d-none d-sm-block">Custom</span>
                              </NavLink>
                            </NavItem>
                          </Nav>

                          <TabContent activeTab={activeTab1} className="p-3 text-muted">
                            <TabPane tabId="5">
                              <Row>
                                <Col sm="12">
                                  <CardText className="mb-0">
                                    The score will be calculated according to the table of scores per level defined in the system.
                                  </CardText>
                                </Col>
                              </Row>
                            </TabPane>
                            <TabPane tabId="6">
                              <Row>

                                <div className="table-responsive">
                                  <Table className="table mb-0">
                                    <thead className="table-light">
                                      <tr>
                                        <th>Level</th>
                                        <th>Score</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    <tr key="0">
                                          <th scope="row">test</th>
                                          <td>
                                            <div className="col-md-10">
                                              <input
                                                className="form-control"
                                                type="text"
                                                defaultValue="0.0"
                                              />
                                            </div>
                                          </td>
                                        </tr>


                                      
                                    </tbody>

                                   {/* 
                                   <tbody>
                                      <tr>
                                        <th scope="row">H1</th>
                                        <td><div className="col-md-10">
                                          <input
                                            className="form-control"
                                            type="text"
                                            defaultValue="2.0"
                                          />
                                        </div></td>
                                      </tr>
                                      <tr>
                                        <th scope="row">H2</th>
                                        <td><div className="col-md-10">
                                          <input
                                            className="form-control"
                                            type="text"
                                            defaultValue="1.5"
                                          />
                                        </div></td>
                                      </tr>
                                      <tr>
                                        <th scope="row" style={{ color: '#556ee6' }}>H3</th>
                                        <td><div className="col-md-10" >
                                          <input
                                            style={{ outline: '1px solid #556ee6' }}
                                            className="form-control"
                                            type="text"
                                            defaultValue="1.0"
                                          />
                                        </div></td>
                                      </tr>
                                      <tr>
                                        <th scope="row">H4</th>
                                        <td><div className="col-md-10">
                                          <input
                                            className="form-control"
                                            type="text"
                                            defaultValue="0.80"
                                          />
                                        </div></td>
                                      </tr>
                                      <tr>
                                        <th scope="row">H5</th>
                                        <td><div className="col-md-10">
                                          <input
                                            className="form-control"
                                            type="text"
                                            defaultValue="0.50"
                                          />
                                        </div></td>
                                      </tr>
                                      <tr>
                                        <th scope="row">H6</th>
                                        <td><div className="col-md-10">
                                          <input
                                            className="form-control"
                                            type="text"
                                            defaultValue="0.10"
                                          />
                                        </div></td>
                                      </tr>
                                    </tbody> */}
                                  </Table>
                                </div>


                              </Row>
                            </TabPane>
                          </TabContent>
                        </div>




                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={8}>
                    <div className="text-end mb-4">
                      <Button type="submit" color="primary">Create Answer</Button>
                    </div>
                  </Col>
                </Row>
            }
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateQuestion;

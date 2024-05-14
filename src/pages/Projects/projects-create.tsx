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

const ProjectsCreate = () => {

  //meta title
  document.title = "Create New Project | Skote - React Admin & Dashboard Template";


  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imgStore, setImgStore] = useState<any>([]);
  const [dropList, setDropList] = useState<any>(false);
  const [active, setActive] = useState<number | string>(0)

  const handleAcceptedFiles = (files: any) => {
    const newImages = files?.map((file: any) => {
      return Object.assign(file, {
        priview: URL.createObjectURL(file),
      })
    })
    setSelectedFiles([...selectedFiles, ...newImages]);
  };

  //  img upload
  const handleImageChange = (event: any) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      validation.setFieldValue('projectImage', reader.result)
    };
    reader.readAsDataURL(file);
  };

  const [activeTab1, setactiveTab1] = useState("5");

  const toggle1 = (tab: any) => {
    if (activeTab1 !== tab) {
      setactiveTab1(tab);
    }
  };












  const dispatch = useDispatch<any>();
  const selectProperties = createSelector(
    (state: EcoAction) => state.ecommerce,
    (ecommerce) => ({
      answers: ecommerce.orders,
      loading: ecommerce.loading
    })
  );
  const { answers, loading } = useSelector(selectProperties);
  const [isLoading, setLoading] = useState(loading)

  const [modal, setModal] = useState<boolean>(false);
  const [modal1, setModal1] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [order, setOrder] = useState<any>(null);

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      orderId: (order && order.orderId) || '',
      billingName: (order && order.billingName) || '',
      orderDate: (order && order.orderDate) || '',
      total: (order && order.total) || '',
      paymentStatus: (order && order.paymentStatus) || '',
      badgeClass: (order && order.badgeClass) || 'success',
      paymentMethod: (order && order.paymentMethod) || '',
    },
    validationSchema: Yup.object({
      orderId: Yup.string().required("Please Enter Your Order Id"),
      billingName: Yup.string().required("Please Enter Your Billing Name"),
      orderDate: Yup.string().required("Please Enter Your Order Date"),
      total: Yup.string().required("Total Amount"),
      paymentStatus: Yup.string().required("Please Enter Your Payment Status"),
      badgeClass: Yup.string().required("Please Enter Your Badge Class"),
      paymentMethod: Yup.string().required("Please Enter Your Payment Method"),
    }),
    onSubmit: (values: any) => {
      if (isEdit) {
        const updateOrder = {
          id: order ? order.id : 0,
          orderId: values.orderId,
          billingName: values.billingName,
          orderDate: values.orderDate,
          total: values.total,
          paymentStatus: values.paymentStatus,
          paymentMethod: values.paymentMethod,
          badgeClass: values.badgeClass,
        };
        // update order
        dispatch(onUpdateOrder(updateOrder));
        validation.resetForm();
      } else {
        const newOrder = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          orderId: values["orderId"],
          billingName: values["billingName"],
          orderDate: values["orderDate"],
          total: values["total"],
          paymentStatus: values["paymentStatus"],
          paymentMethod: values["paymentMethod"],
          badgeClass: values["badgeClass"],
        };
        // save new order
        dispatch(onAddNewOrder(newOrder));
        validation.resetForm();
      }
      toggle();
    },
  });

  const [editDetails, setEditDetails] = useState<any>('');

  const toggleViewModal = useCallback((data: any) => { setModal1(!modal1); setEditDetails(data) }, [modal1]);

  useEffect(() => {
    if (answers && !answers.length) {
      dispatch(onGetOrders());
    }
  }, [dispatch, answers]);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  const handleOrderClick = useCallback((arg: any) => {
    const order = arg;
    setOrder({
      id: order.id,
      answer: order.answer,
      correct: order.correct
    });
    setIsEdit(true);

    toggle();
  }, [toggle]);

  //delete order
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const onClickDelete = (order: any) => {
    setOrder(order);
    setDeleteModal(true);
  };

  const handleDeleteOrder = () => {
    if (order.id) {
      dispatch(onDeleteOrder(order.id));
      setDeleteModal(false);
    }
  };
  const handleOrderClicks = () => {
    console.log("sadsadsad")
    setIsEdit(false);
    setOrder("")
    toggle();
  };



  // validation
  const validation1: any = useFormik({
    initialValues: {
      projectname: '',
      projectdesc: '',
      assignedto: [],
      projectImage: '',
      img: '',
      startdate: '',
      // enddate: ''
    },
    validationSchema: Yup.object({
      projectname: Yup.string().required("Start typing your question"),
      projectdesc: Yup.string().required("Please Enter Your Project Desc"),
      assignedto: Yup.array().min(1, "Please Select"),
      startdate: Yup.string().required("Please Enter Your Start Date"),
      projectImage: Yup.string().required("Please Select Image"),
    }),
    onSubmit: (values: any) => {
      // console.log(values);

    }
  });


  const columns = useMemo(
    () => [
      {
        header: 'Answer',
        accessorKey: 'answer',
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: 'Correct',
        accessorKey: 'correct',
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return <input
            type="radio"
            id="customRadio2"
            name="customRadio"
            className="form-check-input"
            defaultChecked={cellProps.row.original.correct}
          />;
        }
      },
      {
        header: 'Payment Method',
        accessorKey: 'correct',
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: 'Action',
        accessorKey: 'action',
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <div className="d-flex gap-3">
              <Link to="#" className="text-success" onClick={() => { const orderData = cellProps.row.original; handleOrderClick(orderData); }}>
                <i className="mdi mdi-pencil font-size-18" id="editTooltip" />
                <UncontrolledTooltip placement="top" target="editTooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link to="#" className="text-danger" onClick={() => { const orderData = cellProps.row.original; onClickDelete(orderData); }}>
                <i className="mdi mdi-delete font-size-18" id="deleteTooltip" />
                <UncontrolledTooltip placement="top" target="deleteTooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        }
      },
    ],
    [handleOrderClick, toggleViewModal]
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projects" breadcrumbItem="Create New" />
          <Form id="createproject-form" onSubmit={(e: any) => {
            e.preventDefault();
            validation1.handleSubmit();
            return false;
          }}>

            {
              isLoading ? <Spinners setLoading={setLoading} />
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
                            onChange={validation1.handleChange}
                            onBlur={validation1.handleBlur}
                            value={validation1.values.projectname || ""}
                          />
                          {validation1.touched.projectname && validation1.errors.projectname ? (
                            <FormFeedback type="invalid" className="d-block">{validation1.errors.projectname}</FormFeedback>
                          ) : null}

                        </div>

                        <div>
                          <Label>Insert Media (optional)</Label>
                          <Dropzone
                            onDrop={(acceptedFiles: any) => {
                              handleAcceptedFiles(acceptedFiles);
                              validation1.setFieldValue("img", acceptedFiles[0])
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

                          {validation1.errors.img && validation1.touched.img ? (
                            <FormFeedback type="invalid" className="d-block">{validation1.errors.img}</FormFeedback>
                          ) : null}
                        </div>

                        <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} editDetails={editDetails} />
                        <DeleteModal
                          show={deleteModal}
                          onDeleteClick={handleDeleteOrder}
                          onCloseClick={() => setDeleteModal(false)}
                        />

                        <TableContainer
                          columns={columns}
                          data={answers || []}
                          isAddButton={true}
                          handleUserClick={handleOrderClicks}
                          buttonClass="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2 addOrder-modal"
                          buttonName=" Add Answer"
                          tableClass="align-middle table-nowrap dt-responsive nowrap w-100 table-check dataTable no-footer dtr-inline"
                          theadClass="table-light"
                        />

                        <Modal isOpen={modal} toggle={toggle}>
                          <ModalHeader toggle={toggle} tag="h4">
                            {!!isEdit ? "Edit Order" : "Add Order"}
                          </ModalHeader>
                          <ModalBody>
                            <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }}>
                              <Row>
                                <Col xs={12}>
                                  <div className="mb-3">
                                    <Label>Order Id</Label>
                                    <Input
                                      name="orderId"
                                      type="text"
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={validation.values.orderId || ""}
                                      invalid={
                                        validation.touched.orderId && validation.errors.orderId ? true : false
                                      }
                                    />
                                    {validation.touched.orderId && validation.errors.orderId ? (
                                      <FormFeedback type="invalid">{validation.errors.orderId}</FormFeedback>
                                    ) : null}
                                  </div>
                                  <div className="mb-3">
                                    <Label>Billing Name</Label>
                                    <Input
                                      name="billingName"
                                      type="text"
                                      validate={{
                                        required: { value: true },
                                      }}
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={validation.values.billingName || ""}
                                      invalid={
                                        validation.touched.billingName && validation.errors.billingName ? true : false
                                      }
                                    />
                                    {validation.touched.billingName && validation.errors.billingName ? (
                                      <FormFeedback type="invalid">{validation.errors.billingName}</FormFeedback>
                                    ) : null}
                                  </div>
                                  <div className="mb-3">
                                    <Label>Order Date</Label>
                                    <Flatpickr
                                      className="form-control d-block"
                                      id="orderDate"
                                      name="orderDate"
                                      placeholder="Select date"
                                      options={{
                                        mode: "single",
                                        dateFormat: 'd M, Y',
                                      }}
                                      onChange={(kycBirthDate: any) => validation.setFieldValue("orderDate", moment(kycBirthDate[0]).format("DD MMMM ,YYYY"))}
                                      value={validation.values.orderDate || ''}
                                    />
                                    {validation.touched.orderDate && validation.errors.orderDate ? (
                                      <span className="text-danger">{validation.errors.orderDate}</span>
                                    ) : null}
                                  </div>
                                  <div className="mb-3">
                                    <Label>Total</Label>
                                    <Input
                                      name="total"
                                      type="number"
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={validation.values.total || ""}
                                      invalid={
                                        validation.touched.total && validation.errors.total ? true : false
                                      }
                                    />
                                    {validation.touched.total && validation.errors.total ? (
                                      <FormFeedback type="invalid">{validation.errors.total}</FormFeedback>
                                    ) : null}
                                  </div>

                                  <div className="mb-3">
                                    <Label>Payment Method</Label>
                                    <Input
                                      name="paymentMethod"
                                      type="select"
                                      className="form-select"
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={
                                        validation.values.paymentMethod || ""
                                      }
                                    >
                                      <option>Mastercard</option>
                                      <option>Visa</option>
                                      <option>Paypal</option>
                                      <option>COD</option>
                                    </Input>
                                    {validation.touched.paymentMethod && validation.errors.paymentMethod ? (
                                      <FormFeedback type="invalid" className="d-block">{validation.errors.paymentMethod}</FormFeedback>
                                    ) : null}
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <div className="text-end">
                                    <Button type="submit" color="success" className="save-user">
                                      {!!isEdit ? "Update" : "Add"}
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </ModalBody>
                        </Modal>





                        <ToastContainer />


                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={4}>
                    <Card>
                      <CardBody>
                        <h5 className="card-title mb-3">Settings</h5>
                        <div className="mb-3">
                          <Label htmlFor="project-status-input">Question Type</Label>
                          <select className="form-select pageSize" id="project-status-input">
                            <option value="Completed">Single Select</option>
                            <option value="Inprogress">Multi-select</option>
                            <option value="Delay">Sort</option>
                          </select>
                          <div className="invalid-feedback">Please select project status.</div>
                        </div>

                        <div>
                          <Label htmlFor="project-visibility-input">Time Limit</Label>
                          <select className="form-select pageSize" id="project-visibility-input">
                            <option value="select">Select</option>

                            <option value="Private">20 seconds</option>
                            <option value="Private">30 seconds</option>
                            <option value="Private">1 minute</option>
                            <option value="Private">1 minute 30 seconds</option>
                            <option value="Private">2 minutes</option>
                            <option value="Private">3 minutes</option>
                            <option value="Private">4 minutes</option>
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
                            <option value="H1">H1</option>
                            <option value="H2">H2</option>
                            <option value="H3">H3</option>
                            <option value="H4">H4</option>
                            <option value="H5">H5</option>
                            <option value="H6">H6</option>
                          </select>
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="project-visibility-input">Difficulty</Label>
                          <select className="form-select pageSize" id="project-visibility-input">
                            <option value="select">Select</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
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
                                        <th>Multiplier</th>
                                      </tr>
                                    </thead>
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
                                    </tbody>
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
                      <Button type="submit" color="primary">Create Project</Button>
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

export default ProjectsCreate;

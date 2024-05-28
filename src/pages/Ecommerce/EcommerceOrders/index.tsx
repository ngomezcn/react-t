
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from 'react-router-dom';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../../../Components/Common/TableContainer';
import * as Yup from "yup";
import { Button, Col, Row, UncontrolledTooltip, Modal, ModalHeader, ModalBody, Form, Input, FormFeedback, Label, Card, CardBody, FormGroup, Badge } from "reactstrap";
import moment from "moment";
import { createSelector } from 'reselect';
import Spinners from "Components/Common/Spinner";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

//import components
import Breadcrumbs from '../../../Components/Common/Breadcrumb';
import DeleteModal from '../../../Components/Common/DeleteModal';

import {
  getOrders as onGetOrders,
  addNewOrder as onAddNewOrder,
  updateOrder as onUpdateOrder,
  deleteOrder as onDeleteOrder,
} from "slices/thunk";

//redux
import { useSelector, useDispatch } from "react-redux";

import { EcoAction } from "../type";

function EcommerceOrder() {

  //meta title
  document.title = "Orders | Mercantec - Quiz Project";

  const dispatch = useDispatch<any>();
  const selectProperties = createSelector(
    (state: EcoAction) => state.ecommerce,
    (ecommerce) => ({
      answers: ecommerce.answers,
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
      answer: Yup.string().required("Please Enter Your answer"),
      correct: Yup.string().required("Please Enter Your correct")
    }),
    onSubmit: (values: any) => {
      if (isEdit) {
        const updateOrder = {
          id: order ? order.id : 0,
          answer: values.answer,
          correct: values.correct
        };
        // update order
        dispatch(onUpdateOrder(updateOrder));
        validation.resetForm();
      } else {
        const newOrder = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          answer: values["answer"],
          correct: values["correct"],
          
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
    setIsEdit(false);
    setOrder("")
    toggle();
  };


  const columns = useMemo(
    () => [
      {
        header: () => {
          return (
            <FormGroup check className="font-size-16">
              <Label check>
                <Input type="checkbox" id="checkAll" />
              </Label>
            </FormGroup>
          )
        },
        accessorKey: "id",
        cell: () => (
          <FormGroup check className="font-size-16">
            <Label check>
              <Input type="checkbox" id="checkAll" />
            </Label>
          </FormGroup>
        ),
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: 'Order ID',
        accessorKey: 'answer',
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return <Link to="#" className="text-body fw-bold">{cellProps.row.original.orderId}</Link>
        }
      },
     /* {
        header: 'Billing Name',
        accessorKey: 'billingName',
        enableColumnFilter: false,
        enableSorting: true,
      },*/
      {
        header: 'Payment Status',
        accessorKey: 'correct',
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return <Badge
            className={"font-size-12 badge-soft-" +
              (cellProps.row.original.paymentStatus === "Paid" ? "success" : "danger" && cellProps.row.original.paymentStatus === "Refund" ? "warning" : "danger")}
          >
            {cellProps.row.original.paymentStatus}
          </Badge>;
        }
      },
      {
        header: 'Payment Method',
        accessorKey: 'correct',
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return <span>
            <i
              className={
                (cellProps.row.original.paymentMethod === "Paypal" ? "fab fa-cc-paypal me-1" : "" ||
                  cellProps.row.original.paymentMethod === "COD" ? "fab fas fa-money-bill-alt me-1" : "" ||
                    cellProps.row.original.paymentMethod === "Mastercard" ? "fab fa-cc-mastercard me-1" : "" ||
                      cellProps.row.original.paymentMethod === "Visa" ? "fab fa-cc-visa me-1" : ""
                )}
            />{" "}
            {cellProps.row.original.paymentMethod}
          </span>;
        }
      },
      {
        header: 'View Details',
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <Button type="button" color="primary" className="btn-sm btn-rounded"
              onClick={() => {
                const orderData = cellProps.row.original; toggleViewModal(orderData)
              }}
            >
              View Details
            </Button>);
        }
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
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Orders" />
          {
            isLoading ? <Spinners setLoading={setLoading} />
              :
              <Row>
                <Col xs={12}>
                  <Card>
                    <CardBody>
                      <TableContainer
                        columns={columns}
                        data={answers || []}
                        isGlobalFilter={true}
                        isAddButton={true}
                        isCustomPageSize={true}
                        handleUserClick={handleOrderClicks}
                        isPagination={true}
                        SearchPlaceholder="26 records..."
                        buttonClass="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2 addOrder-modal"
                        buttonName=" Add New Order"
                        tableClass="align-middle table-nowrap dt-responsive nowrap w-100 table-check dataTable no-footer dtr-inline"
                        theadClass="table-light"
                        pagination="pagination"
                        paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
          }
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
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
export default EcommerceOrder;
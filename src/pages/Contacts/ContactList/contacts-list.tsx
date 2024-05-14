import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Card, CardBody, Col, Container, Row, Modal, ModalHeader, ModalBody, Label, FormFeedback, Input, Form, Button
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
//redux
import { useSelector, useDispatch } from "react-redux";

import TableContainer from "../../../Components/Common/TableContainer";
import withRouter from "../../../Components/Common/withRouter";

//Import Breadcrumb
import Breadcrumbs from "../../../Components/Common/Breadcrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";

import {
  getUsers as onGetUsers,
  deleteUsers as onDeleteUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser
}
  from "../../../slices/contacts/thunk"
import { createSelector } from 'reselect';
import Spinners from "Components/Common/Spinner";
import { ToastContainer } from "react-toastify";

const ContactsList = () => {

  //meta title
  document.title = "User List | Skote - React Admin & Dashboard Template";

  const selectProperties = createSelector(
    (state: any) => state.contacts,
    (contact) => ({
      users: contact.users,
      loading: contact.loading
    })
  );

  const { users, loading }: any = useSelector(selectProperties);
  const [isLoading, setLoading] = useState<boolean>(loading);

  const dispatch = useDispatch<any>();
  const [contact, setContact] = useState<any>();

  const [modal, setModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || "",
      designation: (contact && contact.designation) || "",
      tags: (contact && contact.tags) || "",
      email: (contact && contact.email) || "",
      projects: (contact && contact.projects) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      designation: Yup.string().required("Please Enter Your Designation"),
      tags: Yup.array().required("Please Enter Tag"),
      email: Yup.string().email().required("Please Enter Your Email"),
      projects: Yup.number().required("Please Enter Your Project"),
    }),
    onSubmit: (values: any) => {
      if (isEdit) {
        const updateUser = {
          id: contact.id,
          name: values.name,
          designation: values.designation,
          tags: values.tags,
          email: values.email,
          projects: values.projects,
        };
        // update user
        dispatch(onUpdateUser(updateUser));
        validation.resetForm();
        setIsEdit(false);
      } else {
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          designation: values["designation"],
          email: values["email"],
          tags: values["tags"],
          projects: values["projects"],
        };
        // save new user
        dispatch(onAddNewUser(newUser));
        validation.resetForm();
      }
      toggle();
    },
  });

  const handleUserClick = useCallback((arg: any) => {
    const user = arg;

    setContact({
      id: user.id,
      name: user.name,
      designation: user.designation,
      email: user.email,
      tags: user.tags,
      projects: user.projects,
    });
    setIsEdit(true);

    toggle();
  }, [toggle]);

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <>
              {!cellProps.row.original.img ? (
                <div className="avatar-xs">
                  <span className="avatar-title rounded-circle">{cellProps.row.original.name.charAt(0)} </span>
                </div>
              ) : (
                <div>
                  <img className="rounded-circle avatar-xs" src={cellProps.row.original.img} alt="" />
                </div>
              )}
            </>
          )
        },
      },
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <>
              <h5 className='font-size-14 mb-1'>
                <Link to='#' className='text-dark'>{cellProps.getValue()}</Link>
              </h5>
              <p className="text-muted mb-0">{cellProps.row.original.designation}</p>
            </>
          );
        },
      },
      {
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Tags",
        accessorKey: "tags",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <div>
              {
                cellProps.row.original.tags?.map((item: any, index: number) => (
                  <Link to="#1" className="badge badge-soft-primary font-size-11 m-1" key={index}>{item}</Link>
                ))
              }
            </div>
          );
        },
      },
      {
        header: "Projects",
        accessorKey: "projects",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Action",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cellProps: any) => {
          return (
            <div className="d-flex gap-3">
              <Link to="#!" className="text-success"
                onClick={(event: any) => {
                  event.preventDefault();
                  const userData = cellProps.row.original;
                  handleUserClick(userData);
                }} >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              </Link>
              <Link to="#!" className="text-danger"
                onClick={(event: any) => {
                  event.preventDefault();
                  const userData = cellProps.row.original;
                  onClickDelete(userData);
                }}  >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
              </Link>
            </div>
          );
        },
      },
    ],
    [handleUserClick]
  );

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers());
      setIsEdit(false);
    }
  }, [dispatch, users]);

  useEffect(() => {
    setContact(users);
    setIsEdit(false);
  }, [users]);

  var node: any = useRef();
  const onPaginationPageChange = (page: any) => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };

  //delete customer
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const onClickDelete = (users: any) => {
    setContact(users.id);
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {
    dispatch(onDeleteUsers(contact));
    onPaginationPageChange(1);
    setDeleteModal(false);
  };

  const handleUserClicks = () => {
    setIsEdit(false);
    setContact("")
    toggle();
  };

  // const keyField = "id";

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Contacts" breadcrumbItem="User List" />
          <Row>
            <Col lg="12">
              {
                isLoading ? <Spinners setLoading={setLoading} />
                  :
                  <Card>
                    <CardBody>
                      <TableContainer
                        columns={columns}
                        data={users || []}
                        isGlobalFilter={true}
                        isPagination={true}
                        SearchPlaceholder="Search..."
                        isCustomPageSize={true}
                        isAddButton={true}
                        handleUserClick={handleUserClicks}
                        buttonClass="btn btn-success btn-rounded waves-effect waves-light addContact-modal mb-2"
                        buttonName="New Contact"
                        tableClass="align-middle table-nowrap table-hover dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                        theadClass="table-light"
                        paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                        pagination="pagination"
                      />
                    </CardBody>
                  </Card>
              }
              <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} tag="h4"> {!!isEdit ? "Edit User" : "Add User"}</ModalHeader>
                <ModalBody>
                  <Form
                    onSubmit={e => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    <Row>
                      <Col xs={12}>
                        <div className="mb-3">
                          <Label>Name</Label>
                          <Input
                            name="name"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.name || ""}
                            invalid={
                              validation.touched.name && validation.errors.name ? true : false}
                          />
                          {validation.touched.name &&
                            validation.errors.name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.name}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label>Email</Label>
                          <Input
                            name="email"
                            label="Email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email && validation.errors.email ? true : false}
                          />
                          {validation.touched.email && validation.errors.email ?
                            (
                              <FormFeedback type="invalid">   {validation.errors.email} </FormFeedback>
                            ) : null}
                        </div>
                        <div className="mb-3">
                          <Label>Option</Label>
                          <Input
                            type="select"
                            name="tags"
                            className="form-select"
                            multiple={true}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.tags || []}
                            invalid={
                              validation.touched.tags && validation.errors.tags ? true : false}
                          >
                            <option>Photoshop</option>
                            <option>illustrator</option>
                            <option>Html</option>
                            <option>Php</option>
                            <option>Java</option>
                            <option>Python</option>
                            <option>UI/UX Designer</option>
                            <option>Ruby</option>
                            <option>Css</option>
                          </Input>
                          {validation.touched.tags && validation.errors.tags ?
                            (
                              <FormFeedback type="invalid">  {validation.errors.tags} </FormFeedback>
                            ) : null}
                        </div>
                        <div className="mb-3">
                          <Label>Projects</Label>
                          <Input
                            name="projects"
                            label="Projects"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.projects || ""}
                            invalid={
                              validation.touched.projects && validation.errors.projects ? true : false}
                          />
                          {validation.touched.projects && validation.errors.projects ?
                            (
                              <FormFeedback type="invalid"> {validation.errors.projects}  </FormFeedback>
                            ) : null}
                        </div>
                        <div className="mb-3">
                          <Label>Designation</Label>
                          <Input
                            type="select"
                            name="designation"
                            className="form-select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.designation || ''}
                            invalid={
                              validation.touched.designation && validation.errors.designation ? true : false}
                          >
                            <option>Frontend Developer</option>
                            <option>UI/UX Designer</option>
                            <option>Backend Developer</option>
                            <option>Full Stack Developer</option>
                          </Input>
                          {validation.touched.designation && validation.errors.designation ?
                            (
                              <FormFeedback type="invalid">  {validation.errors.designation} </FormFeedback>
                            ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="text-end">
                          <Button type="submit" color="success" className="save-user"> {!!isEdit ? "Update" : "Add"}  </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </ModalBody>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(ContactsList);

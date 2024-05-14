import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Row, Col, Form, Label, Input, FormFeedback, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from "reactstrap";
import "flatpickr/dist/themes/material_blue.css";
import { ToastContainer } from "react-toastify";
import {
    getOrders as onGetOrders,
    addNewOrder as onAddNewOrder,
} from "slices/thunk";
import TableContainer from '../../Components/Common/TableContainer';
import DeleteModal from '../../Components/Common/DeleteModal';
import EcommerceOrdersModal from "./EcommerceOrdersModal";

const ProjectComponent = ({ answers, updateDatos, isSingleSelect }) => {

    const dispatch = useDispatch<any>();
    const [modal, setModal] = useState<boolean>(false);
    const [modal1, setModal1] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [order, setOrder] = useState<any>(null);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    // validation
    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            answer: (order && order.answer) || '',
            correct: (order && order.correct) || false,
        },
        /*validationSchema: Yup.object({
            answer: Yup.string().required("Please Enter Your Billing Name"),
            correct: Yup.boolean().required("Please Enter Your Payment Method"),
        }),*/
        onSubmit: (values: any) => {
            if (isEdit) {
                const updateOrder = {
                    id: order ? order.id : 0,
                    answer: values.answer,
                    correct: values.correct,
                };
                // update order
                //dispatch(onUpdateOrder(updateOrder));
                updateAnswer(updateOrder)
                validation.resetForm();
            } else {
                const newOrder = {
                    id: Math.floor(Math.random() * (30 - 20)) + 20,
                    answer: values["answer"],
                    correct: values["correct"],
                };
                // save new order
                addNewAnswer(newOrder)
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

    const onClickDelete = (order: any) => {
        deleteAnswer(order.id)
    };

    const handleOrderClicks = () => {
        setIsEdit(false);
        setOrder("")
        toggle();
    };

    const addNewAnswer = (newAnswer) => {
        let newList : any[] = answers
        newList.push(newAnswer)
        updateDatos(newList)
    }

    const updateAnswer = (answer) => {
        answers.forEach(function (obj) {
            if (obj.id == answer.id) {
                obj.answer = answer.answer
            }
        });

        updateDatos(answers)
    }

    const deleteAnswer = (id) => {
        let newList : any[] =[]
    
        answers.forEach(function (answer) {
            if (answer.id != id) {
                newList.push(answer)
            } 
        });

        answers = newList
        updateDatos(newList)
    }

    const singleSelect = (id) => {
        answers.forEach(function (number) {
            if (number.id != id) {
                number.correct = false
            } else {
                number.correct = true
            }
        });

        updateDatos(answers)
    };

    const multiSelect = (id) => {
        answers.forEach(function (number) {
            if (number.id == id) {
                number.correct = true
            } 
        });

        updateDatos(answers)
    };

    const columns = useMemo(
        () => [
            {
                header: 'Answer',
                accessorKey: 'answer',
                enableColumnFilter: false,
            },
            {
                header: 'Correct',
                accessorKey: 'correct',
                enableColumnFilter: false,
                cell: (cellProps: any) => {
                    const handleClickIsSingleSelect = () => {
                        singleSelect(cellProps.row.original.id)
                        validation.resetForm();
                    };
                    const handleClickIsMultiSelect = () => {
                        multiSelect(cellProps.row.original.id)
                        validation.resetForm();
                    };

                    return isSingleSelect ? ( // Comprueba si isRadio es verdadero
                        <input
                            type="radio"
                            id="customRadio2"
                            name="customRadio"
                            className="form-check-input"
                            defaultChecked={cellProps.row.original.correct}
                            onClick={handleClickIsSingleSelect}
                        />
                    ) : (
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckcolor1"
                            checked={cellProps.row.original.correct}
                            onChange={handleClickIsMultiSelect}
                        />
                    );
                }
            },
            /*{
                header: 'Correct {debug}',
                accessorKey: 'correct',
                enableColumnFilter: false,
            },*/
            {
                header: '',
                accessorKey: 'action',
                enableColumnFilter: false,
                cell: (cellProps: any) => {
                    return (
                        <div className="d-flex justify-content-end gap-3s">
                            <Link to="#" className="text-success" onClick={() => { const orderData = cellProps.row.original; handleOrderClick(orderData); }}>
                                <i className="mdi mdi-pencil font-size-18 me-2" id="editTooltip" />
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
        [handleOrderClick, toggleViewModal, answers, isSingleSelect]
    );

    return (
        <React.Fragment>

            <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} editDetails={editDetails} />

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
                
                <ModalBody>
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }}>
                        <Row>
                            <Col xs={12}>
                                <div className="mb-3">
                                    <Label>Answer</Label>
                                    <Input
                                        name="answer"
                                        type="text"
                                        validate={{
                                            required: { value: true },
                                        }}
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.answer || ""}
                                        invalid={
                                            validation.touched.answer && validation.errors.answer ? true : false
                                        }
                                    />
                                    {validation.touched.answer && validation.errors.answer ? (
                                        <FormFeedback type="invalid">{validation.errors.answer}</FormFeedback>
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
        </React.Fragment>
    );
}

export default ProjectComponent;

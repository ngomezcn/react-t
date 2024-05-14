import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../Components/Common/withRouter";
import TableContainer from "../../../Components/Common/TableContainer";
import { Badge, Card, CardBody, Col, Container, Row, UncontrolledTooltip } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../Components/Common/Breadcrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";

import {
    getApplyJob as onGetApplyJob,
    deleteApplyJob as ondeleteApplyJob
} from "../../../slices/jobs/thunk"

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';
import Spinners from "Components/Common/Spinner";
import { ToastContainer } from "react-toastify";

const ApplyJobs = () => {

    //meta title
    document.title = "Job Apply | Skote - React Admin & Dashboard Template";

    const dispatch = useDispatch<any>();

    const selectProperties = createSelector(
        (state: any) => state.jobs,
        (jobs) => ({
            jobApply: jobs.applyJobs,
            loading: jobs.loading
        })
    );

    const { jobApply, loading } = useSelector(selectProperties);
    const [apply, setApply] = useState<any>(null);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(loading);

    useEffect(() => {
        dispatch(onGetApplyJob());
    }, [dispatch]);

    useEffect(() => {
        setApply(jobApply);
    }, [jobApply]);

    // delete
    const onClickData = (apply: any) => {
        setApply(apply);
        setDeleteModal(true);
    };

    const handleDeleteApplyJob = () => {
        if (apply) {
            dispatch(ondeleteApplyJob(apply.id));
            setDeleteModal(false);
        }
    };

    const columns = useMemo(
        () => [
            {
                header: "No",
                accessorKey: "no",
                enableColumnFilter: false,
                enableSorting: true,

            },
            {
                header: "Job Title",
                accessorKey: "jobTitle",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Company Name",
                accessorKey: "companyName",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Type",
                accessorKey: "type",
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps: { row: { original: any } }) => {
                    switch (cellProps.row.original.type) {
                        case "Full Time":
                            return <Badge className="badge-soft-success">Full Time</Badge>
                        case "Freelance":
                            return <Badge className="badge-soft-info">Freelance</Badge>
                        case "Internship":
                            return <Badge className="badge-soft-warning">Internship</Badge>
                        default:
                            return <Badge className="badge-soft-danger">Part Time</Badge>
                    }
                }
            },
            {
                header: "Apply Date",
                accessorKey: "applyDate",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Status",
                accessorKey: "status",
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps: { row: { original: any } }) => {
                    switch (cellProps.row.original.status) {
                        case "Active":
                            return <Badge className="bg-success">Active</Badge>
                        case "New":
                            return <Badge className="bg-info">New</Badge>
                        default:
                            return <Badge className="bg-danger">Close</Badge>
                    }
                }
            },
            {
                header: "Action",
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps: any) => {
                    return (
                        <div className="list-unstyled hstack gap-1 mb-0">
                            <li>
                                <Link
                                    to="/job-details"
                                    className="btn btn-sm btn-soft-primary"
                                >
                                    <i className="mdi mdi-eye-outline" id="viewtooltip" />
                                    <UncontrolledTooltip placement="top" target="viewtooltip">
                                        View
                                    </UncontrolledTooltip>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="btn btn-sm btn-soft-danger"
                                    onClick={() => {
                                        const userData = cellProps.row.original;
                                        onClickData(userData);
                                    }}
                                >
                                    <i className="mdi mdi-delete-outline" id="deletetooltip" />
                                    <UncontrolledTooltip placement="top" target="deletetooltip">
                                        Delete
                                    </UncontrolledTooltip>
                                </Link>
                            </li>
                        </div>
                    );
                },
            },
        ],
        []
    );

    return (
        <React.Fragment>
            <DeleteModal
                show={deleteModal}
                onDeleteClick={() => handleDeleteApplyJob()}
                onCloseClick={() => setDeleteModal(false)}
            />
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Jobs" breadcrumbItem="Job Apply" />
                    <Row>
                        <Col lg={12}>
                            {
                                isLoading ? <Spinners setLoading={setLoading} />
                                    :
                                    <Card>
                                        <CardBody className="border-bottom">
                                            <div className="d-flex align-items-center">
                                                <h5 className="mb-0 card-title flex-grow-1">Applied Jobs</h5>
                                                <div className="flex-shrink-0">
                                                    <select className="form-select">
                                                        <option value="Today">Today</option>
                                                        <option value="1 Monthly">1 Month</option>
                                                        <option value="6 Month">6 Month</option>
                                                        <option value="1 Years">1 Year</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </CardBody>
                                        <CardBody>
                                            <TableContainer
                                                columns={columns}
                                                data={jobApply || []}
                                                isGlobalFilter={false}
                                                // customPageSize={10}
                                                // isShowingPageLength={true}
                                                isPagination={true}
                                                // tableWrapper="dataTables_wrapper dt-bootstrap4 no-footer"
                                                tableClass="table-bordered align-middle nowrap"
                                                pagination="pagination pagination-rounded"
                                            />
                                        </CardBody>
                                    </Card>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
            <ToastContainer />
        </React.Fragment>
    );
};

export default withRouter(ApplyJobs);

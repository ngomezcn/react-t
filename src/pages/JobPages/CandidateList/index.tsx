import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row, Collapse, Label, Input, Form, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

//Import Breadcrumb
import Breadcrumbs from "../../../Components/Common/Breadcrumb";
import List from './List';
import { getJobCandidateList as onGetJobCandidateList } from 'slices/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import Spinners from 'Components/Common/Spinner';
import { experienceData, jobType } from 'common/data';
import { handleSearchData } from 'Components/Common/SearchFile';
import Select from "react-select";

const CandidateList = () => {
    document.title = "Candidate List | Skote - React Admin & Dashboard Template";

    const dispatch = useDispatch<any>();

    const selectProperties = createSelector(
        (state: any) => state.jobs,
        (jobs) => ({
            jobListCandidate: jobs.candidateList,
            loading: jobs.loading
        })
    );
    const { jobListCandidate, loading } = useSelector(selectProperties);
    const [listData, setListData] = useState<any>();
    const [isLoading, setLoading] = useState<boolean>(loading);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggle = () => setIsOpen(!isOpen);

    const [endDate, setendDate] = useState<any>(new Date());
    const endDateChange = (date: any) => {
        setendDate(date);
    };

    useEffect(() => {
        dispatch(onGetJobCandidateList())
    }, [dispatch])

    useEffect(() => {
        setListData(jobListCandidate)
    }, [jobListCandidate])

    // search
    const hanldeSearchJob = (value: any) => {
        let search = value;
        handleSearchData({ setState: setListData, data: jobListCandidate, item: search })
    }

    const options = [
        { value: "Freelance", label: "Freelance" },
        { value: "Full Time", label: "Full Time" },
        { value: "Part Time", label: "Part Time" },
        { value: "Internship", label: "Internship" },
    ]
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Jobs" breadcrumbItem="Candidate List" />
                    <Row>
                        <Col lg={12}>
                            <Card className="job-filter">
                                <CardBody>
                                    <Form action="#">
                                        <Row className="g-3">
                                            <Col xxl={4} lg={4}>
                                                <div className="position-relative">
                                                    <Input type="text" id="searchJob" autoComplete="off" placeholder="Search your candidate" onChange={(e) => hanldeSearchJob(e.target.value)} />
                                                </div>
                                            </Col>

                                            <Col xxl={2} lg={4}>
                                                <div className="position-relative">
                                                    <Input type="text" id="locationInput" autoComplete="off" placeholder="Search for location" onChange={(e) => hanldeSearchJob(e.target.value)} />
                                                </div>
                                            </Col>

                                            <Col xxl={2} lg={4}>
                                                <div className="position-relative">
                                                    {/* <select className="form-select select2" aria-label="Default select example" onClick={handleSearchType} >
                                                        <option value="All">Select for</option>
                                                        <option value="Freelance">Freelance</option>
                                                        <option value="Full Time">Full Time</option>
                                                        <option value="Part Time">Part Time</option>
                                                        <option value="Internship">Internship</option>
                                                    </select> */}
                                                    <Select
                                                        className="select2"
                                                        onChange={(e: any) => {
                                                            hanldeSearchJob(e.value);
                                                        }} options={options} />
                                                </div>
                                            </Col>

                                            <Col xxl={2} lg={6}>
                                                <div className="position-relative">
                                                    <div id="datepicker1">
                                                        <Flatpickr
                                                            className="form-control"
                                                            id="orderdate"
                                                            name="kycbirthDate"
                                                            placeholder="Select date"
                                                            options={{
                                                                mode: "single",
                                                                dateFormat: 'd M, Y',
                                                            }}
                                                            value={endDate}
                                                            onChange={endDateChange}
                                                        />
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col xxl={2} lg={6}>
                                                <div className="position-relative h-100 hstack gap-3">
                                                    <Button type="button" color='primary' className="h-100 w-100"><i className="bx bx-search-alt align-middle"></i> Find Jobs</Button>
                                                    <Link to="#" onClick={toggle} className="btn btn-secondary h-100 w-100">
                                                        <i className="bx bx-filter-alt align-middle"></i> Advance</Link>
                                                </div>
                                            </Col>

                                            <Collapse isOpen={isOpen} id="collapseExample">
                                                <div>
                                                    <Row className="g-3">
                                                        <Col xxl={4} lg={6}>
                                                            <div>
                                                                <Label htmlFor="experience" className="form-label fw-semibold">Experience</Label>
                                                            </div>
                                                            {
                                                                (experienceData || []).map((item, index) => (
                                                                    <div className="form-check form-check-inline" key={index}>
                                                                        <Input className="form-check-input" type="checkbox" id={`inlineCheckbox${item.id}`} value={item.value} />
                                                                        <Label className="form-check-label" htmlFor={`inlineCheckbox${item.id}`}>{item.label}</Label>
                                                                    </div>
                                                                ))
                                                            }
                                                        </Col>
                                                        <Col xxl={4} lg={6}>
                                                            <div>
                                                                <Label htmlFor="jobType" className="form-label fw-semibold">Job Type</Label>
                                                            </div>
                                                            {
                                                                (jobType || []).map((item, index) => (
                                                                    <div className="form-check form-check-inline" key={index}>
                                                                        <Input type="checkbox" id={`inlineCheckbox${item.id}`} value={item.value} />
                                                                        <Label className="form-check-label" htmlFor={`inlineCheckbox${item.id}`}>{item.label}</Label>
                                                                    </div>
                                                                ))
                                                            }
                                                        </Col>
                                                        <Col xxl={4} lg={4}>
                                                            <div className="position-relative">
                                                                <Label htmlFor="qualificationInput" className="form-label fw-semibold">Qualification</Label>
                                                                <Input type="text" className="form-control" id="qualificationInput" autoComplete="off" placeholder="Qualification" />
                                                                <i className="ri-government-line filter-icon"></i>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Collapse>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                    {
                        isLoading ? <Spinners setLoading={setLoading} />
                            :
                            <List candidateDate={listData} />
                    }
                </Container>
            </div>
        </React.Fragment>
    );
}

export default CandidateList;
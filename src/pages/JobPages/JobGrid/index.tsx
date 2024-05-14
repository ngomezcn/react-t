import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';

//Import Breadcrumb
import Breadcrumbs from "../../../Components/Common/Breadcrumb";
import JobFilter from './JobFilter';
import JobData from './JobData';
import { getJobGrid as onGetJobGrid } from 'slices/thunk';
import Spinners from 'Components/Common/Spinner';

const JobGrid = () => {
    document.title = "Jobs Grid | Skote - React Admin & Dashboard Template";

    const dispatch = useDispatch<any>();

    const selectProperties = createSelector(
        (state: any) => state.jobs,
        (jobs) => ({
            jobdata: jobs.jobGrid,
            loading: jobs.loading
        })
    );
    const { jobdata, loading } = useSelector(selectProperties);
    const [jobGrid, setJobGrid] = useState<any>()
    const [isLoading, setLoading] = useState<boolean>(loading)

    useEffect(() => {
        dispatch(onGetJobGrid())
    }, [dispatch])

    useEffect(() => {
        setJobGrid(jobdata)
    }, [jobdata])

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Jobs" breadcrumbItem="Jobs Grid" />

                    <JobFilter setJobGrid={setJobGrid} jobdata={jobdata} />
                    {
                        isLoading ? <Spinners setLoading={setLoading} />
                            :
                            <JobData jobGrid={jobGrid} />
                    }
                </Container>
            </div>
        </React.Fragment>
    );
}

export default JobGrid;
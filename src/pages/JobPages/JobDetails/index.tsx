import React from 'react';
import { Container, Row } from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from "../../../Components/Common/Breadcrumb";
import Overview from './Overview';
import DetailsSection from './DetailsSection';

const JobDetails = () => {
    document.title = "Job Details | Mercantec - Quiz Project";
   
    return (
        <React.Fragment>
             <div className="page-content">
                <Container fluid>
                {/* Render Breadcrumbs */}
                <Breadcrumbs title="Jobs" breadcrumbItem="Job Details" />

                <Row>
                    <Overview />
                    <DetailsSection />
                </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default JobDetails;
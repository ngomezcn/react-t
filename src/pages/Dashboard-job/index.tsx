import React from 'react';
import { Container, Row } from 'reactstrap';

//Import Components
import ActivityFeed from './ActivityFeed';
import AddedJobs from './AddedJobs';
import CandidateSection from './CandidateSection';
import ChartSection from './ChartSection';
import JobVacancy from './JobVacancy';
import ReceivedTime from './ReceivedTime';
import Section from './Section';
import StatisticApplication from './StatisticsApplications';

const DashboardJob = () => {

    document.title = "Job Dashboard | Skote - React Admin & Dashboard Template"

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    <Section />

                    <ChartSection />

                    <Row>
                        <StatisticApplication />
                        <CandidateSection />
                    </Row>

                    <Row>
                        <JobVacancy />
                    </Row>

                    <Row>
                        <ReceivedTime />
                        <ActivityFeed />
                        <AddedJobs />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default DashboardJob;
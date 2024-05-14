import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Col, Nav, NavItem, NavLink } from 'reactstrap';
import { StatisticsApplicationsChart } from './JobCharts';
import { getStatisticsApplications as onGetStatisticsApplications } from 'slices/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { StatisticsApplication } from './type';

interface chartState {
    dashboard: {
        statisticsApplications: StatisticsApplication[]
    }
}

const StatisticApplication: React.FC = () => {

    const dispatch = useDispatch<any>();

    const selectorChart = createSelector(
        (state: chartState) => state.dashboard,
        (dashboard) => ({
            statisticsApplications: dashboard.statisticsApplications
        })
    )

    const { statisticsApplications }: any = useSelector(selectorChart);

    const statisticsData: StatisticsApplication[] = statisticsApplications[0]?.data;

    const [active, setActive] = useState<number>(1);

    const handleChangeChart = (chartType: number) => {
        setActive(chartType)
        dispatch(onGetStatisticsApplications(chartType))
    }

    useEffect(() => {
        dispatch(onGetStatisticsApplications(1))
    }, [dispatch]);

    return (
        <React.Fragment>
            <Col lg={8}>
                <Card>
                    <CardBody>
                        <div className="d-sm-flex flex-wrap">
                            <CardTitle tag="h4" className="mb-4">Statistics Applications</CardTitle>
                            <div className="ms-auto">
                                <Nav pills>
                                    <NavItem>
                                        <NavLink href="#" className={active === 3 ? "active" : ''} onClick={() => handleChangeChart(3)}>Week</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#" className={active === 2 ? "active" : ''} onClick={() => handleChangeChart(2)}>Month</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={active === 1 ? "active" : ''} href="#" onClick={() => handleChangeChart(1)}>Year</NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                        </div>
                        <StatisticsApplicationsChart StatisticsSerias={statisticsData} dataColors='["--bs-primary", "--bs-success", "--bs-warning", "--bs-info"]' dir="ltr" />
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default StatisticApplication;
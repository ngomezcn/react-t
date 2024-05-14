import React from 'react';
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

import SimpleLineChart from '../Allcharts/rechart/SimpleLineChart';
import SimpleAreaChart from '../Allcharts/rechart/SimpleAreaChart';
import MixBarChart from '../Allcharts/rechart/MixBarChart';
import VerticalComposedChart from '../Allcharts/rechart/VerticalComposedChart';
import ThreeDimScatterChart from '../Allcharts/rechart/ThreeDimScatterChart';
import SpecifiedDomainRadarChart from '../Allcharts/rechart/SpecifiedDomainRadarChart';
import SimpleRadialBarChart from '../Allcharts/rechart/SimpleRadialBarChart';
import CustomActiveShapePieChart from '../Allcharts/rechart/CustomActiveShapePieChart';

const ReCharts = () => {

    //meta title
    document.title = "Re Charts | Skote - React Admin & Dashboard Template"

    return (
        <React.Fragment>
            <React.Fragment>
                <div className="page-content">
                    <div className="container-fluid">
                        <Breadcrumbs title="Charts" breadcrumbItem="Re Chart" />

                        <Row>
                            <Col xl={6}>
                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4">SimpleLine Chart</CardTitle>
                                        <SimpleLineChart />
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4">SimpleArea Chart</CardTitle>
                                        <SimpleAreaChart />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={6}>
                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4">SimpleLine Chart</CardTitle>
                                        <MixBarChart />
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4">SimpleArea Chart</CardTitle>
                                        <VerticalComposedChart />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={6}>
                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4">ThreeDimScatter Chart</CardTitle>
                                        <ThreeDimScatterChart />
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4">SpecifiedDomain Radar Chart</CardTitle>
                                        <SpecifiedDomainRadarChart />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={6}>
                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4">SimpleRadialBar Chart</CardTitle>
                                        <SimpleRadialBarChart />
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4">CustomActiveShapePie Chart</CardTitle>
                                        <CustomActiveShapePieChart />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </React.Fragment>
        </React.Fragment>
    );
}

export default ReCharts;
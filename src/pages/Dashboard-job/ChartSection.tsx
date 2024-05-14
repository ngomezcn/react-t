import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';

//import components
import { JobWidgetCharts } from './JobCharts';
import { chartsData } from '../../common/data';
import { ChartData } from './type';

const ChartSection: React.FC = () => {
    return (
        <React.Fragment>
            <Row>
                {(chartsData || [])?.map((item: ChartData, key: number) => (
                    <Col lg={3} key={key}>
                        <Card className="mini-stats-wid">
                            <CardBody>
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <p className="text-muted fw-medium">{item.title}</p>
                                        <h4 className="mb-0">{item.price}</h4>
                                    </div>

                                    <div className="flex-shrink-0 align-self-center">
                                        <JobWidgetCharts dataColors={item.color} series={item.seriesData} dir="ltr" />
                                    </div>
                                </div>
                            </CardBody>
                            {item.istrendingArrow ? <CardBody className="border-top py-3">
                                <p className="mb-0"> <span className={"badge badge-soft-" + item.badgeColor + " me-2"}>
                                    <i className="bx bx-trending-down align-bottom me-1"></i> {item.perstangeValue}%</span>
                                    Decrease last month</p>
                            </CardBody>
                                :
                                <CardBody className="border-top py-3">
                                    <p className="mb-0"> <span className={"badge badge-soft-" + item.badgeColor + " me-2"}>
                                        <i className="bx bx-trending-up align-bottom me-1"></i> {item.perstangeValue}%</span>
                                        Increase last month</p>
                                </CardBody>
                            }

                        </Card>
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    );
}

export default ChartSection;
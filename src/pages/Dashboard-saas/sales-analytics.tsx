import React from "react";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../Components/Common/ChartDynamicColor";

interface ChartOptions {
  labels: string[];
  colors: string[];
  legend: {
    show: boolean;
  };
  plotOptions: {
    pie: {
      donut: {
        size: string;
      };
    };
  };
}

const SalesAnalytics = ({ dataColors }: any) => {
  const apexSalesAnalyticsChartColors = getChartColorsArray(dataColors);
  const series: number[] = [56, 38, 26];

  const options: ChartOptions = {
    labels: ["Series A", "Series B", "Series C"],
    colors: apexSalesAnalyticsChartColors,
    legend: { show: !1 },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
  };

  return (
    <React.Fragment>
      <Col xl={4}>
        <Card>
          <CardBody>
            <CardTitle tag="h4" className="mb-4">Sales Analytics</CardTitle>
            <div>
              <div id="donut-chart">
                <ReactApexChart options={options} series={series} type="donut" height={260} className="apex-charts" />
              </div>
            </div>

            <div className="text-center text-muted">
              <Row>
                <Col xs={4}>
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-primary me-1" /> Product A
                    </p>
                    <h5>$ 2,132</h5>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-success me-1" /> Product B
                    </p>
                    <h5>$ 1,763</h5>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-danger me-1" /> Product C
                    </p>
                    <h5>$ 973</h5>
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default SalesAnalytics;

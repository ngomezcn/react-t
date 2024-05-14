import React from "react";

// import apexChart
import LineApexChart from "../Allcharts/apex/chartapex"
import DashedLine from "../Allcharts/apex/dashedLine"
import SplineArea from "../Allcharts/apex/SplineArea"
import Apaexlinecolumn from "../Allcharts/apex/apaexlinecolumn"
import ColumnWithDataLabels from "../Allcharts/apex/ColumnWithDataLabels"
import BarChart from "../Allcharts/apex/barchart"
import LineColumnArea from "../Allcharts/apex/LineColumnArea"
import RadialChart from "../Allcharts/apex/RadialChart"
import PieChart from "../Allcharts/apex/PieChart"
import DonutChart from "../Allcharts/apex/dountchart"


import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

const Apexchart = () => {

  //meta title
  document.title = "Apex Charts | Skote - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Charts" breadcrumbItem="Apex Charts" />

          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-4">Line with Data Labels</CardTitle>
                  <LineApexChart dataColors='["--bs-primary", "--bs-success"]' />
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-4">Dashed Line</CardTitle>
                  <DashedLine dataColors='["--bs-primary", "--bs-danger", "--bs-success"]' />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-4"> Spline Area </CardTitle>
                  <SplineArea dataColors='["--bs-primary", "--bs-success"]' />
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-4"> Column Chart </CardTitle>
                  <Apaexlinecolumn dataColors='["--bs-danger","--bs-primary", "--bs-success"]' />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-4">
                    Column with Data Labels{" "}
                  </CardTitle>
                  <ColumnWithDataLabels dataColors='["--bs-primary"]' />
                </CardBody>
              </Card>
            </Col>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-4">Bar Chart</CardTitle>
                  <BarChart dataColors='["--bs-success"]' />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-4">
                    Line, Column & Area Chart{" "}
                  </CardTitle>
                  <LineColumnArea dataColors='["--bs-danger","--bs-primary", "--bs-success"]' />
                </CardBody>
              </Card>
            </Col>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-4">Radial Chart</CardTitle>
                  <RadialChart dataColors='["--bs-primary","--bs-success", "--bs-danger", "--bs-warning"]' />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-4">Pie Chart </CardTitle>
                  <PieChart dataColors='["--bs-success","--bs-primary", "--bs-danger","--bs-info", "--bs-warning"]' />
                </CardBody>
              </Card>
            </Col>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-4">Donut Chart</CardTitle>
                  <DonutChart dataColors='["--bs-success","--bs-primary", "--bs-danger","--bs-info", "--bs-warning"]' />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Apexchart

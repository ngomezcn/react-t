import React from 'react'
import { Col, Container, Row } from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

// Components
import CardUser from './card-user';
import CardWelcome from './card-welcome';
import ChatBox from './chatBox';
import MiniWidget from './mini-widgets';
import SalesAnalytics from './sales-analytics';
import Tasks from './tasks';
import Earning from "./earning";
import TotalSellingProduct from "./total-selling-product"

const DashboardSaas: React.FC = () => {

  //Meta Title  
  document.title = "Saas Dashboard | Skote - React Admin & Dashboard Template"

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Dashboards" breadcrumbItem="Saas" />
          <CardUser />

          <Row>

            <CardWelcome />

            <Col xl={8}>
              <Row>
                <MiniWidget />
              </Row>
            </Col>
          </Row>
          <Row>
            <Earning dataColors='["--bs-primary"]' />

            <SalesAnalytics dataColors='["--bs-primary", "--bs-success", "--bs-danger"]' />
          </Row>

          <Row>
            <TotalSellingProduct />

            <Tasks />

            <ChatBox />
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

export default DashboardSaas;

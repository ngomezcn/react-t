import React from 'react'
import { Col, Container, Row } from 'reactstrap'

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

// Components
import BuySell from './buy-sell';
import CardUser from './card-user';
import CardWelcome from './card-welcome';
import MiniWidget from './mini-widgets';
import Notifications from './notifications';
import Overview from './overview';
import Transactions from './transaction';
import WalletBalance from './Wallet-balance';

const DashboardCrypto: React.FC = () => {

  //meta title
  document.title = "Crypto Dashboard | Skote - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Dashboards" breadcrumbItem="Crypto" />

          <Row>
            <CardUser />
            <Col xl={8}>
              <CardWelcome />

              <Row>
                <MiniWidget />
              </Row>
            </Col>
          </Row>

          <Row>
            <WalletBalance dataColors='["--bs-primary", "--bs-warning", "--bs-info"]' />
            <Overview dataColors='["--bs-warning"]' />
          </Row>

          <Row>
            <Transactions />

            <Notifications />

            <BuySell />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default DashboardCrypto

import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import classnames from "classnames";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import { CryptoSell, CrytoBuy } from "./CryptoWallet/CryptoBuySell";

const CryptoBuySell = () => {

  //meta title
  document.title = "Buy/Sell | Skote - React Admin & Dashboard Template";

  const [activeTab, setActiveTab] = useState<any>("1");
  const [isMenu, setIsMenu] = useState<boolean>(false);

  const toggleTab = (tab: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const toggleMenu = () => setIsMenu(!isMenu);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Crypto" breadcrumbItem="Buy/Sell" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="float-end">
                    <Dropdown
                      isOpen={isMenu}
                      toggle={toggleMenu}
                    >
                      <DropdownToggle
                        type="button"
                        tag="button"
                        className={`btn btn-light ${isMenu ? 'show' : ''}`}
                      >
                        <i className="mdi mdi-wallet me-2" />
                        <span className="d-none d-sm-inline-block">
                          Wallet Balance <i className="mdi mdi-chevron-down" />
                        </span>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end dropdown-menu-md">
                        <div className="dropdown-item-text">
                          <div>
                            <p className="text-muted mb-2">Available Balance</p>
                            <h5 className="mb-0">$ 9148.23</h5>
                          </div>
                        </div>

                        <DropdownItem divider />

                        <DropdownItem href="#">
                          BTC : <span className="float-end">1.02356</span>
                        </DropdownItem>
                        <DropdownItem href="#">
                          ETH : <span className="float-end">0.04121</span>
                        </DropdownItem>
                        <DropdownItem href="#">
                          LTC : <span className="float-end">0.00356</span>
                        </DropdownItem>

                        <DropdownItem divider />

                        <DropdownItem
                          className="text-primary text-center"
                          href="#"
                        >
                          Learn more
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <h4 className="card-title mb-4">Buy/Sell Crypto</h4>
                  <div className="crypto-buy-sell-nav">
                    <Nav tabs className="nav-tabs-custom" role="tablist">
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "1",
                          })}
                          onClick={() => {
                            toggleTab("1");
                          }}
                        >
                          Buy
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "2",
                          })}
                          onClick={() => {
                            toggleTab("2");
                          }}
                        >
                          Sell
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <TabContent
                      activeTab={activeTab}
                      className="crypto-buy-sell-nav-content p-4"
                    >
                      <TabPane tabId="1" id="buy">
                        <CrytoBuy />
                      </TabPane>

                      <TabPane tabId="2" id="sell">
                        <CryptoSell />
                      </TabPane>
                    </TabContent>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CryptoBuySell;

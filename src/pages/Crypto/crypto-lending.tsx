import React, { useState } from "react";
import { Container, Row, Col, Card, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardBody, Table } from "reactstrap";
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import { cryptoDeposits, cryptoHowitwork, cryptoMyAssets } from "common/data";

interface cryptoHowitworkType {
  id: number,
  title: string,
  icon: string,
  description: string
}
interface cryptoDepositsTYpe {
  id: number,
  name: string,
  symbol: string,
  annualYield: string,
  amount: string,
  color: string,
  icon: string
}
interface cryptoMyAssetsType {
  id: number,
  icon: string,
  color: string,
  title: string,
  investRate: string,
  investPrice: string,
  price: string,
  loansRate: string,
  loansPrice: string,
  totalRate: string,
  totalPrice: string,
}
const CryptoLending = () => {

  //meta title
  document.title = "Lending | Skote - React Admin & Dashboard Template";

  const [isMenu, setIsMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Crypto" breadcrumbItem="Lending" />

          <Row>
            <Col xl="4">
              <Card>
                <CardBody className="border-bottom">
                  <Dropdown
                    isOpen={isMenu}
                    toggle={toggleMenu}
                    className="float-end ms-2"
                  >
                    <DropdownToggle tag="a" className="text-muted">
                      <i className="mdi mdi-dots-horizontal font-size-18" />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href="#">Action</DropdownItem>
                      <DropdownItem href="#">Another action</DropdownItem>
                      <DropdownItem href="#">Something else</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  <div>
                    <div className="mb-4 me-3">
                      <i className="mdi mdi-account-circle text-primary h1" />
                    </div>

                    <div>
                      <h5 >Henry Wells</h5>
                      <p className="text-muted mb-1">henrywells@abc.com</p>
                      <p className="text-muted mb-0">Id no: #SK0234</p>
                    </div>
                  </div>
                </CardBody>
                <CardBody className="border-bottom">
                  <div>
                    <Row>
                      <Col sm="6">
                        <div>
                          <p className="text-muted mb-2">Available Balance</p>
                          <h5>$ 9148.00</h5>
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="text-sm-end mt-4 mt-sm-0">
                          <p className="text-muted mb-2">Since last month</p>
                          <h5>
                            + $ 215.53{" "}
                            <span className="badge bg-success ms-1 align-bottom">
                              + 1.3 %
                            </span>
                          </h5>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">How it work</h4>

                  <div>
                    <ul className="verti-timeline list-unstyled">
                      {
                        (cryptoHowitwork || []).map((item: cryptoHowitworkType, index: number) => (
                          <li className="event-list" key={index}>
                            <div className="event-timeline-dot">
                              <i className="bx bx-right-arrow-circle" />
                            </div>
                            <div className="d-flex">
                              <div className="flex-shrink-0 me-3">
                                <i className={`${item.icon} h2 text-primary`} />
                              </div>
                              <div className="flex-grow-1">
                                <div>
                                  <h5 className="font-size-14">{item.title}</h5>
                                  <p className="text-muted">{item.description}</p>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl="8">
              <Card>
                <CardBody>
                  <h4 className="card-title">Deposits</h4>

                  <Row>
                    {
                      (cryptoDeposits || []).map((item: cryptoDepositsTYpe, index: number) => (
                        <Col lg="4" key={index}>
                          <div className="border p-3 rounded mt-4">
                            <div className="d-flex align-items-center mb-3">
                              <div className="avatar-xs me-3">
                                <span className={`avatar-title rounded-circle bg-${item.color}-subtle text-${item.color} font-size-18`}>
                                  <i className={item.icon} />
                                </span>
                              </div>
                              <h5 className="font-size-14 mb-0">{item.name}</h5>
                            </div>

                            <Row>
                              <div className="col-lg-6">
                                <div className="text-muted mt-3">
                                  <p>Annual Yield</p>
                                  <h4>{item.annualYield}</h4>
                                  <p className="mb-0">{item.amount}</p>
                                </div>
                              </div>

                              <div className="col-lg-6 align-self-end">
                                <div className="float-end mt-3">
                                  <Link to="#" className="btn btn-primary">
                                    Select
                                  </Link>
                                </div>
                              </div>
                            </Row>
                          </div>
                        </Col>
                      ))
                    }
                  </Row>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">My Assets</h4>

                  <div className="table-responsive">
                    <Table className="table table-nowrap align-middle mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Token</th>
                          <th scope="col">Price</th>
                          <th scope="col">Invest</th>
                          <th scope="col">Loans</th>
                          <th scope="col" colSpan={2}>
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(cryptoMyAssets || []).map((asset: cryptoMyAssetsType, key: number) => (
                          <tr key={key}>
                            <th scope="row">
                              <div className="d-flex align-items-center">
                                <div className="avatar-xs me-3">
                                  <span
                                    className={
                                      "avatar-title rounded-circle bg-" +
                                      asset.color +
                                      "-subtle text-" +
                                      asset.color +
                                      " font-size-18"
                                    }
                                  >
                                    <i className={asset.icon} />
                                  </span>
                                </div>
                                <span>{asset.title}</span>
                              </div>
                            </th>
                            <td>
                              <div className="text-muted">$ {asset.price}</div>
                            </td>
                            <td>
                              <h5 className="font-size-14 mb-1">
                                {asset.investRate}
                              </h5>
                              <div className="text-muted">
                                ${asset.investPrice}
                              </div>
                            </td>
                            <td>
                              <h5 className="font-size-14 mb-1">
                                {asset.loansRate}
                              </h5>
                              <div className="text-muted">
                                ${asset.loansPrice}
                              </div>
                            </td>
                            <td>
                              <h5 className="font-size-14 mb-1">
                                {asset.totalRate}
                              </h5>
                              <div className="text-muted">
                                ${asset.totalPrice}
                              </div>
                            </td>
                            <td style={{ width: "120px" }}>
                              <Link
                                to="#"
                                className="btn btn-primary btn-sm w-xs"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
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

export default CryptoLending;

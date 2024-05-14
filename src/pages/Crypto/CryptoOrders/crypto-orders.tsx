import React, { useState, useMemo, useEffect } from "react";
import { Button, Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Label, NavItem, NavLink, Row, TabContent, TabPane, Nav } from "reactstrap";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import withRouter from "../../../Components/Common/withRouter";

import { Pdate, Type, Value, ValueinUSD, Status, Coin } from "./CryptoCol";

import TableContainer from "../../../Components/Common/TableContainer";

//Date Picker
import Flatpickr from "react-flatpickr";
import "react-datepicker/dist/react-datepicker.css";
import "assets/scss/datatables.scss";
//Import Breadcrumb
import Breadcrumbs from "../../../Components/Common/Breadcrumb";
import { getCryptoOrderList as onGetCryptoOrderList } from "slices/thunk";
import { createSelector } from 'reselect';
import Spinners from "Components/Common/Spinner";
import { handleSearchData } from "Components/Common/SearchFile";

const CryptoOrders = () => {

  //meta title
  document.title = "Orders | Skote - React Admin & Dashboard Template";

  const [activeTab, setActiveTab] = useState<any>("1");
  const dispatch = useDispatch<any>();

  const selectProperties = createSelector(
    (state: any) => state.crypto,
    (crypto) => ({
      cryptoOrder: crypto.cryptoOrders,
      loading: crypto.loading
    })
  );

  const { cryptoOrder, loading } = useSelector(selectProperties);
  const [isLoading, setLoading] = useState<boolean>(loading)

  const [order, setOrder] = useState<any>();

  // search 
  const handleSelect = (ele: any) => {
    let search = ele.target.value;
    if (search === "All") {
      setOrder(cryptoOrder)
    } else {
      handleSearchData({ setState: setOrder, data: cryptoOrder, item: search })
    }
  };

  const toggleTab = (tab: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    dispatch(onGetCryptoOrderList())
  }, [dispatch]);

  useEffect(() => {
    setOrder(cryptoOrder)
  }, [cryptoOrder])

  // Table Data
  const columns: any = useMemo(
    () => [
      {
        header: "Date",
        accessorKey: "pdate",
        enableColumnFilter: false,
        enableSorting: true,
        Cell: (cellProps: any) => {
          return <Pdate {...cellProps} />;
        },
      },
      {
        header: "Type",
        accessorKey: "type",
        enableColumnFilter: false,
        enableSorting: true,
        Cell: (cellProps: any) => {
          return <Type {...cellProps} />;
        },
      },
      {
        header: "Coin",
        accessorKey: "coin",
        enableColumnFilter: false,
        enableSorting: true,
        Cell: (cellProps: any) => {
          return <Coin {...cellProps} />;
        },
      },
      {
        header: "Value",
        accessorKey: "value",
        enableColumnFilter: false,
        enableSorting: true,
        Cell: (cellProps: any) => {
          return <Value {...cellProps} />;
        },
      },
      {
        header: "Value in USD",
        accessorKey: "valueInUsd",
        enableColumnFilter: false,
        enableSorting: true,
        Cell: (cellProps: any) => {
          return <ValueinUSD {...cellProps} />;
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        enableSorting: true,
        Cell: (cellProps: any) => {
          return <Status {...cellProps} />;
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Crypto" breadcrumbItem="Orders" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-3">Orders</CardTitle>
                  {
                    isLoading ? <Spinners setLoading={setLoading} />
                      :
                      <>
                        <Nav tabs className="nav-tabs-custom" role="tablist">
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "1",
                              })}
                              onClick={() => {
                                toggleTab("1");
                              }}
                            > All Orders</NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "2",
                              })}
                              onClick={() => {
                                toggleTab("2");
                              }}
                            > Processing</NavLink>
                          </NavItem>
                        </Nav>

                        <TabContent activeTab={activeTab} className="p-3">
                          <TabPane tabId="1" id="all-order">
                            <Form>
                              <Row className="mb-4">
                                <Col sm={6} className="col-xl">
                                  <FormGroup className="mb-3">
                                    <Label>Date :</Label>
                                    <Flatpickr
                                      className="form-control"
                                      id="customerdate"
                                      name="customerdate"
                                      placeholder="Select date"
                                      options={{
                                        mode: "single",
                                        dateFormat: 'd M, Y',
                                      }}
                                    />
                                  </FormGroup>
                                </Col>

                                <Col sm={6} className="col-xl">
                                  <FormGroup className="mb-3">
                                    <Label>Coin</Label>
                                    <select className="form-control select2-search-disable" onChange={(e: any) => handleSelect(e)}>
                                      <option defaultValue="all">All </option>
                                      <option defaultValue="Bitcoin" > Bitcoin </option>
                                      <option value="Ethereum">Ethereum</option>
                                      <option value="Litecoin">litecoin</option>
                                    </select>
                                  </FormGroup>
                                </Col>

                                <Col sm={6} className="col-xl">
                                  <FormGroup className="mb-3">
                                    <Label>Type</Label>
                                    <select className="form-control select2-search-disable" onChange={(e: any) => handleSelect(e)}>
                                      <option defaultValue="all">All </option>
                                      <option defaultValue="Buy">Buy</option>
                                      <option value="Sell">Sell</option>
                                    </select>
                                  </FormGroup>
                                </Col>

                                <Col sm={6} className="col-xl">
                                  <FormGroup className="mb-3">
                                    <Label>Status</Label>
                                    <select className="form-control select2-search-disable" onChange={(e: any) => handleSelect(e)}>
                                      <option defaultValue="Completed">Completed </option>
                                      <option value="Pending">Pending</option>
                                    </select>
                                  </FormGroup>
                                </Col>

                                <Col sm={6} className="col-xl align-self-end">
                                  <div className="mb-3">
                                    <Button type="button" color="primary" className="w-md" > Filter</Button>
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                            <TableContainer
                              columns={columns}
                              data={order || []}
                              isCustomPageSize={true}
                              isPagination={true}
                              isGlobalFilter={true}
                              SearchPlaceholder="24 record.."
                              paginationWrapper="dataTables_paginate paging_simple_numbers"
                              pagination="pagination"
                              tableClass="table-hover datatable dt-responsive nowrap dataTable no-footer dtr-inline"
                            />
                          </TabPane>
                          <TabPane tabId="2" id="processing">
                            <div>
                              <TableContainer
                                columns={columns}
                                data={order || []}
                                isCustomPageSize={true}
                                isPagination={true}
                                isGlobalFilter={true}
                                pagination="pagination"
                                SearchPlaceholder="24 record.."
                                paginationWrapper="dataTables_paginate paging_simple_numbers"
                                tableClass="table-hover datatable dt-responsive nowrap dataTable no-footer dtr-inline"
                              />
                            </div>
                          </TabPane>
                        </TabContent>
                      </>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};


export default (withRouter(CryptoOrders));

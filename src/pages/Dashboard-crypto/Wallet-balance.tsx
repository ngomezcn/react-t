import React, { useEffect } from "react"
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"
import ReactApexChart from "react-apexcharts"

import getChartColorsArray from "../../Components/Common/ChartDynamicColor";
import { getWalletBalance as onGetWalletBalance } from "slices/thunk";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { DashboardCryptoData, WalletOptions } from "./type";

interface chartState {
  dashboard: {
    dashboardCrypto: DashboardCryptoData[]
  }
}

const WalletBalance = ({ dataColors }: any) => {

  const walletBalanceChartColors = getChartColorsArray(dataColors);
  const dispatch = useDispatch<any>()

  const selectChart = createSelector(
    (state: chartState) => state.dashboard,
    (dashboard) => ({
      dashboardCrypto: dashboard.dashboardCrypto
    })
  )

  const { dashboardCrypto }: any = useSelector(selectChart);
  const cryptoChartData: DashboardCryptoData = dashboardCrypto[0];

  const series = cryptoChartData?.series || [];
  const availablebalance = cryptoChartData?.availablebalance;
  const income = cryptoChartData?.income;
  const expense = cryptoChartData?.Expense;
  const ethereum = cryptoChartData?.Ethereum;
  const bitcoin = cryptoChartData?.Bitcoin;
  const litecoin = cryptoChartData?.Litecoin;

  useEffect(() => {
    dispatch(onGetWalletBalance("1"))
  }, [dispatch])


  const handleChangesearies = (ele: any) => {
    dispatch(onGetWalletBalance(ele.value))
  }

  const walletOptions: WalletOptions | any = {
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "35%",
          background: "transparent",
          image: void 0,
        },
        track: {
          show: !0,
          startAngle: void 0,
          endAngle: void 0,
          background: "#f2f2f2",
          strokeWidth: "97%",
          opacity: 1,
          margin: 12,
          dropShadow: {
            enabled: !1,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5,
          },
        },
        dataLabels: {
          name: {
            show: !0,
            fontSize: "16px",
            fontWeight: 600,
            offsetY: -10,
          },
          value: {
            show: !0,
            fontSize: "14px",
            offsetY: 4,
            formatter: function (e: any) {
              return e + "%"
            },
          },
          total: {
            show: !0,
            label: "Total",
            color: "#373d3f",
            fontSize: "16px",
            fontFamily: void 0,
            fontWeight: 600,
            formatter: function (e: any) {
              return (
                e.globals.seriesTotals.reduce(function (e: any, t: any) {
                  return e + t
                }, 0) + "%"
              )
            },
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    colors: walletBalanceChartColors,
    labels: ["Ethereum", "Bitcoin", "Ethereum"],
    legend: { show: !1 },
  }

  return (
    <React.Fragment>
      <Col xl={8}>
        <Card>
          <CardBody>
            <div className="float-end">
              <select defaultValue="MA" className="form-select form-select-sm ms-2" onChange={(e: any) => handleChangesearies(e.target)}>
                <option value="1">March</option>
                <option value="2">February</option>
                <option value="3">January</option>
                <option value="4">December</option>
              </select>
            </div>
            <CardTitle tag="h4" className="mb-3">Wallet Balance</CardTitle>

            <Row>
              <Col lg={4}>
                <div className="mt-4">
                  <p>Available Balance</p>
                  <h4>$ {availablebalance}</h4>

                  <p className="text-muted mb-4">
                    + 0.0012.23 ( 0.2 % ) <i className="mdi mdi-arrow-up ms-1 text-success" />
                  </p>

                  <Row>
                    <Col xs={6}>
                      <div>
                        <p className="mb-2">Income</p>
                        <h5>$ {income}</h5>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div>
                        <p className="mb-2">Expense</p>
                        <h5>$ {expense}</h5>
                      </div>
                    </Col>
                  </Row>

                  <div className="mt-4">
                    <Link to="#" className="btn btn-primary btn-sm">
                      View more <i className="mdi mdi-arrow-right ms-1" />
                    </Link>
                  </div>
                </div>
              </Col>

              <Col lg={4} sm={6}>
                <div>
                  <div id="wallet-balance-chart">
                    <ReactApexChart options={walletOptions} series={series} type="radialBar" height={300} className="apex-charts" />
                  </div>
                </div>
              </Col>

              <Col lg={4} sm={6} className="align-self-center">
                <div>
                  <p className="mb-2">
                    <i className="mdi mdi-circle align-middle font-size-10 me-2 text-primary" /> Ethereum
                  </p>
                  <h5>
                    {ethereum ? ethereum['ETH'] : ''} ETH =
                    <span className="text-muted font-size-14">$ {ethereum ? ethereum['Dollar'] : ''}</span>
                  </h5>
                </div>

                <div className="mt-4 pt-2">
                  <p className="mb-2">
                    <i className="mdi mdi-circle align-middle font-size-10 me-2 text-warning" /> Bitcoin
                  </p>
                  <h5>
                    {bitcoin ? bitcoin['BTC'] : ''} BTC =
                    <span className="text-muted font-size-14">$ {bitcoin ? bitcoin['Dollar'] : ''}</span>
                  </h5>
                </div>

                <div className="mt-4 pt-2">
                  <p className="mb-2">
                    <i className="mdi mdi-circle align-middle font-size-10 me-2 text-info" /> Litecoin
                  </p>
                  <h5>
                    {litecoin ? litecoin['LTC'] : ''} LTC =
                    <span className="text-muted font-size-14">$ {litecoin ? litecoin['Dollar'] : ''}</span>
                  </h5>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default WalletBalance;

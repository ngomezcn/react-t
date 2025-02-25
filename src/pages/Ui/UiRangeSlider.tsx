import React, { useState } from "react";
import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

import Slider from "react-rangeslider"
import "react-rangeslider/lib/index.css"

const UiRangeSlider = () => {

  //meta title
  document.title = "Range Slider | Mercantec - Quiz Project";

  const formatkg = (value: any) => "$ " + value
  const formatdollar = (value: any) => value + " kg"
  const extra_age = (value: any) => value + " Age"

  const [def, setdef] = useState(15)
  const [min_max, setmin_max] = useState(70)
  const [step, setstep] = useState(25)
  const [prefix, setprefix] = useState(50)
  const [postfix, setpostfix] = useState(85)
  const [custom_val, setcustom_val] = useState(5)
  const [float_val, setfloat_val] = useState(55.5)
  const [extra, setextra] = useState(52)
  const [hide, sethide] = useState(5)

  const labels = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="UI Elements" breadcrumbItem="Range Slider" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle>React Rangeslider</CardTitle>
                  <p className="card-title-desc">Cool, comfortable, responsive and easily customizable range slider</p>
                  <Row>
                    <Col xl={6}>
                      <div className="p-3">
                        <h5 className="font-size-14 mb-3 mt-0">Default</h5>
                        <span className="float-left mt-4">0</span>{" "}
                        <span className="float-right mt-4">100</span>
                        <Slider
                          value={def}
                          orientation="horizontal"
                          onChange={(value: any) => {
                            setdef(value)
                          }}
                        />
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div className="p-3">
                        <h5 className="font-size-14 mb-3 mt-0">Min-Max</h5>
                        <span className="float-start mt-4">30</span>{" "}
                        <span className="float-end mt-4">90</span>
                        <Slider
                          value={min_max}
                          min={30}
                          max={90}
                          orientation="horizontal"
                          onChange={(value: any) => {
                            setmin_max(value)
                          }}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col xl={6}>
                      <div className="p-3">
                        <h5 className="font-size-14 mb-3 mt-0">Prefix</h5>
                        <span className="float-start mt-4">0</span>{" "}
                        <span className="float-end mt-4">100</span>
                        <Slider
                          min={0}
                          max={100}
                          format={formatkg}
                          value={prefix}
                          onChange={(value: any) => {
                            setprefix(value)
                          }}
                        />
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div className="p-3">
                        <h5 className="font-size-14 mb-3 mt-0">Postfixes</h5>
                        <span className="float-start mt-4">0</span>{" "}
                        <span className="float-end  mt-4">100</span>
                        <Slider
                          min={0}
                          max={100}
                          format={formatdollar}
                          value={postfix}
                          onChange={(value: any) => {
                            setpostfix(value)
                          }}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col xl={6}>
                      <div className="p-3">
                        <h5 className="font-size-14 mb-3 mt-0">Step</h5>
                        <span className="float-start mt-4">0</span>{" "}
                        <span className="float-end mt-4">100</span>
                        <Slider
                          value={step}
                          step={10}
                          orientation="horizontal"
                          onChange={(value: any) => {
                            setstep(value)
                          }}
                        />
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div className="p-3">
                        <h5 className="font-size-14 mb-3 mt-0">
                          Custom Values
                        </h5>
                        <Slider
                          value={custom_val}
                          min={1}
                          max={12}
                          labels={labels}
                          orientation="horizontal"
                          onChange={(value: any) => {
                            setcustom_val(value)
                          }}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col xl={6}>
                      <div className="p-3">
                        <h5 className="font-size-14 mb-3 mt-0">Reverse</h5>
                        <span className="float-start mt-4">100</span>{" "}
                        <span className="float-end mt-4">0</span>
                        <Slider
                          min={0}
                          max={100}
                          value={hide}
                          reverse={true}
                          onChange={(value: any) => {
                            sethide(value)
                          }}
                        />
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div className="p-3">
                        <h5 className="font-size-14 mb-3 mt-0">
                          Extra Example
                        </h5>
                        <span className="float-start mt-4">0</span>{" "}
                        <span className="float-end mt-4">100</span>
                        <Slider
                          min={0}
                          max={100}
                          format={extra_age}
                          value={extra}
                          onChange={(value: any) => {
                            setextra(value)
                          }}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col xl={6}>
                      <div className="p-3">
                        <h5 className="font-size-14 mb-3 mt-0">
                          Prettify Numbers
                        </h5>
                        <span className="float-start mt-4">1</span>{" "}
                        <span className="float-end mt-4">100</span>
                        <Slider
                          value={float_val}
                          step={0.5}
                          orientation="horizontal"
                          onChange={(value: any) => {
                            setfloat_val(value)
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default UiRangeSlider

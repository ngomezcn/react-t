import React from "react"
import {
  Row,
  Col,
  Form,
  Label,
  Card,
  CardBody,
  CardTitle,
  Container
} from "reactstrap"

import Breadcrumbs from "../../Components/Common/Breadcrumb";

// Form Mask
import InputMask from "react-input-mask"

const FormMask = () => {
  //meta title
  document.title = "Form Mask | Mercantec - Quiz Project"

  const Repeat = (props:any) => (
    <InputMask
      mask="9999999999"
      value={props.value}
      className="form-control input-color"
      onChange={props.onChange}
    >     
    </InputMask>
  )


  const IPV4 = (props:any) => (
    <InputMask
      mask="999.999.999.999"
      value={props.value}
      className="form-control input-color"
      onChange={props.onChange}
    >
         </InputMask>
  )
  const TAX = (props:any) => (
    <InputMask
      mask="99-9999999"
      value={props.value}
      className="form-control input-color"
      onChange={props.onChange}
    >    
    </InputMask>
  )

  const Phone = (props:any) => (
    <InputMask
      mask="(999) 999-9999"
      value={props.value}
      className="form-control input-color"
      onChange={props.onChange}
    >     
    </InputMask>
  )

  const Currency = (props:any) => (
    <InputMask
      mask="$ 999,999,999.00"
      value={props.value}
      className="form-control input-color"
      onChange={props.onChange}
    >      
    </InputMask>
  )

  const Date1 = (props:any) => (
    <InputMask
      mask="99/99/9999"
      value={props.value}
      className="form-control input-color"
      onChange={props.onChange}
    >     
    </InputMask>
  )

  const Date2 = (props:any) => (
    <InputMask
      mask="99-99-9999"
      value={props.value}
      className="form-control input-color"
      onChange={props.onChange}
    >     
    </InputMask>
  )

  const Date3 = (props:any) => (
    <InputMask
      mask="9999-99-99 99:99:99"
      value={props.value}
      className="form-control input-color"
      onChange={props.onChange}
    >     
    </InputMask>
  )

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Form Mask" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Example</CardTitle>
                  <Form>
                    <Row>
                      <Col lg={6}>
                        <div>
                          <div className="form-group mb-4">
                            <Label for="input-date1">Date Style 1</Label>
                            <Date1 />
                            <span className="text-muted">e.g "dd/mm/yyyy"</span>
                          </div>
                          <div className="form-group mb-4">
                            <Label for="input-date2">Date Style 2</Label>
                            <Date2 />
                            <span className="text-muted">e.g "mm/dd/yyyy"</span>
                          </div>
                          <div className="form-group mb-4">
                            <Label for="input-datetime">Date time</Label>
                            <Date3 />
                            <span className="text-muted">e.g "yyyy-mm-dd'T'HH:MM:ss"</span>
                          </div>
                          <div className="form-group mb-0">
                            <Label for="input-currency">Currency:</Label>
                            <Currency />
                            <span className="text-muted">e.g "$ 0.00"</span>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mt-4 mt-lg-0">
                          <div className="form-group mb-4">
                            <Label for="input-repeat">repeat:</Label>
                            <Repeat />
                            <span className="text-muted">e.g "9999999999"</span>
                          </div>
                          <div className="form-group mb-4">
                            <Label for="input-mask">Mask</Label>
                            <TAX />
                            <span className="text-muted">e.g "99-9999999"</span>
                          </div>
                          <div className="form-group mb-4">
                            <Label for="input-ip">IP address</Label>
                            <IPV4 />
                            <span className="text-muted">e.g "99.99.99.99"</span>

                          </div>
                          <div className="form-group mb-0">
                            <Label for="input-email">Email address:</Label>
                            <Phone />
                            <span className="text-muted">_@_._</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default FormMask

import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "reactstrap"
import { Link } from "react-router-dom"
import withRouter from "../../Components/Common/withRouter";

//redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

//Import Card invoice
import CardInvoice from "./card-invoice"

import { getInvoices as onGetInvoices } from "../../slices/invoices/thunk"
import { createSelector } from "reselect";
import Spinners from "Components/Common/Spinner";

const InvoicesList = () => {
  //meta title
  document.title = "Invoice List | Skote - React Admin & Dashboard Template";

  const dispatch = useDispatch<any>();

  const selectInvoiceData = createSelector(
    (state: any) => state.invoices,
    (invoices) => ({
      invoices: invoices.invoices,
      loading: invoices.loading
    })
  );

  const { invoices, loading }: any = useSelector(selectInvoiceData);
  const [isLoading, setLoading] = useState<boolean>(loading);

  useEffect(() => {
    dispatch(onGetInvoices())
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Invoices" breadcrumbItem="Invoice List" />
          {
            isLoading ? <Spinners setLoading={setLoading} />
              :
              <Row>
                {(invoices || [])?.map((invoice: any, key: number) => (
                  <CardInvoice data={invoice} key={"_invoice_" + key} />
                ))}
              </Row>
          }
          <Row>
            <Col xs={12}>
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                  Load more
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(InvoicesList)

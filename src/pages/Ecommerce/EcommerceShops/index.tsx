import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Col, Container, Row } from "reactstrap"

import Spinners from "Components/Common/Spinner"

import { EComShop, EcoAction } from "../type"

//Import Breadcrumb
import Breadcrumbs from "../../../Components/Common/Breadcrumb"

//Import Card
import CardShop from "./CardShop"
import { getShops as onGetShops } from "../../../slices/e-commerence/thunk"

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';

const EcommerceShops = () => {

  //meta title
  document.title = "Shops | Skote - React Admin & Dashboard Template";

  const dispatch: any = useDispatch()

  const selectProperties = createSelector(
    (state: EcoAction) => state.ecommerce,
    (ecommerce) => ({
      shops: ecommerce.shops,
      loading: ecommerce.loading
    })
  );

  const { shops, loading } = useSelector(selectProperties)
  const [isLoading, setLoading] = useState(loading)

  useEffect(() => {
    dispatch(onGetShops())
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Shops" />
          {
            isLoading ? <Spinners setLoading={setLoading} />
              :
              <>
                <Row>
                  {(shops || [])?.map((shop: EComShop, key: number) => (
                    <CardShop shop={shop} key={"_shop_" + key} />
                  ))}
                </Row>
                <Row>
                  <Col xs="12">
                    <div className="text-center my-3">
                      <Link to="#" className="text-success">
                        <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                        Load more
                      </Link>
                    </div>
                  </Col>
                </Row>
              </>
          }
        </Container>
      </div>
    </React.Fragment>
  )
}

export default EcommerceShops;

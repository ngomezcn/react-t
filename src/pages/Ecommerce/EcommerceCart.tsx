import React, { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Input,
  CardTitle,
  InputGroup,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from 'reselect';

// import { productListvar } from "../../common/data";
import { deleteCart as onDeleteCart, getCart as onGetCart } from "slices/thunk";

const EcommerceCart = () => {

  //meta title
  document.title = "Cart | Mercantec - Quiz Project";

  const selectProperties = createSelector(
    (state: any) => state.ecommerce,
    (ecommerce) => ({
      cart: ecommerce.cart
    })
  );

  const { cart } = useSelector(selectProperties);

  const dispatch = useDispatch<any>();
  const [productList, setproductList] = useState<any>();
  const [dic, setDic] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [charge, setCharge] = useState<number>(0);

  const assigned = (productList || [])?.map((item: any) => item.total);
  let subTotal = 0;
  for (let i = 0; i < assigned.length; i++) {
    subTotal += Math.round(assigned[i]);
  }

  useEffect(() => {
    let dic = (0.15 * subTotal);
    let tax = (0.125 * subTotal);
    if (subTotal !== 0) {
      setCharge(65)
    } else {
      setCharge(0)
    }
    setDic(dic);
    setTax(tax);

  }, [subTotal])


  function removeCartItem(id: any) {
    dispatch(onDeleteCart(id))
  }

  function countUP(id: any, prev_data_attr: any, price: any) {
    setproductList(
      (productList || [])?.map((count: any) => {
        return count.id === id ? { ...count, data_attr: prev_data_attr + 1, total: (prev_data_attr + 1) * price } : count
      })
    );
  }

  function countDown(id: any, prev_data_attr: any, price: any) {
    setproductList(
      (productList || [])?.map((count: any) =>
        count.id === id && count.data_attr > 0 ? { ...count, data_attr: prev_data_attr - 1, total: (prev_data_attr - 1) * price } : count
      )
    );
  }

  useEffect(() => {
    dispatch(onGetCart())
  }, [dispatch]);

  useEffect(() => {
    setproductList(cart)
  }, [cart])


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Cart" />
          <Row>
            <Col xl={8}>
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table align-middle mb-0 table-nowrap">
                      <thead className="table-light">
                        <tr>
                          <th>Product</th>
                          <th>Product Desc</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th colSpan={2}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(productList || [])?.map((product: any) => {
                          return (
                            <tr key={product.id}>
                              <td>
                                <img src={product.img} alt="product-img" title="product-img" className="avatar-md" />
                              </td>
                              <td>
                                <h5 className="font-size-14 text-truncate">
                                  <Link to={"/ecommerce-product-detail/" + product.id} className="text-dark">{product.name}</Link>
                                </h5>
                                <p className="mb-0"> Color :
                                  <span className="fw-medium"> {product.color} </span>
                                </p>
                              </td>
                              <td>$ {product.price}</td>
                              <td>
                                {/* <div className="me-3" style={{ width: "120px" }}>
                                  <InputGroup className="bootstrap-touchspin bootstrap-touchspin-injected">
                                    <Input type="text" name="demo_vertical" value={product.data_attr} readOnly />
                                    <span className="input-group-btn-vertical">
                                      <Button color="primary" className="bootstrap-touchspin-up " type="button" onClick={() => countUP(product.id, product.data_attr, product.price)}>+</Button>
                                      <Button color="primary" className="bootstrap-touchspin-down " type="button" onClick={() => countDown(product.id, product.data_attr, product.price)} >-</Button>
                                    </span>
                                  </InputGroup>
                                </div> */}
                                <div style={{ width: "120px" }}>
                                  <InputGroup>
                                    <div className="input-group-prepend">
                                      <Button type="button" color="primary" onClick={() => countUP(product.id, product.data_attr, product.price)}>+ </Button>
                                    </div>
                                    <Input type="text" value={product.data_attr} name="demo_vertical" readOnly />
                                    <div className="input-group-append">
                                      <Button type="button" color="primary" onClick={() => countDown(product.id, product.data_attr, product.price)}>-</Button>
                                    </div>
                                  </InputGroup>
                                </div>
                              </td>
                              <td>$ {product.total}</td>
                              <td>
                                <Link to="#" onClick={() => removeCartItem(product.id)} className="action-icon text-danger" >
                                  <i className="mdi mdi-trash-can font-size-18" />
                                </Link>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </div>
                  <Row className="mt-4">
                    <Col sm="6">
                      <Link to="/ecommerce-products" className="btn btn-secondary" >
                        <i className="mdi mdi-arrow-left me-1" /> Continue Shopping
                      </Link>
                    </Col>
                    <Col sm="6">
                      <div className="text-sm-end mt-2 mt-sm-0">
                        <Link to="/ecommerce-checkout" className="btn btn-success" >
                          <i className="mdi mdi-cart-arrow-right me-1" /> Checkout
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Card Details</CardTitle>
                  <Card color="primary" className="text-white visa-card mb-0">
                    <CardBody>
                      <div>
                        <i className="bx bxl-visa visa-pattern" />
                        <div className="float-end">
                          <i className="bx bxl-visa visa-logo display-3" />
                        </div>
                        <div>
                          <i className="bx bx-chip h1 text-warning" style={{ lineHeight: 1 }} />
                        </div>
                      </div>

                      <Row className="mt-5">
                        <Col xs={4}>
                          <p>
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                          </p>
                        </Col>
                        <Col xs={4}>
                          <p>
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                          </p>
                        </Col>
                        <Col xs={4}>
                          <p>
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                          </p>
                        </Col>
                      </Row>

                      <div className="mt-5">
                        <h5 className="text-white float-end mb-0">12/22</h5>
                        <h5 className="text-white mb-0">Fredrick Taylor</h5>
                      </div>
                    </CardBody>
                  </Card>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">Order Summary</CardTitle>
                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <tbody>
                        <tr>
                          <td>Grand Total :</td>
                          <td>$ {subTotal || ''}</td>
                        </tr>
                        <tr>
                          <td>Discount : </td>
                          <td>- $ {(dic).toFixed(2) || ''}</td>
                        </tr>
                        <tr>
                          <td>Shipping Charge :</td>
                          <td>$ {charge || ''}</td>
                        </tr>
                        <tr>
                          <td>Estimated Tax : </td>
                          <td>$ {(tax).toFixed(2) || ''}</td>
                        </tr>
                        <tr>
                          <th>Total :</th>
                          <th>$ {((subTotal + charge + tax) - dic).toFixed(2) || ''}</th>
                        </tr>
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

export default EcommerceCart;

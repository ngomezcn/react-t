import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
import { Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Label, Nav, NavItem, NavLink, Row } from "reactstrap";
import classnames from "classnames";
import { isEmpty } from "lodash";

import { Discount, EcoAction, FilterClothes, Product } from "./type";

import Spinners from "Components/Common/Spinner";
import { handleSearchData } from "Components/Common/SearchFile";
//Import Star Ratings
import StarRatings from "react-star-ratings";

// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

//Import data
import { discountData } from "../../common/data";

//Import actions
import { getProducts as onGetProducts } from "../../slices/e-commerence/thunk";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';

const EcommerceProducts = (props: any) => {

  //meta title
  document.title = "Products | Skote - React Admin & Dashboard Template";

  const dispatch: any = useDispatch();

  const selectProperties = createSelector(
    (state: EcoAction) => state.ecommerce,
    (ecommerce) => ({
      products: ecommerce.products,
      loading: ecommerce.loading
    })
  );

  const { products, loading } = useSelector(selectProperties);
  const [isLoading, setLoading] = useState(loading)
  const { navigate } = props.router;

  // eslint-disable-next-line no-unused-vars
  const filterClothes: FilterClothes[] = [
    { id: 1, name: "T-shirts", link: "#" },
    { id: 2, name: "Shirts", link: "#" },
    { id: 3, name: "Jeans", link: "#" },
    { id: 4, name: "Jackets", link: "#" },
  ];

  const [productList, setProductList] = useState<Product[]>();
  const [activeTab, setActiveTab] = useState<string>("1");

  // eslint-disable-next-line no-unused-vars
  const [discountDataList, setDiscountDataList] = useState<any>([]);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  useEffect(() => {
    setDiscountDataList(discountDataList);
  }, [discountDataList]);

  useEffect(() => {
    dispatch(onGetProducts());
  }, [dispatch]);

  const toggleTab = (tab: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const onSelectDiscount = (e: any) => {
    const { value } = e.target;

    if (value !== null) {
      const filteredProducts = (products || [])?.filter((product: any) => product.offer.toString() === value.toString());
      setProductList(filteredProducts);
    } else {
      setProductList(products);
    }
  };
  //Product Filter with noUi slider
  const [minCost, setMinCost] = useState<number>(0);
  const [maxCost, setMaxCost] = useState<number>(500);

  const onUpdate = useCallback((value: any) => {
    const filterData = (products || [])?.filter((i: Product) => {
      return i.newPrice >= minCost && i.newPrice <= maxCost
    })
    setProductList(filterData)
    setMinCost(value[0]);
    setMaxCost(value[1]);
  }, [minCost, maxCost, products]);

  useEffect(() => {
    onUpdate([minCost, maxCost]);
  }, [minCost, maxCost, onUpdate]);

  /*
  on change rating checkbox method
  */
  const onChangeRating = (value: any) => {

    if (value !== null) {
      const filteredProducts = (products || [])?.filter((product: Product) => product.rating === value);
      setProductList(filteredProducts);
    } else {
      setProductList(products);
    }
  };

  // search
  const handleSearch = (ele: any) => {
    const query = ele.value.toLowerCase();
    handleSearchData({ setState: setProductList, data: products, item: query })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Products" />
          <Row>
            <Col lg={3}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Filter</CardTitle>
                  <div>
                    <h5 className="font-size-14 mb-3">Clothes</h5>
                    <ul className="list-unstyled product-list">
                      {(filterClothes || [])?.map((cloth: FilterClothes, key: number) => (
                        <li key={"_li_" + key}>
                          <Link to={cloth.link}>
                            <i className="mdi mdi-chevron-right me-2" /> {cloth.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 pt-3">
                    <h5 className="font-size-14 mb-3">Price</h5>
                    <br />

                    <Nouislider
                      range={{ min: 0, max: 600 }}
                      tooltips={true}
                      start={[minCost, maxCost]}
                      connect
                      step={10}
                      onSlide={onUpdate}
                    />
                  </div>

                  <div className="mt-4 pt-3">
                    <h5 className="font-size-14 mb-3">Discount</h5>
                    {(discountData || []).map((discount: Discount, i: number) => (
                      <FormGroup check className="mt-2" key={i}>
                        <Input type="checkbox" value={discount.value} onChange={onSelectDiscount} />
                        <Label check>{discount.label} </Label>
                      </FormGroup>
                    ))}
                  </div>

                  <div className="mt-4 pt-3">
                    <h5 className="font-size-14 mb-3">Customer Rating</h5>
                    <div>
                      <FormGroup check className="mt-2">
                        <Input type="checkbox" id="productratingCheck1" onChange={(e) => { onChangeRating(4) }} />
                        <Label check htmlFor="productratingCheck1">
                          4 <i className="bx bx-star text-warning" /> & Above
                        </Label>
                      </FormGroup>
                      <FormGroup check className="mt-2">
                        <Input type="checkbox" id="productratingCheck2" onChange={(e) => { onChangeRating(3) }} />
                        <Label check htmlFor="productratingCheck2">
                          3 <i className="bx bx-star text-warning" /> & Above
                        </Label>
                      </FormGroup>
                      <FormGroup check className="mt-2">
                        <Input type="checkbox" id="productratingCheck3" onChange={(e) => { onChangeRating(2) }} />
                        <Label check htmlFor="productratingCheck3">
                          2 <i className="bx bx-star text-warning" /> & Above
                        </Label>
                      </FormGroup>
                      <FormGroup check className="mt-2">
                        <Input type="checkbox" id="productratingCheck4" onChange={(e) => { onChangeRating(1) }} />
                        <Label check htmlFor="productratingCheck4">
                          1 <i className="bx bx-star text-warning" />
                        </Label>
                      </FormGroup>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={9}>
              <Row className="mb-3">
                <Col xl={4} sm={6}>
                  <div className="mt-2">
                    <h5>Clothes</h5>
                  </div>
                </Col>
                <Col lg={8} sm={6}>
                  <Form className="mt-4 mt-sm-0 float-sm-end d-sm-flex align-items-center">
                    <div className="search-box me-2">
                      <div className="position-relative">
                        <Input type="text" className="border-0" placeholder="Search..." onChange={(e: any) => handleSearch(e.target)} />
                        <i className="bx bx-search-alt search-icon" />
                      </div>
                    </div>
                    <Nav className="product-view-nav justify-content-end mt-3 mt-sm-0" pills>
                      <NavItem>
                        <NavLink className={classnames({ active: activeTab === "1", })} onClick={() => { toggleTab("1"); }}>
                          <i className="bx bx-grid-alt" />
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink className={classnames({ active: activeTab === "2", })} onClick={() => { toggleTab("2"); }}>
                          <i className="bx bx-list-ul" />
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Form>
                </Col>
              </Row>
              {
                isLoading ? <Spinners setLoading={setLoading} />
                  :
                  <>
                    <Row>
                      {!isEmpty(productList) &&
                        (productList || []).map((product: Product, key: number) => (
                          <Col xl={4} sm={6} key={"_col_" + key}>
                            <Card onClick={() => navigate(`/ecommerce-product-detail/${product.id}`)}>
                              <CardBody>
                                <div className="product-img position-relative">
                                  {product.isOffer ? (
                                    <div className="avatar-sm product-ribbon">
                                      <span className="avatar-title rounded-circle bg-primary">
                                        {`- ${product.offer} %`}
                                      </span>
                                    </div>
                                  ) : null}

                                  <img style={{ height: "auto" }} src={product.image} alt="" className="img-fluid mx-auto d-block" />
                                </div>
                                <div className="mt-4 text-center">
                                  <h5 className="mb-3 text-truncate">
                                    <Link to={"/ecommerce-product-detail/" + product.id} className="text-dark">
                                      {product.name}
                                    </Link>
                                  </h5>
                                  <div className="text-muted mb-3">
                                    <StarRatings
                                      rating={product.rating}
                                      starRatedColor="#F1B44C"
                                      starEmptyColor="#74788d"
                                      numberOfStars={5}
                                      name="rating"
                                      starDimension="14px"
                                      starSpacing="1px"
                                    />
                                  </div>
                                  <h5 className="my-0">
                                    <span className="text-muted me-2">
                                      <del>${product.oldPrice}</del>
                                    </span>
                                    <b>${product.newPrice}</b>
                                  </h5>
                                </div>
                              </CardBody>
                            </Card>
                          </Col>
                        ))}
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="text-center mt-2 mb-5">
                          <Link to="#" className="text-success"><i className="bx bx-loader bx-spin font-size-18 align-middle me-2"></i> Load more </Link>
                        </div>
                      </Col>
                    </Row>
                  </>
              }

            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};


export default withRouter(EcommerceProducts);

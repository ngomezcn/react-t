import React from "react";
import { Label, Row, Col, Input, InputGroup, Button, InputGroupText, Form } from "reactstrap";

const CrytoBuy = () => {
    return (
        <React.Fragment>
            <Form>
                <div className="mb-2">
                    <Label>Currency :</Label>
                    <Row>
                        <Col xl={2} sm={4}>
                            <div className="mb-3">
                                <label className="card-radio-label mb-2">
                                    <input type="radio" name="currency" id="buycurrencyoption1" className="card-radio-input" defaultChecked readOnly />
                                    <div className="card-radio">
                                        <div>
                                            <i className="mdi mdi-bitcoin font-size-24 text-warning align-middle me-2" />
                                            <span> Bitcoin</span>
                                        </div>
                                    </div>
                                </label>
                                <div>
                                    <p className="text-muted mb-1"> Current price :</p>
                                    <h5 className="font-size-16">  0.00016 BTC</h5>
                                </div>
                            </div>
                        </Col>

                        <Col xl={2} sm={4}>
                            <div className="mb-3">
                                <label className="card-radio-label mb-2">
                                    <input type="radio" name="currency" id="buycurrencyoption2" className="card-radio-input" />
                                    <div className="card-radio">
                                        <div>
                                            <i className="mdi mdi-ethereum font-size-24 text-primary align-middle me-2" />
                                            <span> Ethereum</span>
                                        </div>
                                    </div>
                                </label>
                                <div>
                                    <p className="text-muted mb-1">Current price : </p>
                                    <h5 className="font-size-16">0.0073 ETH</h5>
                                </div>
                            </div>
                        </Col>

                        <Col xl={2} sm={4}>
                            <div className="mb-3">
                                <label className="card-radio-label mb-2">
                                    <input type="radio" name="currency" id="buycurrencyoption3" className="card-radio-input" />
                                    <div className="card-radio">
                                        <div>
                                            <i className="mdi mdi-litecoin font-size-24 text-info align-middle me-2" />
                                            <span> litecoin</span>
                                        </div>
                                    </div>
                                </label>
                                <div>
                                    <p className="text-muted mb-1"> Current price :  </p>
                                    <h5 className="font-size-16">0.025 LTC</h5>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="mb-2">
                    <Label>Payment method :</Label>
                    <Row>
                        <Col xl={2} sm={4}>
                            <label className="card-radio-label mb-3">
                                <input type="radio" name="pay-method" id="pay-methodoption1" className="card-radio-input" />
                                <div className="card-radio">
                                    <i className="fab fa-cc-mastercard font-size-24 text-primary align-middle me-2" />
                                    <span> Credit / Debit Card</span>
                                </div>
                            </label>
                        </Col>
                        <Col xl={2} sm={4}>
                            <label className="card-radio-label mb-3">
                                <input type="radio" name="pay-method" id="pay-methodoption3" className="card-radio-input" defaultChecked readOnly />
                                <div className="card-radio">
                                    <i className="fab fa-cc-paypal font-size-24 text-primary align-middle me-2" />
                                    <span> Paypal</span>
                                </div>
                            </label>
                        </Col>
                    </Row>
                </div>

                <div className="mb-3">
                    <Label>Add value :</Label>
                    <Row>
                        <Col sm="6">
                            <InputGroup className="mb-2 currency-value">
                                <div className="input-group-prepend">
                                    <InputGroupText>Bitcoin</InputGroupText>
                                </div>
                                <Input type="text" placeholder="Bitcoin" />
                            </InputGroup>
                        </Col>
                        <Col sm="6">
                            <InputGroup className="mb-2">
                                <Input type="text" className="text-sm-end" placeholder="USD Amount" />
                                <InputGroupText>USD Amount</InputGroupText>
                            </InputGroup>
                        </Col>
                    </Row>
                </div>

                <div className="mb-3">
                    <Label>Wallet Address :</Label>
                    <Input type="text" placeholder="Wallet Address" />
                </div>
                <div className="text-center mt-4">
                    <Button type="button" color="success">Buy Crypto currency</Button>
                </div>
            </Form>
        </React.Fragment>
    );
}

const CryptoSell = () => {
    return (
        <React.Fragment>
            <Form>
                <div className="mb-2">
                    <label>Currency :</label>

                    <Row>
                        <Col xl={2} sm={4}>
                            <div className="mb-3">
                                <label className="card-radio-label mb-2">
                                    <input type="radio" name="currency" id="sellcurrencyoption1" className="card-radio-input" defaultChecked readOnly />
                                    <div className="card-radio">
                                        <div>
                                            <i className="mdi mdi-bitcoin font-size-24 text-warning align-middle me-2" />
                                            <span>Bitcoin</span>
                                        </div>
                                    </div>
                                </label>
                                <div>
                                    <p className="text-muted mb-1">  Current price : </p>
                                    <h5 className="font-size-16"> 0.00016 BTC  </h5>
                                </div>
                            </div>
                        </Col>

                        <Col xl={2} sm={4}>
                            <div className="mb-3">
                                <label className="card-radio-label mb-2">
                                    <input type="radio" name="currency" id="sellcurrencyoption2" className="card-radio-input" />
                                    <div className="card-radio">
                                        <div>
                                            <i className="mdi mdi-ethereum font-size-24 text-primary align-middle me-2" />
                                            <span>Ethereum</span>
                                        </div>
                                    </div>
                                </label>
                                <div>
                                    <p className="text-muted mb-1">  Current price :</p>
                                    <h5 className="font-size-16">0.0073 ETH</h5>
                                </div>
                            </div>
                        </Col>

                        <Col xl={2} sm={4}>
                            <div className="mb-3">
                                <label className="card-radio-label mb-2">
                                    <input type="radio" name="currency" id="sellcurrencyoption3" className="card-radio-input" />
                                    <div className="card-radio">
                                        <div>
                                            <i className="mdi mdi-litecoin font-size-24 text-info align-middle me-2" />
                                            <span>litecoin</span>
                                        </div>
                                    </div>
                                </label>

                                <div>
                                    <p className="text-muted mb-1">  Current price :  </p>
                                    <h5 className="font-size-16">0.025 LTC</h5>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="mb-3">
                    <label>Email :</label>
                    <Input type="email" placeholder="Email" />
                </div>
                <div className="mb-3">
                    <label>Add value :</label>
                    <Row>
                        <Col sm="6">
                            <InputGroup className="mb-2 currency-value">
                                <InputGroupText> Crypto value </InputGroupText>
                                <Input type="text" placeholder="Crypto value" />
                            </InputGroup>
                        </Col>

                        <Col sm="6">
                            <InputGroup className="mb-2">
                                <Input type="text" className="text-sm-end" placeholder="USD Amount" />
                                <InputGroupText> USD Amount </InputGroupText>
                            </InputGroup>
                        </Col>
                    </Row>
                </div>

                <div className="mb-3">
                    <label>Wallet Address :</label>
                    <Input type="text" placeholder="Wallet Address" />
                </div>
                <div className="text-center mt-4">
                    <Button type="button" color="danger">Sell Crypto currency </Button>
                </div>
            </Form>
        </React.Fragment>
    )
}

export { CrytoBuy, CryptoSell };
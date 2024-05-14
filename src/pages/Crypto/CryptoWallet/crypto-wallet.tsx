import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import "../../../assets/scss/datatables.scss";

import { getWallet as onGetWallet } from "../../../slices/thunk";
import WalletActivities from "./walletActivities";
import WalletStats from "./walletStats";
import WalletOverView from "./walletOverView";
import { wallets } from "common/data/crypto";

//Import Breadcrumb
import Breadcrumbs from "../../../Components/Common/Breadcrumb";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';

const CryptoWallet = () => {

  //meta title
  document.title = "Wallet | Skote - React Admin & Dashboard Template";

  const dispatch: any = useDispatch();

  const selectProperties = createSelector(
    (state: any) => state.crypto,
    (crypto) => ({
      wallet: crypto.wallet
    })
  );

  const { wallet } = useSelector(selectProperties);

  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<any>("1");

  useEffect(() => {
    dispatch(onGetWallet());
  }, [dispatch]);

  const toggleTab = (tab: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Crypto" breadcrumbItem="Wallet" />
          {!isEmpty(wallet) && (
            <Row>
              <Col xl={4}>
                <WalletStats
                  wallet={wallet}
                  isMenu={isMenu}
                  toggleMenu={toggleMenu}
                />
              </Col>
              <Col xl={8}>
                <Row>
                  {
                    (wallets || [])?.map((item: any) => {
                      return (
                        <Col sm="4" key={item.id}>
                          <Card className="mini-stats-wid">
                            <CardBody>
                              <div className="d-flex">
                                <div className="me-3 align-self-center">
                                  <i className={`mdi mdi-${item.icon} h2 text-${item.text} mb-0`} />
                                </div>
                                <div className="flex-grow-1">
                                  <p className="text-muted mb-2">{item.wallet} Wallet</p>
                                  <h5 className="mb-0"> {item.coine}
                                    <span className="font-size-14 text-muted">  = $ {item.price}.00 </span>
                                  </h5>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      )
                    })
                  }
                </Row>
                <WalletOverView wallet={wallet} />
              </Col>
            </Row>
          )}
          <Row>
            <Col lg={12}>
              {!isEmpty(wallet["walletHistory"]) && (
                <WalletActivities
                  walletHistory={wallet["walletHistory"]}
                  activeTab={activeTab}
                  toggleTab={toggleTab}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CryptoWallet;

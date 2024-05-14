import React from "react";
import { Col, Card, CardBody, CardTitle } from "reactstrap";
import { notificationsData } from "common/data";
import { Notification } from "./type";

//Simple bar
import SimpleBar from "simplebar-react";

const Notifications: React.FC = () => {

  return (

    <React.Fragment>
      <Col xl={4}>
        <Card>
          <CardBody>
            <CardTitle tag="h4" className="mb-4">Notifications</CardTitle>
            <SimpleBar style={{ maxHeight: "390px" }}>
              <ul className="list-group">
                {(notificationsData || []).map((item: Notification, index: number) => (
                  <li className="list-group-item border-0" key={index}>
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-xs">
                          <span className="avatar-title rounded-circle bg-light">
                            <img src={item.avatar} alt="" height="18" />
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="font-size-14">{item.title}</h5>
                        <p className="text-muted">{item.description}</p>

                        <div className="float-end">
                          <p className="text-muted mb-0">
                            <i className="mdi mdi-account me-1" /> {item.author}
                          </p>
                        </div>
                        <p className="text-muted mb-0">{item.date}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </SimpleBar>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Notifications;

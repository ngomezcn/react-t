import React from "react";
import { Col, Card, CardBody, Badge } from "reactstrap";
import { saasReports } from "../../common/data";
import { SaasReport } from "./type";

const MiniWidget: React.FC = () => {
  return (
    <React.Fragment>
      {(saasReports || [])?.map((report: SaasReport, key: number) => (
        <Col sm={4} key={key}>
          <Card>
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <div className="avatar-xs me-3">
                  <span className="avatar-title rounded-circle bg-primary-subtle text-primary font-size-18">
                    <i className={report.icon} />
                  </span>
                </div>
                <h5 className="font-size-14 mb-0">{report.title}</h5>
              </div>
              <div className="text-muted mt-4"  >
                <h4>
                  {report.value}
                  <i className="mdi mdi-chevron-up ms-1 text-success" />
                </h4>
                <div className="d-flex">
                  <Badge className={"badge-soft-" + report.color + " font-size-12"}>
                    {report.badgeValue}
                  </Badge>
                  <span className="ms-2 text-truncate">{report.desc}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  )
}

export default MiniWidget;

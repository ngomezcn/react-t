import React from "react";
import { Container, Row } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../../Components/Common/Breadcrumb";

import BlogGrid from "./BlogGrid"
import RightBar from "../BlogList/RightBar"

const Index = () => {
  //meta title
  document.title = "Blog Grid | Mercantec - Quiz Project";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Blog" breadcrumbItem="Blog Grid" />
          <Row>
            <BlogGrid />
            <RightBar />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Index

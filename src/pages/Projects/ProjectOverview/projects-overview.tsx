import React, { useEffect } from "react";
import withRouter from "../../../Components/Common/withRouter";
import { isEmpty } from "lodash";
import { Col, Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../Components/Common/Breadcrumb";

import { getProjectsDetail as onGetProjectsDetail } from "../../../slices/projects/thunk";
import ProjectDetail from "./projectDetail";
import TeamMembers from "./teamMembers";
import OverviewChart from "./overviewChart";
import { options, series } from "common/data/projects";
import AttachedFiles from "./attachedFiles";
import Comments from "./comments";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';

const ProjectsOverview = (props: any) => {

  //meta title
  document.title = "Project Overview | Skote - React Admin & Dashboard Template";

  const dispatch = useDispatch<any>();

 const selectProperties = createSelector(
    (state: any) => state.projects,
    (projects) => ({
      projectDetail: projects.projectDetail,
    })
  );

  const { projectDetail } = useSelector(selectProperties);

  const params = props.router.params

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetProjectsDetail(params.id));
    } else {
      dispatch(onGetProjectsDetail(1)); //remove this after full integration
    }
  }, [params, dispatch]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projects" breadcrumbItem="Project Overview" />

          {!isEmpty(projectDetail) && (
            <>
              <Row>
                <Col lg="8">
                  <ProjectDetail project={projectDetail} />
                </Col>

                <Col lg="4">
                  <TeamMembers  />
                </Col>
              </Row>

              <Row>
                <Col lg="4">
                  <OverviewChart options={options} series={series} />
                </Col>

                <Col lg="4">
                  <AttachedFiles files={projectDetail.files} />
                </Col>

                <Col lg="4">
                  <Comments comments={projectDetail.comments} />
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ProjectsOverview);

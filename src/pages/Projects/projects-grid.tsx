import React, { useEffect, useMemo, useState } from "react";
import { Container, Row } from "reactstrap";
import withRouter from "../../Components/Common/withRouter";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

//Import Cards
import CardProject from "./card-project";

import { getProjects as onGetProjects } from "../../slices/projects/thunk";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';
import Spinners from "Components/Common/Spinner";
import Paginations from "Components/Common/Pagination";

const ProjectsGrid = () => {

  //meta title
  document.title = "Projects Grid | Skote - React Admin & Dashboard Template";

  const dispatch = useDispatch<any>();

  const selectProperties = createSelector(
    (state: any) => state.projects,
    (projects) => ({
      projects: projects.projects,
      loading: projects.loading
    })
  );

  const { projects, loading } = useSelector(selectProperties);

  const [isLoading, setLoading] = useState<boolean>(loading);
  const [projectsList, setProjectsList] = useState<any>();

  useEffect(() => {
    dispatch(onGetProjects());
  }, [dispatch]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const perPageData = 6;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;
  const currentdata = useMemo(() => projects?.slice(indexOfFirst, indexOfLast), [projects, indexOfFirst, indexOfLast])

  useEffect(() => {
    setProjectsList(currentdata);
  }, [currentdata]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Projects" breadcrumbItem="Projects Grid" />
          {
            isLoading ? <Spinners setLoading={setLoading} />
              :
              <>
                <Row>
                  <CardProject projects={projectsList} />
                </Row>
                <Row>
                  <Paginations
                    perPageData={perPageData}
                    data={projects}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isShowingPageLength={false}
                    paginationDiv="col-12"
                    paginationClass="pagination pagination-rounded justify-content-center mt-2 mb-5" />
                </Row>
              </>
          }
        </Container>
      </div >
    </React.Fragment >
  );
};

export default withRouter(ProjectsGrid);

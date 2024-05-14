import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Container, Row, CardTitle } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb"
import ReactApexChart from "react-apexcharts"
import withRouter from "../../Components/Common/withRouter";

import { getTasks as onGetTasks } from "../../slices/tasks/thunk"
import { options, recentTasksData, series, } from "common/data/tasks"

//redux
import { useDispatch } from "react-redux"
import { createSelector } from "reselect"
import { useSelector } from "react-redux"
import Spinners from "Components/Common/Spinner"

interface userImages {
  id: number,
  img?: string,
  imageText?: string
}

interface cardType {
  badgeColor: string,
  badgeText: string,
  title: string,
  imageTextColor?: string,
  userImages: userImages[]
}

interface tasksType {
  id: string,
  name: string,
  cards: cardType[]
}

interface avatarsType {
  src?: string | undefined,
  avatarTitle?: string,
  bgColor?: string
}

interface RecentTask {
  id: number;
  taskName: string;
  avatars: avatarsType[];
}

const TasksList = () => {
  //meta title
  document.title = "Task List | Skote - React Admin & Dashboard Template"

  const dispatch = useDispatch<any>()

  const selectProperties = createSelector(
    (state: any) => state.tasks,
    (task) => ({
      tasks: task.tasks,
      loading: task.loading
    })
  );
  const { tasks, loading }: any = useSelector(selectProperties);
  const [isLoading, setLoading] = useState<boolean>(loading);

  useEffect(() => {
    dispatch(onGetTasks())
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Tasks" breadcrumbItem="Task List" />
          <Row>
            <Col lg={8}>
              {
                isLoading ? <Spinners setLoading={setLoading} /> :
                  (tasks || []).map((item: tasksType, index: number) => (
                    <Card key={index}>
                      <CardBody>
                        <h4 className="card-title mb-4">{item.name}</h4>
                        <div className="table-responsive">
                          <table className="table table-nowrap align-middle mb-0">
                            <tbody>
                              {
                                item.cards.map((card, index: number) => (
                                  <tr key={index}>
                                    <td style={{ width: "40px" }}>
                                      <div className="form-check font-size-16">
                                        <input className="form-check-input" type="checkbox" id="upcomingtaskCheck01" />
                                        <label className="form-check-label" htmlFor="upcomingtaskCheck01"></label>
                                      </div>
                                    </td>
                                    <td>
                                      <h5 className="text-truncate font-size-14 m-0"><Link to="#" className="text-dark">{card.title}</Link></h5>
                                    </td>
                                    <td>
                                      <div className="avatar-group">
                                        {
                                          card.userImages.map((userImg, index: number) => (
                                            <div className="avatar-group-item" key={index}>
                                              <Link to="#" className="d-inline-block">
                                                {userImg.img ?
                                                  <img src={userImg.img} alt="" className="rounded-circle avatar-xs" />
                                                  :
                                                  <div className="avatar-xs">
                                                    <span className={`avatar-title rounded-circle ${card.imageTextColor} text-white font-size-16`}>
                                                      {userImg.imageText}
                                                    </span>
                                                  </div>}
                                              </Link>
                                            </div>
                                          ))
                                        }
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-center">
                                        <span className={`badge rounded-pill badge-soft-${card.badgeColor} font-size-11`}>{card.badgeText}</span>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              }
                            </tbody>
                          </table>
                        </div>
                      </CardBody>
                    </Card>
                  ))
              }
            </Col>

            <Col lg={4}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">Tasks </CardTitle>
                  <ReactApexChart
                    options={options}
                    series={series}
                    type="line"
                    height={280}
                    className="apex-charts"
                  />
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-4">Recent Tasks</CardTitle>

                  <div className="table-responsive">
                    <table className="table table-nowrap align-middle mb-0">
                      <tbody>
                        {
                          (recentTasksData || []).map((item: RecentTask, index: number) => (
                            <tr key={index}>
                              <td>
                                <h5 className="text-truncate font-size-14 m-0"><Link to="#" className="text-dark">{item.taskName}</Link></h5>
                              </td>
                              <td>
                                <div className="avatar-group">
                                  {
                                    item.avatars.map((avatarImg, inx: number) => (
                                      <div className="avatar-group-item" key={inx}>
                                        {
                                          avatarImg.src ?
                                            <Link to="#" className="d-inline-block">
                                              <img src={avatarImg.src} alt="" className="rounded-circle avatar-xs" />
                                            </Link>
                                            :
                                            <div className="avatar-xs">
                                              <span className={`avatar-title rounded-circle ${avatarImg.bgColor} text-white font-size-16`}>
                                                {avatarImg.avatarTitle}
                                              </span>
                                            </div>
                                        }
                                      </div>
                                    ))
                                  }
                                </div>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>

            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(TasksList)

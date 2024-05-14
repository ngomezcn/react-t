import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
import { Col, Container, Row } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

//Import Card
import CardContact from "./card-contact"

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';

import { getUsers as onGetUsers } from "../../slices/contacts/thunk"
import Spinners from "Components/Common/Spinner";

const ContactsGrid = () => {

  //meta title
  document.title = "User Grid | Skote - React Admin & Dashboard Template";

  const dispatch = useDispatch<any>()

  const selectProperties = createSelector(
    (state: any) => state.contacts,
    (contact) => ({
      users: contact.users,
      loading: contact.loading
    })
  );

  const { users, loading }: any = useSelector(selectProperties);
  const [isLoading, setLoading] = useState<boolean>(loading);

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers())
    }
  }, [dispatch, users])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Contacts" breadcrumbItem="User Grid" />
          {
            isLoading ? <Spinners setLoading={setLoading} />
              :
              <>
                <Row>
                  {(users || [])?.map((user: any, key: number) => (
                    <CardContact user={user} key={"_user_" + key} />
                  ))}
                </Row>
                <Row>
                  <Col xs={12}>
                    <div className="text-center my-3">
                      <Link to="#" className="text-success">
                        <i className="bx bx-hourglass bx-spin me-2" />
                        Load more
                      </Link>
                    </div>
                  </Col>
                </Row>
              </>
          }

        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(ContactsGrid)

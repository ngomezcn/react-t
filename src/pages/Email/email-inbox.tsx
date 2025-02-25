import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
import { Button, Card, Col, Container, Input, Label, Row, Nav, Modal, ModalBody, ModalFooter, ModalHeader, NavItem } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

import classnames from "classnames";

// Import Editor
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  getMailsLists as onGetMailsLists,
  staredMail as onStaredMail,
  getSelectedMails as onGetSelectedMails,
} from "../../slices/email/thunk"

//Import Email Topbar
import EmailToolbar from "./email-toolbar";


//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';
import Spinners from "Components/Common/Spinner";
import { labelsData, mailChatData } from "common/data";

interface labelsDataType {
  id: number, icon: string, text: string
}

interface mailChatDataType {
  id: number, imageSrc: string, userTitle: string, textMessage: string
}

const EmailInbox = () => {

  //meta title
  document.title = "Inbox | Mercantec - Quiz Project";

  const dispatch = useDispatch<any>();

  const selectProperties = createSelector(
    (state: any) => state.email,
    (Mails) => ({
      mailsLists: Mails.mailsLists,
      loading: Mails.loading
    })
  );

  const { mailsLists, loading }: any = useSelector(selectProperties);
  const [mailsList, setMailsList] = useState<any>();

  const [isLoading, setLoading] = useState<boolean>(loading)
  const [activeTab, setActiveTab] = useState<any>("1");
  const [modal, setModal] = useState<boolean>(false);
  const [badgeLength, setBadgeLength] = useState<number>();

  useEffect(() => {
    setMailsList(mailsLists);
    const read = mailsLists.filter((item: any) => !item.read).length;
    setBadgeLength(read);
  }, [mailsLists]);


  useEffect(() => {
    dispatch(onGetMailsLists());
  }, [dispatch]);

  const handleSelect = (selectedItems: any) => {
    dispatch(onGetSelectedMails(selectedItems));
  };

  const [checkbox, setCheckbox] = useState<boolean>(false);

  const checkFirstCheckbox = () => {
    const checkboxElement: any = document.querySelectorAll('.message-list input[type="checkbox"]');
    let isChecked = false;

    checkboxElement.forEach((checkboxElement: any) => {
      if (checkboxElement.checked) {
        isChecked = true;
        return;
      }
    });

    setCheckbox(isChecked);
  };

  // search 
  const handelSearch = (searchQuery: any) => {
    const filteredEmails = mailsLists.filter((email: any) =>
      email.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMailsList(filteredEmails);
  }

  const [displayCategory, setDisplayCategory] = useState("inbox")
  const filterMails = ({ category }: any) => {
    if (displayCategory === "inbox" && category === "trash") {
      return false;
    }
    return (
      (displayCategory === "inbox" || displayCategory === category)
    );
  }

  // Starred Mail
  const starredBtn = (item: any) => {
    dispatch(onStaredMail(item.id));
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Email" breadcrumbItem="Inbox" />

          <Row>
            <Col xs={12}>
              {/* Render Email SideBar */}
              <Card className="email-leftbar">
                <Button type="button" color="danger" className="btn waves-effect waves-light" block onClick={() => { setModal(!modal); }}>
                  Compose
                </Button>
                <div className="mail-list mt-4">
                  <Nav tabs className="nav-tabs-custom" vertical role="tablist">
                    <NavItem>
                      <a href="#!" className={classnames({ active: activeTab === "1", })}
                        onClick={() => {
                          setActiveTab("1"); setDisplayCategory("inbox")
                        }}>
                        <i className="mdi mdi-email-outline me-2"></i> Inbox
                        <span className="ml-1 float-end">{badgeLength === 0 ? "" : (badgeLength)}</span>
                      </a>
                    </NavItem>

                    <NavItem>
                      <a href="#!" className={classnames({ active: activeTab === "2", })}
                        onClick={() => {
                          setActiveTab("2"); setDisplayCategory("starred"); setBadgeLength(0)
                        }}>
                        <i className="mdi mdi-star-outline me-2"></i>Starred
                      </a>
                    </NavItem>

                    <NavItem>
                      <a href="#!" className={classnames({ active: activeTab === "3", })}
                        onClick={() => {
                          setActiveTab("3"); setDisplayCategory("important"); setBadgeLength(0)
                        }}>
                        <i className="mdi mdi-diamond-stone me-2"></i>Important
                      </a>
                    </NavItem>

                    <NavItem>
                      <a href="#!" className={classnames({ active: activeTab === "4", })}
                        onClick={() => {
                          setActiveTab("4"); setDisplayCategory("draft"); setBadgeLength(0)
                        }}>
                        <i className="mdi mdi-file-outline me-2"></i>Draft
                      </a>
                    </NavItem>

                    <NavItem>
                      <a href="#!" className={classnames({ active: activeTab === "5", })}
                        onClick={() => {
                          setActiveTab("5"); setDisplayCategory("sent"); setBadgeLength(0)
                        }}>
                        <i className="mdi mdi-email-check-outline me-2"></i>Sent
                        Mail
                      </a>
                    </NavItem>

                    <NavItem>
                      <a href="#!" className={classnames({ active: activeTab === "6", })}
                        onClick={() => {
                          setActiveTab("6"); setDisplayCategory("trash"); setBadgeLength(0)
                        }}>
                        <i className="mdi mdi-trash-can-outline me-2"></i>Trash
                      </a>
                    </NavItem>
                  </Nav>
                </div>

                <h6 className="mt-4">Labels</h6>

                <div className="mail-list mt-1">
                  {
                    (labelsData || []).map((item: labelsDataType, index: number) => (
                      <Link to="#" key={index}><span className={item.icon}></span>{item.text}</Link>
                    ))
                  }
                </div>

                <h6 className="mt-4">Chat</h6>

                <div className="mt-2">
                  {
                    (mailChatData || []).map((item: mailChatDataType, index: number) => (
                      <Link to="#" className="d-flex" key={index}>
                        <div className="flex-shrink-0">
                          <img
                            className="d-flex me-3 rounded-circle"
                            src={item.imageSrc}
                            alt="skote"
                            height="36"
                          />
                        </div>
                        <div className="flex-grow-1 chat-user-box">
                          <p className="user-title m-0">{item.userTitle}</p>
                          <p className="text-muted">{item.textMessage}</p>
                        </div>
                      </Link>
                    ))
                  }
                </div>
              </Card>

              <Modal isOpen={modal} autoFocus={true} centered={true} toggle={() => { setModal(!modal); }} >
                <div className="modal-content">
                  <ModalHeader toggle={() => { setModal(!modal); }}>New Message </ModalHeader>
                  <ModalBody>
                    <form>
                      <div className="mb-3">
                        <Input type="email" placeholder="To" />
                      </div>

                      <div className="mb-3">
                        <Input type="text" placeholder="Subject" />
                      </div>
                      <Editor toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName" editorClassName="editorClassName" />
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button type="button" color="secondary" onClick={() => { setModal(!modal); }}>Close</Button>
                    <Button type="button" color="primary"> Send <i className="fab fa-telegram-plane ms-1"></i> </Button>
                  </ModalFooter>
                </div>
              </Modal>
              <div className="email-rightbar mb-3">
                {
                  isLoading ? <Spinners setLoading={setLoading} />
                    :
                    <Card>
                      {mailsLists.length > 0 ?
                        <>
                          {/* Render Email Top Tool Bar */}
                          <EmailToolbar checkbox={checkbox} setCheckbox={setCheckbox} activeTab={activeTab} handelSearch={handelSearch} category={displayCategory} />
                          <ul className="message-list">
                            {mailsList?.filter(({ category }: any) => filterMails({ category })).map((mail: any, key: any) => {
                              return (
                                <li key={key} className={mail.read ? "" : "unread"}>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <Input type="checkbox" value={mail.id} id={mail.id} name="emailcheckbox"
                                        onChange={(e) => e.target.value}
                                        onClick={(e: any) => { handleSelect(e.target.value); checkFirstCheckbox() }}
                                      // checked={selectedmails.includes(mail.id)}
                                      />
                                      <Label htmlFor={mail.id} className="toggle" />
                                    </div>
                                    <Link to={"/email-read/" + mail.id} className="title">
                                      {mail.name}
                                    </Link>
                                    <span className={mail.category === "starred" ? "star-toggle fas fa-star text-warning" : "star-toggle far fa-star"} style={{ cursor: "pointer" }}
                                      onClick={() => starredBtn(mail)}
                                    />
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: mail.description,
                                      }}
                                    ></div>
                                    <div className="date">{mail.date}</div>
                                  </div>
                                </li>
                              )
                            })}
                          </ul>
                        </>
                        : <div className="align-items-center text-center p-4"> <i className="mdi mdi-email-outline me-2 display-5"></i> <h4> No Recored Found </h4>
                        </div>}
                    </Card>
                }
                {mailsLists.length > 0 &&
                  <Row>
                    <Col xs="7">Showing 1 - 20 of 1,524</Col>
                    <Col xs="5">
                      <div className="btn-group float-end">
                        <Button type="button" color="success" size="sm">
                          <i className="fa fa-chevron-left" />
                        </Button>
                        <Button type="button" color="success" size="sm">
                          <i className="fa fa-chevron-right" />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                }
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(EmailInbox);

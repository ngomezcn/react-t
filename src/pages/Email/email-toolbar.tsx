import React, { useState, useEffect } from "react";
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import {
  folderOnSelectedMails as onFolderOnSelectedMails,
  getSelectFolders as onSelectFolders,
  deleteMail as onDeleteMail,
  getSelectedMails as onGetSelectedMails,
  trashMail as onTrashMail,
} from "../../slices/email/thunk";
import DeleteModal from "Components/Common/DeleteModal";

const EmailToolbar = (props: any) => {

  const dispatch = useDispatch<any>();

  const EmailProperties = createSelector(
    (state: any) => state.email,
    (Mails) => ({
      selectedMails: Mails.selectedmails,
      selectFolders: Mails.selectFolders
    })
  );

  const { selectedMails, selectFolders } = useSelector(EmailProperties);

  useEffect(() => {
    dispatch(onSelectFolders());
  }, [dispatch]);

  const [folder_Menu, setFolder_Menu] = useState(false);
  const [tag_Menu, setTag_Menu] = useState(false);
  const [more_Menu, setMore_Menu] = useState(false);

  const handleunSelectCheckbox = () => {
    var items = document.getElementsByName('emailcheckbox') as any;

    for (var i = 0; i < items.length; i++) {
      if (items[i].type === 'checkbox')
        items[i].checked = false;
    }
    (document.getElementById('checkall') as any).checked = false;
  };

  // // Checked All Email
  const forId: any = [];
  const checkedAll = () => {
    const checkboxElements: NodeListOf<HTMLInputElement> = document.querySelectorAll('.message-list input[type="checkbox"]');
    checkboxElements.forEach((checkboxElement: any) => {
      if (checkboxElement.value !== null) {
        forId.push(checkboxElement.value);
        checkboxElement.checked = true;
        props.setCheckbox(true)
      }
    });
    dispatch(onGetSelectedMails(forId));
  };

  // delete modal 
  const [delet, setDelete] = useState<boolean>(false);

  const handleDelete = () => setDelete(!delet);

  const handleDeleteData = () => {
    selectedMails.map((item: any) => {
      if (props.category === "trash") {
        dispatch(onDeleteMail(item));
        props.setCheckbox(false)
      } else {
        dispatch(onTrashMail(item));
        props.setCheckbox(false)
      }
      return item
    })
    handleunSelectCheckbox();
    handleDelete();
  }
  return (
    <React.Fragment>
      <div className="p-3 message-list pb-0">
        <Row className="justify-content-between">
          <Col>
            <div className="d-flex align-items-start gap-2">
              <div className="checkbox-wrapper-mail selectall my-2">
                <input type="checkbox" className="form-check-input" id="checkall" onChange={checkedAll} value="" />
                <label className="toggle form-label" htmlFor="checkall"></label>
              </div>
              {props.checkbox &&
                <div className="btn-toolbar" role="toolbar" id="toolbar">
                  <div className="btn-group me-2 mb-2 mb-sm-0">
                    <Button type="button" color="primary">
                      <i className="fa fa-inbox" />
                    </Button>
                    <Button type="button" color="primary">
                      <i className="fa fa-exclamation-circle" />
                    </Button>
                    <Button type="button" color="primary" onClick={handleDelete}>
                      <i className="far fa-trash-alt" />
                    </Button>
                  </div>
                  <Dropdown isOpen={folder_Menu} toggle={() => { setFolder_Menu(!folder_Menu); }} className="btn-group me-2 mb-2 mb-sm-0">
                    <DropdownToggle className="btn btn-primary  dropdown-toggle" tag="i">
                      <i className="fa fa-folder" />{" "}
                      <i className="mdi mdi-chevron-down ms-1" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">
                      {(selectFolders || []).map((folder) => (
                        <DropdownItem to="#"
                          onClick={(ev: any) => {
                            const data = { emailId: selectedMails, id: ev.target.value, activeTab: props.activeTab };
                            dispatch(onFolderOnSelectedMails(data));
                            handleunSelectCheckbox();
                          }}
                          value={folder.id}
                          key={folder.id}>{folder.title}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown isOpen={tag_Menu} toggle={() => { setTag_Menu(!tag_Menu); }} className="btn-group me-2 mb-2 mb-sm-0">
                    <DropdownToggle className="btn btn-primary  dropdown-toggle" tag="i">
                      <i className="fa fa-tag" />{" "}
                      <i className="mdi mdi-chevron-down ms-1" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">
                      <DropdownItem to="#">Updates</DropdownItem>
                      <DropdownItem to="#">Social</DropdownItem>
                      <DropdownItem to="#">Team Manage</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown isOpen={more_Menu} toggle={() => { setMore_Menu(!more_Menu); }} className="btn-group me-2 mb-2 mb-sm-0">
                    <DropdownToggle className="btn btn-primary  dropdown-toggle" tag="div">
                      More <i className="mdi mdi-dots-vertical ms-2" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">
                      <DropdownItem to="#">Mark as Unread</DropdownItem>
                      <DropdownItem to="#">Mark as Important</DropdownItem>
                      <DropdownItem to="#">Add to Tasks</DropdownItem>
                      <DropdownItem to="#">Add Star</DropdownItem>
                      <DropdownItem to="#">Mute</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              }
            </div>

          </Col>
          <Col lg={3}>
            <div className="search-box mb-2 me-2">
              <div className="position-relative">
                <input type="text" className="form-control bg-light border-light rounded" placeholder="Search..." onChange={(e: any) => props.handelSearch(e.target.value)} />
                <i className="bx bx-search-alt search-icon"></i>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <DeleteModal show={delet} onDeleteClick={handleDeleteData} onCloseClick={handleDelete} />
    </React.Fragment>
  );
};

export default EmailToolbar;

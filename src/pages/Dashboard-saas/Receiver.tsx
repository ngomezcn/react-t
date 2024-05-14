import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"

const Receiver = ({ message, handleDeleteData, handleCopy, handleSaveMsg }: any) => {
  return (
    <li>
      <div className="conversation-list">
        <UncontrolledDropdown>
          <DropdownToggle tag="a" className="dropdown-toggle">
            <i className="bx bx-dots-vertical-rounded" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="#!" onClick={handleCopy}>Copy</DropdownItem>
            <DropdownItem href="#!" onClick={handleSaveMsg}>Save</DropdownItem>
            <DropdownItem href="#!">Forward</DropdownItem>
            <DropdownItem href="#!" onClick={() => handleDeleteData(message.id)}>Delete</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div className="ctext-wrap">
          <div className="conversation-name">{message["name"]}</div>
          <p>{message["msg"]}</p>
          <p className="chat-time mb-0">
            <i className="bx bx-time-five align-middle me-1" />{" "}
            {message["time"]}
          </p>
        </div>
      </div>
    </li>
  )
}


export default Receiver;

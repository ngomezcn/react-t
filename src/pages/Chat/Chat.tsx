import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Message, RecentChat } from "./type";

import ChatList from "./ChatList";
import UserChat from "./UserChat";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

import { getMessages as onGetMessages } from "../../slices/chats/thunk"

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';

interface ChatState {
  chats: {
    messages: Message[];
    loading: boolean;
  }
}

const Chat: React.FC = () => {

  //meta title
  document.title = "Chat | Skote - React Admin & Dashboard Template";

  const dispatch = useDispatch<any>();
  const selectProperties = createSelector(
    (state: ChatState) => state.chats,
    (chats) => ({
      messages: chats.messages,
      loading: chats.loading
    })
  );

  const { messages, loading } = useSelector(selectProperties);

  const [currentRoomId, setCurrentRoomId] = useState<number>(1);

  const [Chat_Box_Username, setChat_Box_Username] = useState<string>("Steven Franklin");
  const [Chat_Box_User_Status, setChat_Box_User_Status] = useState<string>("online");


  useEffect(() => {
    dispatch(onGetMessages(currentRoomId));
  }, [dispatch, currentRoomId]);

  //Use For Chat Box
  const userChatOpen = (chats: RecentChat) => {
    setChat_Box_Username(chats.name);
    setCurrentRoomId(chats.roomId);
    setChat_Box_User_Status(chats.status)
    dispatch(onGetMessages(chats.roomId));
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Skote" breadcrumbItem="Chat" />

          <Row>
            <Col lg={12}>
              <div className="d-lg-flex">

                <ChatList
                  userChatOpen={userChatOpen}
                  currentRoomId={currentRoomId} />

                <UserChat
                  Chat_Box_Username={Chat_Box_Username}
                  Chat_Box_User_Status={Chat_Box_User_Status}
                  messages={messages}
                  loading={loading}
                />

              </div>
            </Col>
          </Row>
        </Container>
      </div >
    </React.Fragment >
  );
};



export default Chat;

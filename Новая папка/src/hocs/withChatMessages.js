import { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { hasChatById, getChatById } from '../store/chats/selectors';
import { getChatMessagesListById } from '../store/messages/selectors';
import { addMessageWithThunk, onTrackingAddMessageWithThunk, onTrackingRemoveMessageWithThunk, offTrackingAddMessageWithThunk, offTrackingRemoveMessageWithThunk } from '../store/messages/actions';
//import { AUTHOR_USER } from "../components/constants";
import { getUserId } from '../store/user/selectors';
import { createMessage } from "../components/utility";
//import { onTrackingRemoveChatWithThunk } from "../store/chats/actions";



export const withChatMessages = (Component) => {
    return (props) => {
        const { chatID } = useParams();
        const userId = useSelector(getUserId);
        const messageList = useSelector(getChatMessagesListById(chatID));
        const hasChat = useSelector(hasChatById(chatID));

        let nameChat = "Чатик";
        /*      const nameCh = useSelector(getChatById(chatID));
      
              if (nameCh.find(item => item.id === chatID)) {
      
                  nameChat = nameCh[0].name;
              };*/
        const dispatch = useDispatch();

        const onSendMesssage = (text) => {
            const message = createMessage(userId, text);
            dispatch(addMessageWithThunk(message, chatID))
        };

        useEffect(() => {
            dispatch(onTrackingAddMessageWithThunk(chatID));
            dispatch(onTrackingRemoveMessageWithThunk(chatID))

            return () => {
                dispatch(offTrackingAddMessageWithThunk(chatID));
                dispatch(offTrackingRemoveMessageWithThunk(chatID))
            }
        }, [chatID])

        return (<Component {...props}
            messageList={messageList}
            hasChat={hasChat}
            onSendMesssage={onSendMesssage}
            nameChat={nameChat} />)
    }
}
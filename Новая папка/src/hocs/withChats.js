import { Component, useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createChat } from "../components/utility";
import { getChatList } from "../store/chats/selectors";
import { addChatWithThunk, offTrackingAddChatWithThunk, offTrackingRemoveChatWithThunk, onTrackingAddChatWithThunk, onTrackingRemoveChatWithThunk, removeChatWithThunk } from '../store/chats/actions';

import { nanoid } from 'nanoid';
import { removeMessagesByChatIdWithThunk } from '../store/messages/actions';


export const withChats = (Component) => {
    return (props) => {
        const chats = useSelector(getChatList);

        const dispatch = useDispatch();

        const onCreateChat = useCallback(() => {
            dispatch(addChatWithThunk(createChat('new chatik_' + nanoid(3))))
        }, []);

        const onDeleteChat = useCallback((chatID) => {
            dispatch(removeChatWithThunk(chatID));
            dispatch(removeMessagesByChatIdWithThunk(chatID));
        }, []);
        useEffect(() => {
            dispatch(onTrackingAddChatWithThunk);
            dispatch(onTrackingRemoveChatWithThunk);

            return () => {
                dispatch(offTrackingAddChatWithThunk);
                dispatch(offTrackingRemoveChatWithThunk);
            }
        }, [])

        return (
            <Component
                {...props}
                chats={chats}
                onCreateChat={onCreateChat}
                onDeleteChat={onDeleteChat}
            />)

    }
}
import { chatsRef } from "../../firebase";
import { mapChatSnapshotToChat } from '../../components/utility';

export const ADD_CHAT = 'ADD_CHAT';
export const REMOVE_CHAT = 'REMOVE_CHAT';
export const SET_CHATS = 'SET_CHAT';

export const addChat = (chat) => ({
    type: ADD_CHAT,
    payload: chat,
});
export const removeChat = (chatID) => ({
    type: REMOVE_CHAT,
    payload: chatID,
});
export const setChats = (chats) => ({
    type: SET_CHATS,
    payload: chats,
});
export const removeChatWithThunk = (chatID) => (dispatch) => {
    chatsRef.child(chatID).remove(() => {
        dispatch(removeChat(chatID))
    })
};
export const addChatWithThunk = (chat) => () => {
    chatsRef.push(chat);
};
export const onTrackingAddChatWithThunk = (dispatch) => {
    chatsRef.on('child_added', (snapshot) => {
        dispatch(addChat(mapChatSnapshotToChat(snapshot)))
    })
};
export const offTrackingAddChatWithThunk = () => {
    chatsRef.off('child_added')
};
export const onTrackingRemoveChatWithThunk = (dispatch) => {
    chatsRef.on('child_removed', (snapshot) => {
        dispatch(dispatch(removeChat(snapshot.key)))
    })
};
export const offTrackingRemoveChatWithThunk = () => {
    chatsRef.off('child_removed')
};
//import { AUTHOR_BOT, CLASS_NAME_IN, CLASS_NAME_OUT } from '../../components/constants';
import { createMessage, mapMessageSnapshotToMessage } from '../../components/utility';
import { messagesRef } from '../../firebase';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const REMOVE_MESSAGE_FROM_CHAT = 'REMOVE_MESSAGE_FROM_CHAT';

export const addMessage = (message, chatID) => ({
    type: ADD_MESSAGE,
    payload: {
        message, chatID,
    }
});

export const removeMessagesFromChat = (chatID) => ({
    type: REMOVE_MESSAGE_FROM_CHAT,
    payload: chatID
});

export const removeMessagesByChatIdWithThunk = (chatID) => (dispatch) => {
    messagesRef.child(chatID).remove(() => {
        dispatch(removeMessagesFromChat(chatID));
    })
}

/* export const sendMessageWithThunk = (author, text, chatID) => (dispatch) => {
    const messageUser = createMessage(author, text, CLASS_NAME_OUT);

    dispatch(addMessage(messageUser, chatID));

    if (author === AUTHOR_BOT) { return; }

    const messageBot = createMessage(AUTHOR_BOT, "Привет, как дела?", CLASS_NAME_IN);

    dispatch(addMessage(messageBot, chatID));
}; */

export const addMessageWithThunk = (message, chatID) => () => {
    messagesRef.child(chatID).push(message);
}

export const onTrackingAddMessageWithThunk = (chatID) => (dispatch) => {
    messagesRef.child(chatID).on('child_added', (snapshot) => {
        dispatch(addMessage(mapMessageSnapshotToMessage(snapshot), chatID))
    })
}

export const offTrackingAddMessageWithThunk = (chatID) => () => {
    messagesRef.child(chatID).off('child_added')
}

export const onTrackingRemoveMessageWithThunk = (chatID) => (dispatch) => {
    messagesRef.child(chatID).on('child_removed', () => {
        dispatch(removeMessagesFromChat(chatID));
    })
}

export const offTrackingRemoveMessageWithThunk = (chatID) => () => {
    messagesRef.child(chatID).off('child_removed')
}
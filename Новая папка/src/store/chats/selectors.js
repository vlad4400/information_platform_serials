import { compareById } from '../../components/utility';


export const getChatsReducer = (state) => state.chats;
export const getChats = (state) => getChatsReducer(state)?.chats || {};
export const getChatList = (state) => Object.values(getChats(state));
export const getChatById = (chatID) => (state) => getChats(state)[chatID];
export const hasChatById = (chatID) => (state) => chatID in getChats(state);
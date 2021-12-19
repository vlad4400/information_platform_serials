export const getMessagesReducer = (state) => state.messages || {};
export const getMessages = (state) => getMessagesReducer(state).messages || {};
export const getChatMessagesById = (chatID) => (state) => getMessages(state)[chatID] || [];
export const getChatMessagesListById = (chatID) => (state) => Object.values(getChatMessagesById(chatID)(state));



import { ADD_CHAT, REMOVE_CHAT, SET_CHATS } from './actions';

const initState = {
    chats: {},
}

export const chatsReduser = (state = initState, action) => {
    switch (action.type) {
        case ADD_CHAT: {
            return {
                chats: { ...state.chats, [action.payload.id]: action.payload }
            }
        }
        case REMOVE_CHAT: {
            if (!action.payload) { return state; }
            const chats = { ...state.chats };
            delete chats[action.payload];
            return {
                chats
            }
        }
        case SET_CHATS: {
            return {
                chats: { ...action.payload }
            }
        }
        default: { return state; }
    }
}
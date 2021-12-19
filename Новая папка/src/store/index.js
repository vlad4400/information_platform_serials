import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import { profileReducer } from './profile/reducer';
import { chatsReduser } from './chats/reducer';
import { messagesReduser } from './messages/reducer';
import { usersReducer } from './users/reducer';
import { userReducer } from "./user/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// создаем объект конфигурации для persist
const persistConfig = {
    key: 'main',
    storage,
}

const mainReducer = combineReducers({
    profile: profileReducer,
    chats: chatsReduser,
    messages: messagesReduser,
    users: usersReducer,
    user: userReducer,
})

// оборачиваем редьюсеры в persist
const persistedReducer = persistReducer(persistConfig, mainReducer);

// создаем store с использованием persistedReducer
export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
);

// создаем persistor
export const persistor = persistStore(store);

/* export const store = createStore(
    mainReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
); */
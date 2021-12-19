//не исп

import React, { useEffect, useState } from "react";
import { InputForm } from './InputMessage'  //подключение формы ввода
import { Chat } from './MessageList'        //подключение  списка сообщений

//вывод формы и чата

export const Chatik = () => {

    const [messageList, setMessageList] = useState([]);

    const userName = "user";
    const botName = "bot";
    const classNameIn = "messageIn";
    const classNameOut = "messageOut";

    const sendMessage = (id, author, text, className) => {
        const newMessageList = [...messageList];
        const newMessage = {
            id,
            author,
            text,
            className,
        };
        newMessageList.push(newMessage);
        setMessageList(newMessageList);
    };

    const onSendMesssage = (value) => {
        sendMessage(Date.now(), userName, value, classNameOut);
    };

    useEffect(() => {
        if (messageList.length === 0) {
            return;
        }

        const prevous = messageList[messageList.length - 1];

        if (prevous.author === botName) {
            return;
        }

        const timerId = setTimeout(() => {
            sendMessage(Date.now(), botName, "Привет, как дела?", classNameIn);
        }, 1500);

        return () => {
            clearTimeout(timerId);
        }

    }, [messageList]);

    return (
        <div className="App">
            <h1 className="headerChat">Чатик</h1>
            <div className="areaChat">
                <InputForm onSend={onSendMesssage} />
                <Chat messageList={messageList} />
            </div>

        </div>
    )

};

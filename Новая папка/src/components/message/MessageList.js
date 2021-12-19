import React from "react";
import { FullMessage } from './Message';


//вывод сообщений в чате
export const MessageList = (props) => {
    return (
        <div className="chat">
            {
                props.messageList.map((item) => (
                    < FullMessage key={item.id} {...item} />

                ))}
        </div>
    );
};


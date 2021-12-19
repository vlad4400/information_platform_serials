import React from 'react';
//вывод сообщения
export const FullMessage = (props) => {
    return <div className="names">{props.author}: <span className={props.className}>{props.text}</span></div>
};


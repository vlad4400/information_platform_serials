//страница редактирования пользователей
//Вывод списка пользователей, поиск, изменение признака администратора, удаление.

import { Navigate } from "react-router-dom";
import React, { setState, Component } from 'react';


export const Users = () => {
    fetch('http://127.0.0.1:8000/api/admin/users')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    });
  
    return (
        <div>
            <h2>Список пользователей</h2>

        </div >
    );

};




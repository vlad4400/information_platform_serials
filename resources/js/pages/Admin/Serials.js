//страница редактирования сериалов
// Вывод списка сериалов, поиск по названию и году, удаление.

import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { API_ADMIN_PARSER } from '../../../../components/Constants';
import { useDispatch } from 'react-redux';

const setSerialsAsync = async (dispatch) => {

    try {
        const response = await fetch(API_ADMIN_PARSER);
        if (!response.ok) {
            throw new Error('Error!!!!!!!!!!!!!');
        }
        const result = await response.json();
        dispatch(setData(result));
    } catch (e) {
        console.error(e);

    }

};

export const SerialsAdmin = () => {
    const dispatch = useDispatch();

    const Parser = () => {
        dispatch(setSerialsAsync);
    }

    useEffect(() => {
        Parser();
    }, []);
    return (
        <div>
            <h2>Редактирование сериалов</h2>

            <Button variant="dark" onClick={Parser}>Parser</Button>{' '}

        </div >
    );

};




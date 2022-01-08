//страница редактирования пользователей
//Вывод списка пользователей, поиск, изменение признака администратора, удаление.

//import { Navigate } from "react-router-dom";
import { Container, Card, Form, Col, Row } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { ListUsers } from '../../../components/users/ListUsers';
import { useDispatch, useSelector } from "react-redux";
import { getUsersWithThunk } from '../../../store/AdminUsers/actions';
import { getUsers, getUsersLoading, getUsersError } from '../../../store/AdminUsers/selectors';

export const Users = () => {
    /*  const [input, setInput] = useState("");
      const onInputChange = (e) => {
          setInput(e.target.value);
      };
  
  
      const [filteredList, setFilteredList] = useState([]);
  
      const filterList = (input) => {
          const list = [];
          /*  const list =
           key === watchedKey ? watched : key === toWatchKey ? toWatch : []; */
    /* return list.filter((item) =>
         item.title.toLowerCase().includes(input.toLowerCase())
     );
 };

 useEffect(() => {
     const filteredList = filterList(input);
     setFilteredList(filteredList);
 }, [input]);*/

    const data0 = useSelector(getUsers);


    console.log(data);


    const isLoading = useSelector(getUsersLoading);
    const isError = useSelector(getUsersError);


    const dispatch = useDispatch();

    const getData = () => {
        dispatch(getUsersWithThunk);
    }

    /*   useEffect(() => {
          getData();
      }, []); */

    return (
        <Container fluid>
            <h2>Управление пользователями</h2>
            <Row className="mb-3">
                <Col>
                    <Card body>
                        <h3 className="mb-3">Список сериалов</h3>
                        <Form.Control
                            placeholder="Поиск по названию.."
                            aria-label="Search"
                            value={input}
                            onChange={onInputChange}
                        />
                    </Card>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Card body>
                        <ListUsers list={getData} />
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};


/* 
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from '@material-ui/core';
import { Error } from "../../components/forAPI/Error";
import { Loader } from "../../components/forAPI/Loader";
import { List } from "../../components/forAPI/List";
import { getUsersWithThunk } from '../../store/users/actions';
import { getUsers, getUsersLoading, getUsersError } from '../../store/users/selectors';

export const Users = () => {
    const data = useSelector(getUsers);
    const isLoading = useSelector(getUsersLoading);
    const isError = useSelector(getUsersError);


    const dispatch = useDispatch();

    const getData = () => {
        dispatch(getUsersWithThunk);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            {!isError &&
                <Button onClick={getData} disabled={isLoading}>Recall</Button>
            }

            {isError &&
                (<Error reload={getData} />
                )}

            {
                isLoading &&
                <Loader />
            }
            {
                !isLoading && data.length > 0 &&
                <List list={data} />
            }

        </div>
    );
};

*/


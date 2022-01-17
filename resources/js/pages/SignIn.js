// страница авторизации 
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import swal from 'sweetalert';
//import { auth } from "../../firebase";

export const LoginFormTestIds = {
    loginField: 'LoginForm-loginField',
    passwordField: 'LoginForm-passwordField',
}

export const SignIn = () => {
    let navigate = useNavigate();

    const [loginInput, setLogin] = useState({
        name: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        setLogin({...loginInput, [e.target.name]: e.target.value })

    }

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: loginInput.name,
            password: loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/login', data).then( res => {
                if(res.data.status === 200)
                {
                    console.log(res.data);
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success");
                    navigate('/');
                }
                else if(res.data.status === 401)
                {
                    console.log(res.data);
                    swal("Warning", res.data.message, "warning");
                }
            })
            .catch(error => {
                if (error.response) {
                    setLogin({...loginInput, error_list: error.response.data.errors});
                }
              });;
        });

    };

    return (
        <Container fluid="sm">
            <Form onSubmit={loginSubmit}>
                <h1>Авторизация</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name (Your Login)</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        //data-testid={LoginFormTestIds.loginField}
                        name="name"
                        onChange={handleInput}
                        value={loginInput.name}
                    />
                    <span className="text-danger">{loginInput.error_list.name}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        //data-testid={LoginFormTestIds.passwordField}
                        name="password"
                        onChange={handleInput}
                        value={loginInput.password}
                    />
                    <span className="text-danger">{loginInput.error_list.password}</span>
                </Form.Group>

                {/*{error && <Alert>{error.toString()}</Alert>}*/}

                <Button variant="primary" type="submit">
                    Отправить
                </Button>
                <hr />
                <p>
                    Нет аккаунта? Зарегистрируйтесь <Link to="/signup">Регистрация</Link>
                </p>
            </Form>
        </Container >
    );
};
// страница регистрации

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import swal from 'sweetalert';
import { API_REG_COOKIE, API_REGISTER } from '../constants/api';

export const SignUp = () => {
    const navigate = useNavigate();

    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        error_list: [],
    });


    const handleInput = (e) => {
        setRegister({ ...registerInput, [e.target.name]: e.target.value })
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            password_confirmation: registerInput.password_confirmation,
        }

        axios.get(API_REG_COOKIE).then(response => {
            axios.post(API_REGISTER, data).then(res => {
                if (res.data.status === 200) {

                    // console.log(res.data);

                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success");
                    navigate('/');
                }
            })
                .catch(error => {
                    if (error.response) {
                        setRegister({ ...registerInput, error_list: error.response.data.errors });

                    }
                });;
        });


    };

    return (

        <Form onSubmit={registerSubmit}>
            <h1>Регистрация</h1>
            <Form.Group className="mb-3">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    onChange={handleInput}
                    value={registerInput.name}
                />
                <span className="text-danger">{registerInput.error_list.name}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email адрес</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleInput}
                    value={registerInput.email}
                />
                <span className="text-danger">{registerInput.error_list.email}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleInput}
                    value={registerInput.password}
                />
                <span className="text-danger">{registerInput.error_list.password}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword2">
                <Form.Label>Подтверждение пароля</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password confirmation"
                    name="password_confirmation"
                    onChange={handleInput}
                    value={registerInput.password_confirmation}
                />
                <span className="text-danger">{registerInput.error_list.password_confirmation}</span>
            </Form.Group>

            <Button variant="primary" type="submit">
                Отправить
            </Button>
            <hr />
            <p>
                Уже есть аккаунт? <Link to="/signin">Вход</Link>
            </p>
        </Form>

    );
};

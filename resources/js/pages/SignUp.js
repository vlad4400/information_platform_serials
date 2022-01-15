// страница регистрации
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import swal from 'sweetalert';

//import { auth } from "../../firebase";

export const SignUp = () => {
    const navigate = useNavigate();

    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: [],
    });


    const handleInput = (e) => {
        setRegister({...registerInput, [e.target.name]: e.target.value })

    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }

       
                axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.post('/api/register', data).then( res => {
                        if(res.data.status === 200)
                        {
                            console.log(res.data);
                            localStorage.setItem('auth_token', res.data.token);
                            localStorage.setItem('auth_name', res.data.username);
                            swal("Success", res.data.message, "success");
                            navigate('/');


                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            setRegister({...registerInput, error_list: error.response.data.errors});
                        }
                      });;
                });
                //     await auth.createUserWithEmailAndPassword(email, password);
                //navigate("/profile");

    };

    return (
        <Container fluid="sm">
            <Form onSubmit={registerSubmit}>
                <h1>Регистрация</h1>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        onChange={handleInput}
                        value={registerInput.name}
                    />
                    <span className="text-danger">{registerInput.error_list.name}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
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
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleInput}
                        value={registerInput.password}
                    />
                    <span className="text-danger">{registerInput.error_list.password}</span>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Отправить
                </Button>
                <hr />
                <p>
                    Уже есть аккаунт? <Link to="/signin">Вход</Link>
                </p>
            </Form>
        </Container>
    );
};

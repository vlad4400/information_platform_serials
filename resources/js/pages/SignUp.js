// страница регистрации
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
//import { auth } from "../../firebase";

export const SignUp = () => {
    //let navigate = useNavigate();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });

    const [error, setError] = useState('');

    const handleInput = (e) => {
        setRegister({...registerInput, [e.target.name]: e.target.value })

    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            passwordConfirmation: registerInput.passwordConfirmation,
        }

        if ((data.name.trim()) && (data.email.trim()) &&
            (data.password.trim()) &&
            (data.passwordConfirmation.trim()) &&
            (data.password.trim() === data.passwordConfirmation.trim())) {

            try {
                axios.post('api/register', data).then( res => {

                });
                //     await auth.createUserWithEmailAndPassword(email, password);
                //navigate("/profile");
            } catch (e) {
                setError(e);
            }
        } else {
            setError(e);
        }
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
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>Password confirmation</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password confirmation"
                        name="passwordConfirmation"
                        onChange={handleInput}
                        value={registerInput.passwordConfirmation}
                    />
                </Form.Group>

                {error && <Alert>{error.toString()}</Alert>}

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

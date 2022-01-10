// страница регистрации
import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";
import { withSignUp } from '../HOCS/withSignUp';
//import { auth } from "../../firebase";

export const SignUpRender = ({ error, email, name, password, passwordConfirmation, handleEmailChange, handleNameChange, handlePassChange, handlePassConfirmChange, handleSubmit }) => {

    return (

        <Form onSubmit={handleSubmit}>
            <h1>Регистрация</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleEmailChange}
                    value={email}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    onChange={handleNameChange}
                    value={name}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handlePassChange}
                    value={password}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword2">
                <Form.Label>Password confirmation</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password confirmation"
                    name="passwordConfirmation"
                    onChange={handlePassConfirmChange}
                    value={passwordConfirmation}
                />
            </Form.Group>

            {error && <Alert>{error}</Alert>}

            <Button variant="primary" type="submit">
                Отправить
            </Button>
            <hr />
            <p>
                Уже есть аккаунт? <Link to="/signin">Вход</Link>
            </p>
        </Form >

    );
};

export const SignUp = withSignUp(SignUpRender);
// страница авторизации 
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Button, Form, Alert } from "react-bootstrap";
//import { auth } from "../../firebase";

export const LoginFormTestIds = {
    loginField: 'LoginForm-loginField',
    passwordField: 'LoginForm-passwordField',
}

export const SignIn = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handlePassChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // await auth.signInWithEmailAndPassword(email, password);

            navigate("/profile");
        } catch (e) {
            setError(e);
        }
    };

    return (
        <Container fluid="sm">
            <Form onSubmit={handleSubmit}>
                <h1>Авторизация</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        data-testid={LoginFormTestIds.loginField}
                        name="email"
                        onChange={handleEmailChange}
                        value={email}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        data-testid={LoginFormTestIds.passwordField}
                        name="password"
                        onChange={handlePassChange}
                        value={password}
                    />
                </Form.Group>

                {error && <Alert>{error.toString()}</Alert>}

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
/*
<Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
            We'll never share your email with anyone else.
        </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>
    <Button variant="primary" type="submit">
        Submit
    </Button>
</Form>
*/

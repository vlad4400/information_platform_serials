// страница регистрации
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Button, Form, Alert } from "react-bootstrap";
//import { auth } from "../../firebase";

export const SignUp = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");

    const handlePassChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePassConfirmChange = (e) => {
        setPasswordConfirmation(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ((password.trim()) &&
            (passwordConfirmation.trim()) &&
            (email.trim()) &&
            (name.trim()) &&
            (password.trim() === passwordConfirmation.trim())) {

            try {
                //     await auth.createUserWithEmailAndPassword(email, password);
                navigate("/profile");
            } catch (e) {
                setError(e);
            }
        } else {
            setError(e);
        }
    };

    return (
        <Container fluid="sm">
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

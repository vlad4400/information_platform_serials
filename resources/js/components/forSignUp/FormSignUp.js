import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { FieldFormSignUp } from './FieldFormSignUp';
//FieldFormSignUp = ({ label, type, placeholder, name, value, onChange, id, error })

export const FormSignUp = ({ Data, onSubmit }) => {
    const [dataSignUp, setDataSignUp] = useState(Data);
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (e) => {
        //     e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);

        onSubmit(dataSignUp);
    };

    const handleDataChange = fieldName => fieldValue => {
        setDataSignUp({
            ...dataSignUp,
            [fieldName]: fieldValue,
        });
    };

    return (

        <Form noValidate validated={validated} onSubmit={handleSubmit}>

            <FieldFormSignUp
                label="Адрес электронной почты"
                type="email"
                placeholder="Enter email"
                name="email"
                value={dataSignUp.email}
                onChange={handleDataChange('email')}
                id="formBasicEmail"
                error="Неверный почтовый адрес."
            />
            <FieldFormSignUp
                label="Имя"
                type="text"
                placeholder="Enter your name (nick name)"
                name="name"
                value={dataSignUp.name}
                onChange={handleDataChange('name')}
                id="formBasicName"
                error="Имя должно быть заполнено."
            />
            <FieldFormSignUp
                label="Пароль"
                type="password"
                placeholder="Password"
                name="password"
                value={dataSignUp.password}
                onChange={handleDataChange('password')}
                id="formBasicPassword"
                error="Пароль не может быть пустым."
            />
            <FieldFormSignUp
                label="Подтверждение пароля"
                type="password"
                placeholder="Password confirmation"
                name="passwordConfirmation"
                value={dataSignUp.passwordConfirmation}
                onChange={handleDataChange('passwordConfirmation')}
                id="formBasicPassword2"
                error="Заполните подтверждение пароля. "
            />

            <Button variant="primary" type="submit">
                Отправить
            </Button>
        </Form >

    );
}  
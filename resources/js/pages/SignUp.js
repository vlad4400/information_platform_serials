// страница регистрации
import { CheckInputSignUp } from '../components/forSignUp/CheckInputSignUp';
import { Formik, Field, ErrorMessage } from 'formik';
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { Form, Button } from 'react-bootstrap';

import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { FieldFormikSignUp } from '../components/forSignUp/FieldFormSignUp';


export function SignUp() {
    let navigate = useNavigate();
    const [error, setError] = useState("");
    const Data = {
        email: "",
        name: "",
        password: "",
        passwordConfirmation: ""
    };
    const [dataSignUp, setDataSignUp] = useState(Data);


    const handleSubmitForm = (data) => {
        //let Err = CheckInputSignUp({ data });
        //if (!Err) {

        //
        try {
            //     await auth.createUserWithEmailAndPassword(email, password);
            //console.log({ data })
            navigate("/profile");
        } catch (e) {

            setError(e.toString());
        }
        //} else {
        // setError(Err);
        // }
    };


    const schema = Yup.object({
        email: Yup.string()
            .email("Неверный адрес")
            .required("Почтовый адрес не может быть пустым"),
        name: Yup.string()
            .max(100, "не больше 100 символов")
            .required("Имя должно быть заполнено").trim(),
        password: Yup.string().required("Пароль не может быть пустым")
            .max(30, "не больше 30 символов"),
        passwordConfirmation: Yup.string().required("Заполните подтверждение пароля")
            .oneOf([Yup.ref("password")], "Пароль и подтверждение пароля не совпадают"),
    });
    //             .required("Имя должно быть заполнено").trim(),
    const handleDataChange = fieldName => fieldValue => {
        setDataSignUp({
            ...dataSignUp,
            [fieldName]: fieldValue,

        });
    };
    return (
        <>
            <h1>Регистрация</h1>
            <Formik
                validationSchema={schema}
                onSubmit={handleSubmitForm(dataSignUp)}
                handleChange={handleDataChange(Field)}
                initialValues={dataSignUp}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>

                        <FieldFormikSignUp
                            controlId="formEmail"
                            label="Адрес электронной почты"
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            isInvalid={touched.email && !!errors.email}
                            error={errors.email}
                        />
                        <FieldFormikSignUp
                            controlId="formName"
                            label="Имя"
                            type="text"
                            placeholder="Enter your name (nick name)"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            isInvalid={touched.name && !!errors.name}
                            error={errors.name}
                        />

                        <FieldFormikSignUp
                            controlId="formPassword"
                            label="Пароль"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={touched.password && !!errors.password}
                            error={errors.password}
                        />

                        <FieldFormikSignUp
                            controlId="formPassword2"
                            label="Подтверждение пароля"
                            type="password"
                            placeholder="Password confirmation"
                            name="passwordConfirmation"
                            value={values.passwordConfirmation}
                            onChange={handleChange}
                            isInvalid={touched.passwordConfirmation && !!errors.passwordConfirmation}
                            error={errors.passwordConfirmation}
                        />


                        <Button variant="primary" type="submit">Отправить</Button>


                    </Form>
                )}

            </Formik>
            {error && <Alert>{error}</Alert>}
            <br />
            <p>Уже есть аккаунт? <Link to="/signin">Вход</Link></p>
        </>
    );
}






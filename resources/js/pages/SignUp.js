// страница регистрации
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../utilities/showAlert';
import { selectAuth, register } from '../store/auth.slice';

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errors } = useSelector(selectAuth);

  const [registerInput, setRegister] = useState({
    name: 'test',
    email: 'test@mail.com',
    password: '12312312',
    password_confirmation: '12312312',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegister({ ...registerInput, [name]: value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    dispatch(register(registerInput)).then((data) => {
      if (data) {
        showAlert('Регистрация успешна.', 'success');
        navigate('/signin');
      }
    });

    // axios.get(API_REG_COOKIE).then(response => {
    //     axios.post(API_REGISTER, data).then(res => {
    //         if (res.data.status === 200) {

    //             // console.log(res.data);

    //             localStorage.setItem('auth_token', res.data.token);
    //             localStorage.setItem('auth_name', res.data.username);
    //             swal("Success", res.data.message, "success");
    //             navigate('/');
    //         }
    //     })
    //         .catch(error => {
    //             if (error.response) {
    //                 setRegister({ ...registerInput, error_list: error.response.data.errors });

    //             }
    //         });;
    // });
  };

  return (
    <Form onSubmit={registerSubmit}>
      <h1>Регистрация</h1>
      <Form.Group className='mb-3'>
        <Form.Label>Имя</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter your name'
          name='name'
          onChange={handleInput}
          value={registerInput.name}
        />
        <span className='text-danger'>{errors?.name}</span>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email адрес</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          name='email'
          onChange={handleInput}
          value={registerInput.email}
        />
        <span className='text-danger'>{errors?.email}</span>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          name='password'
          onChange={handleInput}
          value={registerInput.password}
        />
        <span className='text-danger'>{errors?.password}</span>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword2'>
        <Form.Label>Подтверждение пароля</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password confirmation'
          name='password_confirmation'
          onChange={handleInput}
          value={registerInput.password_confirmation}
        />
        <span className='text-danger'>{errors?.password_confirmation}</span>
      </Form.Group>

      <Button variant='primary' type='submit'>
        Отправить
      </Button>
      <hr />
      <p>
        Уже есть аккаунт? <Link to='/signin'>Вход</Link>
      </p>
    </Form>
  );
};

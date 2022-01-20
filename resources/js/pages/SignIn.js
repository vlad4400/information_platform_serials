// страница авторизации
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../utilities/showAlert';
import { selectAuth, login } from '../store/auth.slice';

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errors } = useSelector(selectAuth);

  const [loginInput, setLogin] = useState({
    name: 'test',
    password: '12312312',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLogin({ ...loginInput, [name]: value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    dispatch(login(loginInput)).then((data) => {
      if (data) {
        showAlert('Вход выполнен', 'success');
        navigate('/');
      }
    });

    // axios.get('/sanctum/csrf-cookie').then((response) => {
    //   axios
    //     .post('/api/login', data)
    //     .then((res) => {
    //       if (res.data.status === 200) {
    //         console.log(res.data);
    //         localStorage.setItem('auth_token', res.data.token);
    //         localStorage.setItem('auth_name', res.data.username);
    //         swal('Success', res.data.message, 'success');
    //         navigate('/');
    //       } else if (res.data.status === 401) {
    //         console.log(res.data);
    //         swal('Warning', res.data.message, 'warning');
    //       }
    //     })
    //     .catch((error) => {
    //       if (error.response) {
    //         setLogin({ ...loginInput, error_list: error.response.data.errors });
    //       }
    //     });
    // });
  };

  return (
    <Form onSubmit={loginSubmit}>
      <h1>Авторизация</h1>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Name (Your Login)</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter name'
          name='name'
          onChange={handleInput}
          value={loginInput.name}
        />
        <span className='text-danger'>{errors?.name}</span>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          name='password'
          onChange={handleInput}
          value={loginInput.password}
        />
        <span className='text-danger'>{errors?.password}</span>
      </Form.Group>

      <Button variant='primary' type='submit'>
        Отправить
      </Button>
      <hr />
      <p>
        Нет аккаунта? Зарегистрируйтесь <Link to='/signup'>Регистрация</Link>
      </p>
    </Form>
  );
};

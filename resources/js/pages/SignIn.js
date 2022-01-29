// страница авторизации
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../utilities/showAlert';
import { selectAuth, login, clearErrors } from '../store/auth.slice';

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errors } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const [loginInput, setLogin] = useState({
    name: '',
    password: '',
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
  };

  return (
    <>
      <h2 className='my-3 text-center'>Вход</h2>
      <Row className='mb-3 justify-content-md-center'>
        <Col xs md='4'>
          <Card className='shadow'>
            <Card.Body>
              <Form onSubmit={loginSubmit}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Логин</Form.Label>
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
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    name='password'
                    onChange={handleInput}
                    value={loginInput.password}
                  />
                  <span className='text-danger'>{errors?.password}</span>
                </Form.Group>

                <Button type='submit' style={{ width: '100%' }}>
                  Отправить
                </Button>
                <hr />
                <p>
                  Нет аккаунта? Зарегистрируйтесь{' '}
                  <Link to='/signup'>Регистрация</Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

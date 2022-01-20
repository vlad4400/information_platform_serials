import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../store/auth.slice';
import { showAlert } from '../utilities/showAlert';

export default function TestLoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, set_email] = useState('eve.holt@reqres.in');
  const [password, set_password] = useState('');

  const onRegister = () => {
    dispatch(register({ name: 'test_user', email, password })).then((data) => {
      if (data) {
        showAlert('Регистрация успешна.', 'success');
        navigate('/signin');
      }
    });
  };

  const onLogin = () => {
    dispatch(login({ email, password })).then((data) => {
      if (data) {
        showAlert('Вход выполнен', 'success');
        navigate('/');
      }
    });
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Email'
        onChange={(e) => set_email(e.target.value)}
        value={email}
      />
      <input
        type='text'
        placeholder='Password'
        onChange={(e) => set_password(e.target.value)}
        value={password}
      />
      <button onClick={onLogin}>Логин</button>
      <button onClick={onRegister}>Регистрация</button>
    </div>
  );
}

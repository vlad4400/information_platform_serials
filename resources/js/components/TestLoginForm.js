import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, register } from '../store/auth.slice';

export default function TestLoginForm() {
  const dispatch = useDispatch();
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
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
      <button onClick={() => dispatch(login(email, password))}>Логин</button>
      <button onClick={() => dispatch(register(email, password))}>
        Регистрация
      </button>
    </div>
  );
}

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../store/auth.slice';

export const ProfileSettings = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(selectAuth);
  return (
    <div>
      <h2 className='my-3'>Настройки</h2>
      <p>Привет, {currentUser.username}!</p>
    </div>
  );
};

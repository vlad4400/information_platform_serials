import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container';
import { selectAuth } from '../../store/auth.slice';

export const ProfileSettings = () => {
  const { currentUser } = useSelector(selectAuth);
  return (
    <Container>
      <h2 className='my-3'>О нас.</h2>
      {currentUser && currentUser.username && <p>Привет, {currentUser.username}!</p>}
      <p>Этот сервис предоставлет возможность найти интересный сериал.</p>
      <p>Также можешь узнать даты выхода новых серий, отметить уже просмотренные сериалы.</p>
      <p>Спасибо что остаетсь с нами ;)</p>
      <br/>
      <p>Остались вопросы?</p>
      <p>почта: <b>favserials@test.com</b></p>
      <p>тел.: <b>+666 822 844 111</b></p>
    </Container>
  );
};

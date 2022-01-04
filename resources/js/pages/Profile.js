//страница профиля

import { Navigate } from 'react-router-dom';
//import { useSelector } from "react-redux";
//import { getUser } from "../../store/user/reducer";

export const Profile = () => {
  //  const user = useSelector(getUser);
  const user = true;
  if (user) {
    //если авторизован
    return <h2>Профиль пользователя</h2>;
  } else {
    return <Navigate to='/' />;
    //либо перейти на страницу авторизации/регистрации
  }
};

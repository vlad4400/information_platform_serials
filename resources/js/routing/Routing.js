import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import {
  Layout,
  Admin,
  Users,
  SerialsAdmin,
  Example,
  Profile,
  ProfileSettings,
  Favourites,
  Home,
  Serials,
  SingleSerial,
  FilmInfo,
  SignIn,
  SignUp,
  NotFound,
} from '../pages';
import * as ROUTES from '../constants/routes';

const PrivateOutlet = () => {
  const isAuth = true;

  return isAuth ? <Outlet /> : <Navigate to='/signin' />;
};

export const Routing = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.SERIALS} element={<Serials />} />
        <Route
          path={`${ROUTES.SERIALS}/:serialId`}
          element={<SingleSerial />}
        />
        <Route path={`${ROUTES.SERIALS}/filminfo`} element={<FilmInfo />} />
        <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        <Route path={ROUTES.PROFILE} element={<Profile />}>
          <Route path={ROUTES.FAVOURITES} element={<Favourites />} />
          <Route element={<PrivateOutlet />}>
            <Route path={ROUTES.SETTINGS} element={<ProfileSettings />} />
          </Route>
        </Route>
      </Route>
      <Route path={ROUTES.ADMIN} element={<Admin />}>
        <Route path={ROUTES.USERS} element={<Users />} />
        <Route path={ROUTES.ADMIN_SERIALS} element={<SerialsAdmin />} />
      </Route>
      <Route path='example' element={<Example />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

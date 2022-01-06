import { Routes, Route } from 'react-router-dom';
import {
  Layout,
  Admin,
  Users,
  SerialsAdmin,
  Example,
  Profile,
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
// @placeholder
import SERIALS from './SERIALS.json';

export const Routing = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.SERIALS} element={<Serials serials={SERIALS} />} />
        <Route
          path={`${ROUTES.SERIALS}/:serialId`}
          element={<SingleSerial serials={SERIALS} />}
        />
        <Route path={`${ROUTES.SERIALS}/filminfo`} element={<FilmInfo />} />
        <Route path={ROUTES.PROFILE} element={<Profile />}>
          <Route path={ROUTES.FAVOURITES} element={<Favourites />} />
        </Route>
        <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
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

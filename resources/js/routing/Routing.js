import { Routes, Route } from 'react-router-dom';
import {
  Layout,
  Admin,
  Users,
  Serials,
  Example,
  Favourites,
  Home,
  NotFound,
  Profile,
  SignIn,
  SignUp,
} from '../pages';

export const Routing = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='profile' element={<Profile />} />
        <Route path='favourites' element={<Favourites />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
      </Route>
      <Route path='admin' element={<Admin />}>
        <Route path='users' element={<Users />} />
        <Route path='serials' element={<Serials />} />
      </Route>
      <Route path='example' element={<Example />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

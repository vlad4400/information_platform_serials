import { Routes, Route } from 'react-router-dom';

// Страницы
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { Favorites } from '../pages/Favorites';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Admin } from '../pages/Admin';
import { Example } from '../pages/Example';
import { Users } from '../pages/Admin/pages/Users';
import { SerialsAdmin } from '../pages/Admin/pages/Serials';
import { NotFound } from '../pages/NotFound';
import { FilmInfo } from '../pages/FilmInfo';
import { LogOut } from '../pages/LogOut';


export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="profile" element={<Profile />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="info" element={<FilmInfo />} />
            <Route path="admin" element={<Admin />} >
                <Route path="users" element={<Users />} />
                <Route path="serials" element={<SerialsAdmin />} />
            </Route>
            <Route path="example" element={<Example />} />
            <Route path="logout" element={<LogOut />} />
            <Route path="*" element={<NotFound />} />


        </Routes>
    );
}
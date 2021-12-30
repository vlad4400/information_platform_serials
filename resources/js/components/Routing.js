import { Routes, Route } from 'react-router-dom';

// Страницы
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { Favorites } from '../pages/Favorites';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Adminka } from '../pages/Adminka';
import { Example } from '../pages/Example';
import { Users } from '../pages/Adminka/pages/Users';
import { Serials } from '../pages/Adminka/pages/Serials';
import { NotFound } from '../pages/NotFound';


export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="profile" element={<Profile />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="adminka" element={<Adminka />} >
                <Route path="users" element={<Users />} />
                <Route path="serials" element={<Serials />} />
            </Route>
            <Route path="example" element={<Example />} />
            <Route path="*" element={<NotFound />} />


        </Routes>
    );
}
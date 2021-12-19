
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import { Button } from '@material-ui/core';
import { Home } from './routes/Home';
import { Profile } from './routes/Profile';
import { Chats } from './routes/Chats';
import { Users } from './routes/Users';
import { Login } from './routes/Login';
import { SignUp } from './routes/SignUp';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuth, initAuthAction } from "./store/user/reducer";
import { PublicRoute } from "./hocs/PublicRoute";
import { PrivateRoute } from "./hocs/PrivateRoute";
import { auth, rootRef } from "./firebase";


import './App.css';


export function App() {
    const isAuth = useSelector(getIsAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initAuthAction);
    }, []);

    return (
        <div>

            <BrowserRouter>
                <Button to="/" component={Link}>Home</Button>
                <Button to="/profile" component={Link}>Profile</Button>
                <Button to="/chats" component={Link}>Chats</Button>
                <Button to="/users" component={Link}>Users</Button>
                <Button to="/login" component={Link}>Login</Button>
                <Button to="/signUp" component={Link}>SignUp</Button>
                <Button
                    onClick={() => {
                        auth.signOut();
                    }}
                >
                    Logout
                </Button>
                <Switch>
                    <Route component={Chats} path="/chats" />
                    <Route component={Profile} path="/profile" />
                    <Route component={Users} path="/users" />
                    <Route component={Login} path="/login" />
                    <Route component={SignUp} path="/signUp" />
                    <Route component={Home} path="/" />

                    <PublicRoute auth={isAuth} path={"/signup"} component={SignUp} />
                    <PrivateRoute auth={isAuth} path={"/profile"} component={Profile} />
                </Switch>
            </BrowserRouter>

        </div>
    )
}


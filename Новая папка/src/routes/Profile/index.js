
import React from "react";
import { useSelector } from "react-redux";
import ReactJson from "react-json-view";
import { Stack } from "react-bootstrap";

import { getUser } from "../../store/user/reducer";

import { Route, Redirect } from "react-router-dom";

export const Profile = () => {
    const user = useSelector(getUser);

    if (user) {
        return (


            <Stack gap={3}>
                <h1>PROFILE</h1>
                <ReactJson src={user.toJSON()} />
            </Stack>)
    } else {
        return (
            <Redirect
                to={{
                    pathname: "/home"
                }}
            />)
    }


};




import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from '@material-ui/core';
import { Error } from "../../components/forAPI/Error";
import { Loader } from "../../components/forAPI/Loader";
import { List } from "../../components/forAPI/List";
import { getUsersWithThunk } from '../../store/users/actions';
import { getUsers, getUsersLoading, getUsersError } from '../../store/users/selectors';

export const Users = () => {
    const data = useSelector(getUsers);
    const isLoading = useSelector(getUsersLoading);
    const isError = useSelector(getUsersError);


    const dispatch = useDispatch();

    const getData = () => {
        dispatch(getUsersWithThunk);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            {!isError &&
                <Button onClick={getData} disabled={isLoading}>Recall</Button>
            }

            {isError &&
                (<Error reload={getData} />
                )}

            {
                isLoading &&
                <Loader />
            }
            {
                !isLoading && data.length > 0 &&
                <List list={data} />
            }

        </div>
    );
};

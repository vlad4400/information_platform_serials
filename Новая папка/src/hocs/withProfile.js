import { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_CHECK_PROFILE } from '../store/profile/action';


export const withProfile = (Component) => {
    return (props) => {
        const dispatch = useDispatch();
        const isCheck = useSelector((state) => state.isCheck);
        const toggleShowProfile = () => {
            dispatch({ type: TOGGLE_CHECK_PROFILE })
        }
        return (<Component {...props}
            isCheck={isCheck}
            toggleShowProfile={toggleShowProfile} />)
    }
}
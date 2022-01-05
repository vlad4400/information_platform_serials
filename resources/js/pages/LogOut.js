import { Navigate } from "react-router-dom";

export const LogOut = () => {
    //добавить команду для выхода

    return (
        <Navigate to="/" />
    );
};

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckInputSignUp } from '../utilities/CheckInputSignUp';

export const withSignUp = (Component) => {
    return (props) => {

        let navigate = useNavigate();
        const [email, setEmail] = useState("");
        const [name, setName] = useState("");
        const [password, setPassword] = useState("");
        const [passwordConfirmation, setPasswordConfirmation] = useState("");
        const [error, setError] = useState("");

        const handleEmailChange = (e) => {
            setEmail(e.target.value.trim());
        };

        const handleNameChange = (e) => {
            setName(e.target.value.trim());
        };

        const handlePassChange = (e) => {
            setPassword(e.target.value.trim());
        };

        const handlePassConfirmChange = (e) => {
            setPasswordConfirmation(e.target.value.trim());
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            let Err = CheckInputSignUp(email, name, password, passwordConfirmation);

            if (!Err) {
                try {
                    //     await auth.createUserWithEmailAndPassword(email, password);
                    navigate("/profile");
                } catch (e) {

                    //setError(error + e.toString());
                }
            } else {
                setError(Err);
            }

        };

        return (
            <Component
                {...props}
                error={error}
                email={email}
                name={name}
                password={password}
                passwordConfirmation={passwordConfirmation}
                handleEmailChange={handleEmailChange}
                handleNameChange={handleNameChange}
                handlePassChange={handlePassChange}
                handlePassConfirmChange={handlePassConfirmChange}
                handleSubmit={handleSubmit}
            />)
    }
}
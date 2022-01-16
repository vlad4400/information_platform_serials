import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CheckInputSignUp } from '../components/forSignUp/CheckInputSignUp';
import { FormSignUp } from '../components/forSignUp/FormSignUp';

//import { auth } from "../../firebase";

export const Example = () => {

  let navigate = useNavigate();
  const [error, setError] = useState("");
  const dataSignUp = {
    email: "",
    name: "",
    password: "",
    passwordConfirmation: ""
  };

  const handleSubmit = (data) => {
    let Err = CheckInputSignUp({ data });
    if (!Err) {
      try {
        //     await auth.createUserWithEmailAndPassword(email, password);
        navigate("/profile");
      } catch (e) {

        setError(e.toString());
      }
    } else {
      setError(Err);
    }
  };

  return (
    <>
      <h1>Регистрация</h1>
      <FormSignUp
        Data={dataSignUp}
        onSubmit={handleSubmit}
      />
      {error && <Alert>{error}</Alert>}
      <br />
      <p>Уже есть аккаунт? <Link to="/signin">Вход</Link></p>
    </>
  );
};

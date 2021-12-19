import { Link } from 'react-router-dom';
import { Route, Redirect } from "react-router-dom";


export const Home = () => {



    return (
        <div>
            <h1>HOME</h1>

            <div>
                <Link to="/login">Sign In</Link>
            </div>
            <div>
                <Link to="/signup">Sign Up</Link>
            </div>
        </div >
    );
};


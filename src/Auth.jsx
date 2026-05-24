import { Link, Outlet } from "react-router-dom";
import './Auth.css';

function Auth() {
    return (
        <div className="authToggle">
            <Link to="/">Signup</Link>
            <Link to="/login">Login</Link>
            <div className="authcontent">
            <Outlet/>
            </div>
        </div>
    );
}

export default Auth;
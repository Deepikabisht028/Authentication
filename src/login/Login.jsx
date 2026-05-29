import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import './Login.css'
import { Link,useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [msg, setMsg] = useState("");


    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = JSON.parse(localStorage.getItem(user.email))|| {};
        if (password && password === user.password) {
            navigate("/", {
                state: { username: username }
            });
        }
        else {
            setMsg("Invalid email or password");
        }
    }

    return (
        <div className="container">
            <h1>LOGIN</h1>

            <p className='errmsg'>{msg}</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="Email id" required value={user.email} onChange={handleChange} autoComplete='off' />
                <div className="wrapper">
                    <input type={showPassword ? "text" : "password"} name="password" placeholder="password" value={user.password} onChange={handleChange} required />
                    <span className="icon" onClick={() => setShowPassword(!showPassword)} >
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </div>
                <button type="submit" disabled={!user.email.length || !user.password.length}>Sign in</button>
            </form>
            <p>Create Account ? <Link to='/signup'>Signup</Link></p>
        </div>
    );
}

export default Login;
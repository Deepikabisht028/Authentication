import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import './Login.css'

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [error, setErr] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [msg, setMsg] = useState("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    const pswdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;


    const validateEmail = (email) => {
        if (!emailRegex.test(email)) return "Invalid email";
        return "";
    };

    const validatePassword = (pswd) => {
        if (pswd.length < 8) return "Password length less than 8";
        if (!pswdRegex.test(pswd)) return "Password must contain uppercase, lowercase, number and special character";
        return "";
    };

    const handleBlur = (e) => {
        // Notes: relatedTarget is the target to which the focus is shifted from the current one.
        // ?. is a Optional chaining it accesses a property only if the left side is not null/undefined  
        // So ?. is a safety operator — it short-circuits and returns undefined instead of throwing an error when the left side is null or undefined.
        console.log(e.relatedTarget)
        if (e.relatedTarget?.type === "submit") return;

        const name = e.target.name;
        const value = e.target.value;
        setMsg("");
        name === "email" ?
            setErr((prev) => ({ ...prev, [name]: validateEmail(value) })) :
            setErr((prev) => ({ ...prev, [name]: validatePassword(value) }));
    }

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErr((prev) => ({ ...prev, [e.target.name]: "" }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = validateEmail(user.email);
        const password = validatePassword(user.password);
        if (!email && !password) {
            setMsg(`Hello ${user.email}`);
            console.log(user);
        }
        else {
            setMsg("Invalid email or password");
            setErr({ email: "", password: "" })
        }
    }
    return (
        <div className="container">
            <h1>LOGIN</h1>

            <p className='errmsg'>{msg}</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="Email id" required value={user.email} onChange={handleChange} onBlur={handleBlur} autoComplete='off' />
                <p>{error.email}</p>
                <div className="wrapper">
                    <input type={showPassword ? "text" : "password"} name="password" placeholder="password" value={user.password} onChange={handleChange} onBlur={handleBlur} required />
                    <span className="icon" onClick={() => setShowPassword(!showPassword)} >
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </div>
                <p>{error.password}</p>
                <button type="submit" disabled={!user.email.length || !user.password.length}>Sign in</button>
            </form>
        </div>
    );
}

export default Login;
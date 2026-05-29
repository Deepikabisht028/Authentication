import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import './Signup.css'

function Signup() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        password: "",
        cnfpassword: ""
    })
    const [error, setErr] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        password: "",
        cnfpassword: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [msg, setMsg] = useState("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    const pswdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    const nameRegex = /^[A-Za-z ]+$/;

    const validateName = (name) => {
        if(name === "") return "";
        if (name.length < 3) return "Too short";
        if (!nameRegex.test(name)) return "Only alphabets allowed";
        return "";
    }
    const validateEmail = (email) => {
        if (!emailRegex.test(email)) return "Invalid email";
        return "";
    };

    const validatePassword = (pswd) => {
        if (pswd.length < 8) return "Password length less than 8";
        if (!pswdRegex.test(pswd)) return "Password must contain uppercase, lowercase, number and special character";
        return "";
    };


    const validate = (name, value) => {
        let errMsg = "";

        if (["firstname", "middlename", "lastname"].includes(name))
            errMsg = validateName(value);
        else if (name === "email")
            errMsg = validateEmail(value);
        else if (name === "password")
            errMsg = validatePassword(value);
        else if (name === "cnfpassword")
            errMsg = user.password !== value ? "Passwords do not match" : "";

        setErr((prev) => ({ ...prev, [name]: errMsg }));
        return errMsg === "";
    };

    const handleBlur = (e) => {
        // Notes: relatedTarget is the target to which the focus is shifted from the current one.
        // ?. is a Optional chaining it accesses a property only if the left side is not null/undefined  
        // So ?. is a safety operator — it short-circuits and returns undefined instead of throwing an error when the left side is null or undefined.
        if (e.relatedTarget?.type === "submit") return;

        const name = e.target.name;
        const value = e.target.value;

        setMsg("");
        validate(name, value);

    }

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErr((prev) => ({ ...prev, [e.target.name]: "" }));

        if (e.target.name === "password")
            setErr((prev) => ({ ...prev, cnfpassword: e.target.value !== user.cnfpassword ? "Passwords do not match" : "" }));

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = Object.entries(user).some(([key, value]) => !validate(key, value));
        if (!err) {
            const username = [user.firstname, user.middlename, user.lastname].filter(Boolean).join(" ");
            const password= user.password;
            // setMsg(`Hello ${username}`);
            // console.log(user);
            // setUser({ firstname: "", middlename: "", lastname: "", email: "", password: "", cnfpassword: "" })
            // setErr({ firstname: "", middlename: "", lastname: "", email: "", password: "", cnfpassword: "" })
            localStorage.setItem(user.email,JSON.stringify({
                username, password
            }))

            navigate("/", {
                state: { username: username }
            });
        }
        return false;

    }
    return (
        <div className="container">
            <h1>Sign up</h1>

            <p className='errmsg'>{msg}</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstname" placeholder='First Name' value={user.firstname} required onChange={handleChange} onBlur={handleBlur} />
                <p>{error.firstname}</p>
                <input type="text" name="middlename" placeholder='Middle Name' value={user.middlename} onChange={handleChange} onBlur={handleBlur} />
                <p>{error.middlename}</p>
                <input type="text" name="lastname" placeholder='Last Name' value={user.lastname} required onChange={handleChange} onBlur={handleBlur} />
                <p>{error.lastname}</p>
                <input type="text" name="email" placeholder="Email id" required value={user.email} onChange={handleChange} onBlur={handleBlur} autoComplete='off' />
                <p>{error.email}</p>
                <div className="wrapper">
                    <input type={showPassword ? "text" : "password"} name="password" placeholder="password" value={user.password} onChange={handleChange} onBlur={handleBlur} required />
                    <span className="icon" onClick={() => setShowPassword(!showPassword)} >
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </div>
                <p>{error.password}</p>
                <input type="text" name="cnfpassword" placeholder="confirm password" value={user.cnfpassword} onChange={handleChange} onBlur={handleBlur} required />
                <p>{error.cnfpassword}</p>
                {/* Object.values gives all the value of the object passed to it / Object.entries() which gives you [key, value] pairs
                 some() is a array method it return true is even one element matches the condition in this code case that is if field is empty or not */}
                <button type="submit" disabled={Object.entries(user).some(([key, value]) => key !== "middlename" && !value) || user.password !== user.cnfpassword}>Sign up</button>
            </form>
            <p>Already have an account ? <Link to='/login'>Login</Link></p>
        </div>
    );
}

export default Signup;
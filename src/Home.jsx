import { Navigate, useLocation, useNavigate } from "react-router-dom";

function MainPage({ username }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/login");
    }
    return(
    <div>
        {`Hello ${username}`}
        <button onClick={handleClick}>Logout</button>
    </div>);
}

function Home() {
    const location = useLocation();
    const username = location.state?.username;
    console.log(username);
    //const email= location.state?.email;
    //localStorage.removeItem(email);

    return (
         username? <MainPage username={username}/> :<Navigate to='/login'/>
    );
}

export default Home;
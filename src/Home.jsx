import { Navigate,useNavigate } from "react-router-dom";

function MainPage({ username }) {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.removeItem('loggedInUser');
        navigate("/login");
    }
    return(
    <div>
        {`Hello ${username}`}
        <button onClick={handleClick}>Logout</button>
    </div>);
}

function Home() {
    const username=JSON.parse(localStorage.getItem('loggedInUser'))|| "";
    console.log(username);
    
    return (
         username? <MainPage username={username}/> :<Navigate to='/login'/>
    );
}

export default Home;
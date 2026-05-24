import { useLocation } from "react-router-dom";

function Home() {
    const location=useLocation();
    const username= location.state?.username;
    return (
        <div>
           {`Hello ${username}`}
        </div>
    );
}

export default Home;
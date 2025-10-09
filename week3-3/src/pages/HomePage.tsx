import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const HomePage = () => {
    return( 

    <>
        <Navbar />
        <Outlet />
        <h1></h1>
    </>
    );
};

export default HomePage;
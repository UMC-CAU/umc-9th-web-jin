import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
    return (
    <div className="flex flex-col justify-center items-center">
        <Navbar />
        <Outlet />
    </div>
    );
};

export default HomeLayout;

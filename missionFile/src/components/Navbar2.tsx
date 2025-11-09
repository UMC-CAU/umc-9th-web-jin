import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar2 = () => {
    const { accessToken } = useAuth();


    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
            <div className="flex items-center justify-between p-4">
                <Link
                to="/"
                className="text-xl font-bold text-gray-900 dark:text-white"
                >SpinningSpinning Dolimpan</Link>
                <div className="space-x-6">

                {!accessToken && (
                <>
                <Link
                to={"/login"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Login</Link>
                <Link
                to={"/signup"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Sign Up</Link>
                </>
                )}
                </div>
                
                {accessToken && (
                <Link
                to={"/my"} 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                My Page
                </Link>
                )}
                <Link
                to={"/search"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                Search
                </Link>
            </div>
        </nav>
    );
};

export default Navbar2;
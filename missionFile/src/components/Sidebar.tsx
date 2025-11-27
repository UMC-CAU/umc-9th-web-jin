import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose}: SidebarProps) => {
    
    const { accessToken } = useAuth();

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscape);

        return() => {
            window.removeEventListener("keydown", handleEscape);
        };

    }, [isOpen, onClose])

    return(
        <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-70
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}>
            <aside
            className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transtion-transform duration-300 ease-in-out z-50 
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            role="dialog">
            <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">돌려돌려 LP판</h2>
                </div>

          <nav className="flex flex-col overflow-y-auto p-4 space-y-2">
            {!accessToken && (
              <>
                <Link
                  to={"/"}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                  onClick={onClose}>
                Home
                </Link>
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                  onClick={onClose}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                  onClick={onClose}
                >
                  Sign Up
                </Link>
              </>
            )}

            {accessToken && (
              <Link
                to="/my"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                onClick={onClose}
              >
                My Page
              </Link>
            )}

            <Link
              to="/search"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              onClick={onClose}
            >
              Search
            </Link>
          </nav>
            </div>

            </aside>
        </div>
    );
};

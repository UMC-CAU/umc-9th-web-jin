import { NavLink } from "react-router-dom"

const LINKS = [
    { to: '/', label: 'HOME'},
    { to: '/login', label: 'Log in'},
    { to: '/signup', label: 'Sign up'},
    { to: '/my', label: 'My Page'},
]

export const Navbar = () => {
    return (
        <div className="bg-blue-300  w-sm min-w-sm flex flex-row justify-center rounded-3xl text-md m-4">
            {LINKS.map(({ to, label }) => (
                <NavLink
                key = {to} 
                to = {to}
                className={({ isActive }) => {
                    return isActive? 'text-blue-600 font-bold m-3' : 'text-black-600 m-3'
                }}
                >
                {label}
                </NavLink>
            ))}
        </div>
    );
};

export default Navbar;
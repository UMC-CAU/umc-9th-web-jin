import { useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6"
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const Navbar = () => {

    const { amount, cartItems } = useCartInfo();
    const { calculateTotals } = useCartActions();

    useEffect(() => {
        calculateTotals();
    }, [cartItems, calculateTotals]);

    return(
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 onClick={() => {window.location.href = '/'}} className="text-2xl font-semibold cursor-pointer">JIN</h1>
            <div className="flex items-center space-x-2">
                <FaCartShopping className="text-2xl" />
                <span className="text-xl font-medium">{amount}</span>
            </div>
        </div>
    )
};

export default Navbar;
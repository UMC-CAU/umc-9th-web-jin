
import { useDispatch, useSelector } from "../hooks/useCustonRedux";
import { clearCart } from "../slices/cartSlice";
import { closeModal } from "../slices/modalSlice";


const ModalAlert = () => {
        const { message, isOpen } = useSelector((state) => state.modal);

        const dispatch = useDispatch();
    
        const handleConfirm = () => {
            dispatch(clearCart());
            dispatch(closeModal());
        };

        const handleClose = () => {
            dispatch(closeModal());
        };

        if(!isOpen) return null;

    return isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <p className="mb-4 text-center font-bold">{message}</p>
            <div className="flex gap-5">
                <button onClick={handleClose} 
                className="bg-gray-200 border-5 border-gray-200 rounded-sm ">아니요</button>
                <button onClick={handleConfirm} 
                className="bg-red-500 border-5 border-red-500 rounded-sm text-white px-2">네</button>
            </div>
            </div>
        </div>
        ) : null;
};

export default ModalAlert;
import { useDispatch, useSelector } from "../hooks/useCustonRedux";
import { openModal } from "../slices/modalSlice";
import ModalAlert from "./Modal";

const Pricebox = () => {

    const { total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(openModal("정말 삭제하시겠습니까?"))
    }

    return (
        <div className="py-12 flex justify-between">
        <button onClick={handleOpenModal} className="border border-gray-300 m-4 rounded-md cursor-pointer shadow-md font-bold py-1 px-2">장바구니 초기화</button>
        <ModalAlert />
        <div className="m-2 py-1 mr-3">
        총 가격: {total}원
        </div>
        </div>
    );
}

export default Pricebox;
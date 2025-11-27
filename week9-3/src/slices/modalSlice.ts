import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
    message: string;
    isOpen: boolean;
};

const initialState: ModalState = {
    message: '',
    isOpen: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
            state.isOpen = true;
        },

        closeModal: (state) => {
            state.isOpen = false;
            state.message = "";
        },
    },
});



export const { openModal, closeModal } = modalSlice.actions

const modalReducer = modalSlice.reducer

export default modalReducer;
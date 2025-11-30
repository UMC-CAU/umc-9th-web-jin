import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

interface ModalActions {
    openModal: (message: string) => void;
    closeModal: () => void;
}


interface ModalState {
    message: string;
    isOpen: boolean;

    actions: ModalActions
}

export const useModal = create<ModalState>()(
    immer((set) => ({
        message: "",
        isOpen: false,

        actions: {
            openModal: (message: string) => {
                set((state) => {
                    state.message = message;
                    state.isOpen = true;
                });
            },

            closeModal: () => {
                set((state) => {
                    state.message = "",
                        state.isOpen = false;
                })
            }
        }
    }))
);

export const useModalInfo = () => useModal(
    useShallow((state) => ({
        message: state.message,
        isOpen: state.isOpen,
    }))
);

export const useModalActions = () => useModal((state) => state.actions);

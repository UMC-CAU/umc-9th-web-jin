import cartItems from "../constants/cartItems";
import type { CartItems } from "../types/cart";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
 cartItems: CartItems;
 amount: number;
 total: number;
}

const initialState: CartState = {
    cartItems: cartItems,
    amount: 0,
    total: 0,
};

// cartSlice 생성
// cartSlice -> reduxToolkit에서 제공

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // TODO증가
        increase: (state, action: PayloadAction<{id: string}>) => {
            const itemId = action.payload.id

            // 이 아이디를 통해서, 전체 음반 중에 내가 클릭한 음반을 찾기
            const item = state.cartItems.find((CartItem) => CartItem.id === itemId);

            if (item) {
                item.amount += 1;
            }
        },

        // TODO감소
        decrease: (state, action: PayloadAction<{id: string}>) => {
            const itemId = action.payload.id

            // 이 아이디를 통해서, 전체 음반 중에 내가 클릭한 음반을 찾기
            const item = state.cartItems.find((CartItem) => CartItem.id === itemId);

            if (item) {
                item.amount -= 1;
            }
        },
        // TODO삭제
        removeItem: (state, action: PayloadAction<{id: string}>) => {
            const itemId = action.payload.id
            state.cartItems = state.cartItems.filter(
                (cartItem) => cartItem.id !== itemId
            );
        },

        // TODO 장바구니 비우기
        clearCart: (state) => {
            state.cartItems = [];
        },

        // TODO 총액 계산
        calculateTotals: (state) => {
            let amout = 0;
            let total = 0;
            
            state.cartItems.forEach((item) => {
                amout += item.amount;
                total += item.amount * item.price;
            });

            state.amount = amout;
            state.total = total;
        },
    }
});

export const {increase, decrease, removeItem, clearCart, calculateTotals} = cartSlice.actions

// duck patter reducer는 export default를 내보내야 함
const cartReducer = cartSlice.reducer;

export default cartReducer;
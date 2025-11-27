import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CounterActions {
    increment: () => void;
    decrement: () => void;
    random: () => void;
}

interface CounterState {
    count: number;
    randomNumber: number;

    actions: CounterActions;
}

export const useCounterStore = create<CounterState>()(
    devtools((set) => ({
        count: 0,
        randomNumber: 0,

        actions: {
            increment: () =>
                set(
                    (state) => ({
                        count: state.count + 1,
                    }),
                    false,
                    "increment"
                ),

            decrement: () =>
                set(
                    (state) => ({
                        count: state.count - 1,
                    }),
                    false,
                    "decrement"
                ),

            random: () =>
                set(
                    () => ({
                        randomNumber: Math.floor(Math.random() * 100),
                    }),
                    false,
                    "random"
                ),
        },
    }))
);


// action에 관한 훅을 하나 만들 수 있다

export const useCounterActions = (): CounterActions =>
    useCounterStore((state) => state.actions);


// Atomic Selector => 모든 값은 개별로 꺼내야 한다는 규칙
// actions의 객체는 한 번 정의했기에 함수의 참조가 바뀌지 않음
// 컴포넌트가 항상 동일한 객체를 바라보기 때문에 렌더링에 문제가 없음
import { useShallow } from "zustand/shallow"
import { useCounterStore } from "../stores/counterStore"


export default function RandomNumberGenerater() {

    const { randomNUmber, random } = useCounterStore(
        useShallow((state) => ({
            randomNUmber: state.randomNumber,
            random: state.actions.random,
        }))
    );
    return(
        <div>
            <h1>{randomNUmber}</h1>
            <button onClick={random}>랜덤 번호 생성기</button>
        </div>
    )
}
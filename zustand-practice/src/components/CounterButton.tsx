import { useCounterActions } from "../stores/counterStore"

export default function CounterButton() {

    const {increment, decrement} = useCounterActions();

    return(
        <>
        <button onClick={increment}>+ 1</button>
        <button onClick={decrement}>- 1</button>
        </>
    )
}
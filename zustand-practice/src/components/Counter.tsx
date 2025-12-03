import { useCounterStore } from "../stores/counterStore"

export default function Counter() {

    const count = useCounterStore((state) => state.count);
    
    return(
        <div>
            <h1>{count}</h1>
        </div>
    )
}
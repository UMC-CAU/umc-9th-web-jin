import { useEffect, useRef, useState } from "react";

// 주어진 값이 자주 변경될 때 밀리초 간격으로 업데이트를 해 성능을 개선
function useThrottle<T>(value:T, delay = 500):T{

    // throttledVlaue: 최종적으로 적용된 값
    const [throttledValue, setThrottledValue] = useState<T>(value);

    // Ref 변수 마지막으로 실행된 시간을 기록하는 변수
    // useRef 사용하면 컴포넌트가 리런더링 되어도 값을 유지
    const lastExecuted = useRef<number>(Date.now());

    useEffect(() => {
        // 현재시각과 저장된 마지막 시간 + 인터벌을 비교
        // 충분한 시간이 지나면 바로 업데이트
        if (Date.now() >= lastExecuted.current + delay) {
        // 최신 value를 저장해서 컴포넌트 리렌더링
        setThrottledValue(value);
        } else {
            const timerId = setTimeout(() => {
                lastExecuted.current = Date.now();
            }, delay)

        return () => clearTimeout(timerId)
        }
    }, [value, delay]);

    return throttledValue
}

export default useThrottle;
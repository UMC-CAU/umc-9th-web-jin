import { memo } from "react";

interface ICountButton {
    onClick: (number: number) => void;
}

const CountButton = memo(({ onClick }: ICountButton) => {
    console.log("CountButton render");
    return (
        <button className="border p-2 rounded-lg"
            onClick={() => onClick(10)}>
            카운트 증가
        </button>
    )
});

export default memo(CountButton);

import { memo } from "react";
interface ITextInput {
    onChange: (text: string) => void;
}

const TextInput = ({ onChange }: ITextInput) => {
    console.log('TextInput rendered');

    return (
        <input
            className="border p-2 rounded-lg"
            type="text"
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default memo(TextInput);

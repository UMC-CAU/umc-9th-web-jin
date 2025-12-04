interface LanguageOption {
    value: string;
    label: string;
}

interface LanguageSelectorProps {
    className?: string;
    options: LanguageOption[];
    value: string;
    onChange: (value: string) => void;
}

const LanguageSelector = ({
    value,
    onChange,
    options,
    className = "",
}: LanguageSelectorProps) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focu:ring-2 focus-blue-500 ${className}`} >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default LanguageSelector;
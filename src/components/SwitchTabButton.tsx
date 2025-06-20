interface SwitchTabButtonProps {
    isActive: boolean;
    onClick: () => void;
    label: string;
}

const SwitchTabButton = ({ isActive, onClick, label } : SwitchTabButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`p-2 shadow-xl w-30 rounded-xl
                hover:bg-(--color-primary-dark-blue) hover:text-white
                ${isActive ? 'bg-(--color-primary-dark-blue) text-white' : 'bg-white text-(--color-primary-dark-blue)'}
            `}
        >
            {label}
        </button>
    );
};

export default SwitchTabButton;
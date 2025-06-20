interface SwitchTabButtonProps {
    isActive: boolean;
    onClick: () => void;
    label: string;
}

const SwitchTabButton = ({ isActive, onClick, label } : SwitchTabButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`p-2 rounded shadow-xl w-30 rounded-xl
                hover:bg-(--color-switch-tab-button-blue) hover:text-white
                ${isActive ? 'bg-(--color-switch-tab-button-blue) text-white' : 'bg-white text-(--color-switch-tab-button-blue)'}
            `}
        >
            {label}
        </button>
    );
};

export default SwitchTabButton;
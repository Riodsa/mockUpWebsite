import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PhilosophyIconProps {
    icon: any;
    text: string;
}

const PhilosophyIcon = ({ icon, text }: PhilosophyIconProps) => {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md">
                <FontAwesomeIcon icon={icon} className="text-[80px]" />
            </div>
            <span className="mt-10">{text}</span>
        </div>
    );
};

export default PhilosophyIcon;

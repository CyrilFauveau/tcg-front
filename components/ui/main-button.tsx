import { Button } from "./button";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface BoosterButtonProps {
    children: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

const BoosterButton = ({ 
    children, 
    onClick, 
    disabled = false, 
    className = "",
}: BoosterButtonProps) => {
    const buttonClasses = `rounded-full p-5 pr-15 pl-15 border-white border-3 bg-cyan-400 ${className}`;

    return (
        <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
                duration: 0.3,
                ease: "easeOut"
            }}
        >
            <Button
                className={buttonClasses}
                style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                onClick={onClick}
                disabled={disabled}
            >
                {children}
            </Button>
        </motion.div>
    );
};

export default BoosterButton;


import { X } from "lucide-react";
import { motion } from "motion/react";
import Image from 'next/image';
import { useEffect } from "react";

interface CardModalProps {
    cardId: number;
    isOpen: boolean;
    onClose: () => void;
}

const CardModal = ({ cardId, isOpen, onClose }: CardModalProps) => {
    useEffect(() => {
        if (isOpen) {
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
            // Prevent viewport changes on mobile
            document.documentElement.style.position = 'fixed';
            document.documentElement.style.width = '100%';
        } else {
            // Restore body scroll when modal is closed
            document.body.style.overflow = 'unset';
            document.documentElement.style.position = '';
            document.documentElement.style.width = '';
        }

        return () => {
            // Cleanup on unmount
            document.body.style.overflow = 'unset';
            document.documentElement.style.position = '';
            document.documentElement.style.width = '';
        };
    }, [isOpen]);
    
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 backdrop-blur-xs flex items-end z-20"
            onClick={onClose}
        >
            <motion.div 
                className="w-full bg-white"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ 
                    type: "spring",
                    damping: 25,
                    stiffness: 300
                }}
                style={{
                    borderRadius: "30px 30px 0 0",
                    boxShadow: "0 0 16px rgba(0,0,0,0.8)"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <figure className="flex justify-center relative w-2/3 m-auto mt-8 mb-24">
                    <Image
                        src={`https://gateway.pinata.cloud/ipfs/bafybeiepdsl75s4mmedwilueuqjfpk3ryoumkh2yham6wsb57xhjxzx3ra/${cardId}.jpg`}
                        alt={`Card #${cardId}`}
                        width={300}
                        height={0}
                        className="h-auto rounded-lg shadow-lg"
                    />
                </figure>

                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center mb-5">
                    <div
                        className="bg-white p-3 rounded-full"
                        style={{boxShadow: "0 0 10px rgba(0,0,0,0.2)"}}
                    >
                       <X onClick={onClose} className="" size={24} />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CardModal;
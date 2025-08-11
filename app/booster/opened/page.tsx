'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from "motion/react";
import Image from 'next/image';
import MainButton from "@/components/ui/main-button";
import Back from "@/components/shared/Back";

const OpenedCardsPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const cardIdsParam = searchParams.get('cards');
    
    const cardIds = cardIdsParam ? cardIdsParam.split(',').map(id => parseInt(id)) : [];

    const handleClose = () => {
        router.push('/collection');
    };

    if (cardIds.length === 0) {
        return (
            <div className="container mx-auto">
                <Back />
                <div className="text-center mt-8">
                    <h2 className="text-xl font-bold mb-4">No Cards Found</h2>
                    <p>No cards were opened in this session.</p>
                    <MainButton 
                        onClick={handleClose}
                        className="mt-4"
                    >
                        Next
                    </MainButton>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-center flex-wrap mt-20">
                {cardIds.map((cardId, index) => (
                    <motion.div
                        key={cardId}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            delay: index * 0.5 + 1,
                            duration: 0.5,
                        }}
                        className="flex justify-center w-1/3 p-2"
                    >
                        <Image
                            src={`https://gateway.pinata.cloud/ipfs/bafybeiepdsl75s4mmedwilueuqjfpk3ryoumkh2yham6wsb57xhjxzx3ra/${cardId}.jpg`}
                            alt={`Card #${cardId}`}
                            width={300}
                            height={0}
                            className="w-full h-auto"
                            style={{
                                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                                borderRadius: "4px"
                            }}
                        />
                    </motion.div>
                ))}
            </div>

            <motion.div 
                className="text-center absolute left-0 right-0 bottom-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <MainButton onClick={handleClose}>
                    Next
                </MainButton>
            </motion.div>
        </div>
    );
};

export default OpenedCardsPage;

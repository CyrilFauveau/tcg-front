'use client';
import { contractAbi, contractAddress } from "@/constants";
import { useEffect } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { decodeEventLog } from "viem";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { toast } from "sonner";
import Image from 'next/image';
import BoosterTimer, { useBoosterTimer } from "@/components/shared/BoosterTimer";
import { motion } from "motion/react";
import { useRouter } from 'next/navigation';
import MainButton from "@/components/ui/main-button";

const OpenBooster = () => {
    const { address } = useAccount();
    const { isReady } = useBoosterTimer(address);
    const router = useRouter();

    const { data: hash, isPending, error, writeContract } = useWriteContract();

    const openBooster = async () => {
        try {
            writeContract({
                address: contractAddress,
                abi: contractAbi,
                functionName: "openBooster",
                account: address,
            });
        } catch (e) {
            console.error(e);
            toast("An error occurred during transaction");
        }
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed, data: receipt } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (isConfirmed && receipt && address) {
            const boosterOpenedEvent = receipt.logs.find(log => {
                try {
                    const decodedLog = decodeEventLog({
                        abi: contractAbi,
                        data: log.data,
                        topics: log.topics,
                    });
                    return decodedLog.eventName === 'BoosterOpened';
                } catch {
                    return false;
                }
            });

            if (boosterOpenedEvent) {
                try {
                    const decodedLog = decodeEventLog({
                        abi: contractAbi,
                        data: boosterOpenedEvent.data,
                        topics: boosterOpenedEvent.topics,
                    });
                    
                    if (decodedLog.eventName === 'BoosterOpened') {
                        const args = decodedLog.args as unknown as { user: string; cardIds: number[] };
                        if (args.user === address && args.cardIds) {
                            const cardIdsParam = args.cardIds.join(',');
                            router.push(`/booster/opened?cards=${cardIdsParam}`);
                        }
                    }
                } catch (error) {
                    console.error('Error decoding BoosterOpened event:', error);
                }
            }
        }
    }, [isConfirmed, receipt, address, router]);

    return (
        <>
            <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 1, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                    duration: 0.3,
                    ease: "easeOut"
                }}
            >
                <Image
                    src="/images/pokemon-booster.jpg"
                    alt="booster image"
                    width="200"
                    height="0"
                />
            </motion.div>

            <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                    duration: 0.3,
                    ease: "easeOut"
                }}
            >
                <MainButton
                    className="mt-10"
                    onClick={openBooster}
                    disabled={isPending || isConfirming || !isReady}
                >
                    {isPending || isConfirming ? "Opening..." : "Open"}
                </MainButton>
            </motion.div>
            
            <motion.div 
                className="flex justify-center items-center mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                    duration: 0.3,
                    ease: "easeOut"
                }}
            >
                <BoosterTimer />
            </motion.div>

            {error && (
                <Alert className="mt-5 w-full">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
            )}
        </>
    );
}


export default OpenBooster;

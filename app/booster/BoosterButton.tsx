'use client';
import { contractAbi, contractAddress } from "@/constants";
import { useEffect } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import { Toaster, toast } from "sonner";
import Image from 'next/image';
import BoosterTimer, { useBoosterTimer } from "@/components/shared/BoosterTimer";

const OpenBooster = () => {

    const { address } = useAccount();
    const { isReady } = useBoosterTimer(address);

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

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (isConfirmed) {
            toast("Booster has been opened successfully");
        }
    }, [isConfirmed]);

    return (
        <>
            <figure className="flex justify-center mt-8">
                <Image
                    src="/images/pokemon-booster.jpg"
                    alt="booster image"
                    width="200"
                    height="0"
                />
            </figure>

            <div className="flex justify-center">
                <Button
                    className="rounded-full mt-10 p-5 pr-15 pl-15 bg-cyan-400 border-white border-3"
                    style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                    onClick={openBooster}
                    disabled={isPending || isConfirming || !isReady}
                >
                    {isPending || isConfirming ? "Opening..." : "Open"}
                </Button>
            </div>
            
            <div className="flex justify-center items-center mt-3">
                <BoosterTimer />
            </div>

            {error && (
                <Alert className="mt-5 w-full">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
            )}

            <Toaster />
        </>
    );
}

export default OpenBooster;
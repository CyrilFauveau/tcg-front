'use client';
import { contractAbi, contractAddress } from "@/constants";
import { useEffect } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import { Toaster, toast } from "sonner";
import Image from 'next/image';
import BoosterTimer from "@/components/shared/BoosterTimer";

const OpenBooster = () => {

    const { address } = useAccount();

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
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (isConfirmed) {
            toast("Booster has been opened successfully");
        }
    }, [isConfirmed]);

    return (
        <div className="relative bg-neutral-100 rounded-xl p-5 mt-5 shadow-[inset_0_0_5px_0_rgba(0,0,0,0.1)]">
            <figure className="flex justify-center p-5">
                <Image
                    src="/images/pokemon-booster.jpg"
                    alt="booster image"
                    width="180"
                    height="0"
                />
            </figure>

            <div className="flex justify-center">
                <Button
                    className="mt-5 rounded-full"
                    onClick={openBooster}
                    disabled={isPending || isConfirming}
                >
                    {isPending || isConfirming ? "Opening..." : "Open a booster"}
                </Button>

            </div>
            
            <div id="booster-timer">
                <BoosterTimer />
            </div>

            {error && (
                <Alert className="mt-5 w-full">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
            )}

            <Toaster />
        </div>
    );
};

export default OpenBooster;
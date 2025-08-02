'use client';
import { contractAbi, contractAddress } from "@/constants";
import { useEffect } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Toaster, toast } from "sonner";

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
        <>
            <div className="flex gap-5">
                <Button
                    className="mt-5"
                    onClick={openBooster}
                    disabled={isPending || isConfirming}
                >
                    {isPending || isConfirming ? "Opening..." : "Open a booster"}
                </Button>
            </div>

            {error && (
                <Alert className="mt-5 w-6/12">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
            )}

            <Toaster />
        </>
    )
}

export default OpenBooster;
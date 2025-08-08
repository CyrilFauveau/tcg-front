'use client';
import { contractAbi, contractAddress } from "@/constants";
import { useAccount, useReadContract } from "wagmi";
import { useState } from "react";
import { motion } from "motion/react";
import Image from 'next/image';

const DisplayCollection = () => {

    const { address } = useAccount();
    const [displayAll, setDisplayAll] = useState(false);

    const { data: collection, isLoading, error } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "getCardsByUser",
        args: [address],
        account: address,
    });

    const { data: totalCards } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "COLLECTION_CARDS_NUMBER",
    });

    if (isLoading || totalCards === undefined) return <p>Loading...</p>;
    if (error) return <p>Error while fetching collection data.</p>;

    const ownedMap: Record<number, number> = {};
    if (Array.isArray(collection) && collection[0]?.length > 0) {
        collection[0].forEach((cardId: number, idx: number) => {
            ownedMap[cardId] = collection[1][idx];
        });
    }

    const toggleDisplay = () => {
        setDisplayAll((prev) => !prev);
    }

    const cards = [];
    for (let cardId = 1; cardId <= Number(totalCards); cardId++) {
        const amount = ownedMap[cardId] || 0;
        const owned = amount > 0;
        if (displayAll ||owned) {
            cards.push(
                <li
                    className="list-none relative"
                    key={cardId}
                >
                    {owned ? (
                        <>
                            <Image
                                src={`https://gateway.pinata.cloud/ipfs/bafybeiepdsl75s4mmedwilueuqjfpk3ryoumkh2yham6wsb57xhjxzx3ra/${cardId}.jpg`}
                                alt={`Card #${cardId}`}
                                width={100}
                                height={100}
                                className="w-full h-auto"
                            />
                            <span
                                className={`absolute left-0 bottom-0 bg-gray-600 text-white text-xs font-bold ${displayAll ? "pr-4 pl-4" : "pr-6 pl-6"}`}
                                style={{borderRadius: "0 var(--radius-sm) 0 var(--radius-sm)"}}
                            >
                                {amount}
                            </span>
                        </>
                    ) : (
                        <div className="aspect-[3/4] rounded-xs flex justify-center flex-col shadow-[inset_0_0_10px_0_rgba(0,0,0,0.2)] w-full h-full">
                            <span className="block text-center text-xl font-bold text-neutral-400">{cardId}</span>
                        </div>
                    )}
                </li>
            );
        }
    }

    return (
        <>
            <button
                className={`toggle-container ${displayAll ? "bg-cyan-400" : "bg-neutral-100"} mb-5 shadow-[inset_0_0_10px_0_rgba(0,0,0,0.2)]`}
                style={{
                    width: 60,
                    height: 30,
                    borderRadius: 50,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: displayAll ? "flex-end" : "flex-start",
                    transition: "justify-content 0.3s ease-in-out",
                }}
                onClick={toggleDisplay}
            >
                <motion.div
                    className="toggle-handle"
                    style={{
                        width: 30,
                        height: 30,
                        backgroundColor: "white",
                        borderRadius: "50%",
                        boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                    }}
                    layout
                    transition={{
                        type: "spring",
                        visualDuration: 0.2,
                        bounce: 0.2,
                    }}
                />
            </button>

            <ul className={`grid ${displayAll ? "grid-cols-5 gap-1" : "grid-cols-3 gap-2"} p-0`}>
                {cards}
            </ul>
        </>
    );
}

export default DisplayCollection;
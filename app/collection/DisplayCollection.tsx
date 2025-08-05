'use client';
import { contractAbi, contractAddress } from "@/constants";
import { useAccount, useReadContract } from "wagmi";
import Image from 'next/image';

const DisplayCollection = () => {

    const { address } = useAccount();

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

    // Prepare a map of cardId to amount owned
    const ownedMap: Record<number, number> = {};
    if (Array.isArray(collection) && collection[0]?.length > 0) {
        collection[0].forEach((cardId: number, idx: number) => {
            ownedMap[cardId] = collection[1][idx];
        });
    }

    const cards = [];
    for (let cardId = 1; cardId <= Number(totalCards); cardId++) {
        const amount = ownedMap[cardId] || 0;
        const owned = amount > 0;
        cards.push(
            <li
                className="list-none"
                key={cardId}
            >
                {owned ? (
                    <Image
                        src={`https://gateway.pinata.cloud/ipfs/bafybeiepdsl75s4mmedwilueuqjfpk3ryoumkh2yham6wsb57xhjxzx3ra/${cardId}.jpg`}
                        alt={`Card #${cardId}`}
                        width={80}
                        height={0}
                    />
                ) : (
                    <div style={{ width: 80, height: 115 }} className="rounded-sm flex justify-center flex-col shadow-[inset_0_0_5px_0_rgba(0,0,0,0.1)]">
                        <span className="block text-center text-xl text-neutral-400">{cardId}</span>
                    </div>
                )}
            </li>
        );
    }

    return (
        <ul className="grid grid-cols-4 gap-2 p-0">
            {cards}
        </ul>
    );
}

export default DisplayCollection;
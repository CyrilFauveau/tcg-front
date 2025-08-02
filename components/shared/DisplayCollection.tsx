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

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error while fetching collection data.</p>;

    return (
        <>
            {Array.isArray(collection) && collection[0]?.length > 0 ? (
                <ul style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: 0 }}>
                    {collection[0].map((cardId: number, amount: number) => (
                        <li key={cardId} style={{ listStyle: "none", textAlign: "center" }}>
                            <Image
                                src={`https://gateway.pinata.cloud/ipfs/bafybeiepdsl75s4mmedwilueuqjfpk3ryoumkh2yham6wsb57xhjxzx3ra/${cardId}.jpg`}
                                alt={`Card #${cardId}`}
                                width={100}
                                height={0}
                            />
                            <div>Card #{cardId}</div>
                            <div>Amount: {collection[1][amount]}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No cards in your collection.</p>
            )}
        </>
    )
}

export default DisplayCollection;
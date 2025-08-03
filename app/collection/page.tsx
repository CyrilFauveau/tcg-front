'use client';
import { useAccount } from "wagmi";
import DisplayCollection from "@/app/collection/DisplayCollection";
import NotConnected from "@/components/shared/NotConnected";

export default function CollectionPage() {
  const { isConnected } = useAccount();

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl font-bold mb-10 mt-5">My Collection</h1>
      {isConnected ? (
        <DisplayCollection />
      ) : (
        <NotConnected />
      )}
    </div>
  );
} 
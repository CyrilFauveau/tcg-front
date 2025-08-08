'use client';
import { useAccount } from "wagmi";
import DisplayCollection from "@/app/collection/DisplayCollection";
import NotConnected from "@/components/shared/NotConnected";

export default function CollectionPage() {
  const { isConnected } = useAccount();

  return (
    <div className="container mx-auto">      
      {isConnected ? (
        <DisplayCollection />
      ) : (
        <NotConnected />
      )}
    </div>
  );
} 
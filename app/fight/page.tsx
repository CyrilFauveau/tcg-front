'use client';
import { useAccount } from "wagmi";
import NotConnected from "@/components/shared/NotConnected";

export default function FightPage() {
  const { isConnected } = useAccount();

  return (
    <div className="container mx-auto">
      {isConnected ? (
        <></>
      ) : (
        <NotConnected />
      )}
    </div>
  );
} 
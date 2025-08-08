'use client';
import { useAccount } from "wagmi";
import NotConnected from "@/components/shared/NotConnected";
import BoosterButton from "@/app/booster/BoosterButton";
import Back from "@/components/shared/Back";

export default function BoosterPage() {
  const { isConnected } = useAccount();

  return (
    <div className="container mx-auto">
      {isConnected ? (
        <>
          <BoosterButton />
          <Back />
        </>
      ) : (
        <NotConnected />
      )}
    </div>
  );
} 
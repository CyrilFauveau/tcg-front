'use client';
import { useAccount } from "wagmi";
import NotConnected from "@/components/shared/NotConnected";
import OpenBooster from "@/app/booster/OpenBooster";
import Back from "@/components/shared/Back";

export default function BoosterPage() {
  const { isConnected } = useAccount();

  return (
    <div className="container mx-auto">
      {isConnected ? (
        <>
          <OpenBooster />
          <Back />
        </>
      ) : (
        <NotConnected />
      )}
    </div>
  );
} 
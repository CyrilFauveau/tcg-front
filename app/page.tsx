'use client';
import { useAccount } from "wagmi";
import OpenBooster from "@/components/shared/OpenBooster";
import NotConnected from "@/components/shared/NotConnected";

export default function Home() {

  const { isConnected } = useAccount();

  return (
    <>
       {isConnected ? (
        <OpenBooster />
      ) : (
        <NotConnected />
      )}
    </>
  );
}

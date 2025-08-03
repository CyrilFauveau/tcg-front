'use client';
import { useAccount } from "wagmi";
import OpenBooster from "@/app/home/OpenBooster";
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

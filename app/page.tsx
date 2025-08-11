'use client';
import { useAccount } from "wagmi";
import Booster from "@/app/home/Booster";
import NotConnected from "@/components/shared/NotConnected";

export default function Home() {

  const { isConnected } = useAccount();

  return (
    <>
       {isConnected ? (
        <Booster />
      ) : (
        <NotConnected />
      )}
    </>
  );
}

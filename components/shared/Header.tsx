'use client';
import { contractAbi, contractAddress } from "@/constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));

  const { address } = useAccount();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { data: lastBoosterTimestamp } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "lastBoosterTimestamp",
    args: [address],
    account: address,
  });

  const { data: boosterDelay } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "BOOSTER_OPENING_DELAY",
    args: [],
    account: address,
  });

  const lastBoosterTimestampNum = typeof lastBoosterTimestamp === 'bigint'
    ? Number(lastBoosterTimestamp)
    : typeof lastBoosterTimestamp === 'number'
      ? lastBoosterTimestamp
      : 0;

  const boosterDelayNum = typeof boosterDelay === 'bigint'
    ? Number(boosterDelay)
    : typeof boosterDelay === 'number'
      ? boosterDelay
      : 0;

  const timeLeft = lastBoosterTimestampNum + boosterDelayNum - currentTime;
  
  // Format time display
  const formatTimeLeft = (seconds: number) => {
    if (seconds <= 0) return "Ready!";
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="flex bg-neutral-100 p-5 pt-2 pb-2 shadow-md gap-5">
      <div className="w-1/6 aspect-square bg-neutral-300 rounded-full">

      </div>

      <div className="w-3/6 flex flex-col justify-center">
        <ConnectButton />
      </div>

      <div className="w-2/6 flex items-center justify-center">
        <span className="text-sm font-medium">
          {formatTimeLeft(timeLeft)}
        </span>
      </div>
    </div>
  );
}

export default Header;
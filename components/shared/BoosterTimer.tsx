'use client';
import { contractAbi, contractAddress } from "@/constants";
import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";
import { History } from "lucide-react";


const BoosterTimer = () => {
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
    <div className="flex items-center justify-center p-2 text-sm">
        <History />{formatTimeLeft(timeLeft)}
    </div>
  );
}

export default BoosterTimer;
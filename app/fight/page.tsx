'use client';
import { useAccount } from "wagmi";
import NotConnected from "@/components/shared/NotConnected";

export default function FightPage() {
  const { isConnected } = useAccount();

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Battle Arena</h1>
      {isConnected ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Pokemon Battles</h2>
            <p className="text-gray-600">
              Challenge other players to epic Pokemon battles using your collection.
            </p>
            {/* Add battle features here */}
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-500">Battle system coming soon...</p>
            </div>
          </div>
        </div>
      ) : (
        <NotConnected />
      )}
    </div>
  );
} 
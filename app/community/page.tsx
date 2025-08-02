'use client';
import { useAccount } from "wagmi";
import NotConnected from "@/components/shared/NotConnected";

export default function CommunityPage() {
  const { isConnected } = useAccount();

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Community</h1>
      {isConnected ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Community Features</h2>
            <p className="text-gray-600">
              Connect with other Pokemon TCG players, share your collection, and participate in community events.
            </p>
            {/* Add community features here */}
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-500">Community features coming soon...</p>
            </div>
          </div>
        </div>
      ) : (
        <NotConnected />
      )}
    </div>
  );
} 
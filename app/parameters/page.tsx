'use client';
import { useAccount } from "wagmi";
import NotConnected from "@/components/shared/NotConnected";

export default function ParametersPage() {
  const { isConnected } = useAccount();

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      {isConnected ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">App Settings</h2>
            <p className="text-gray-600">
              Manage your account settings, preferences, and app configuration.
            </p>
            {/* Add settings features here */}
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-500">Settings panel coming soon...</p>
            </div>
          </div>
        </div>
      ) : (
        <NotConnected />
      )}
    </div>
  );
} 
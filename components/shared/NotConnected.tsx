import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const NotConnected = () => {
  return (
    <Alert className="bg-orange-400 w-full mt-3">
      <Terminal />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Please connect your wallet.
      </AlertDescription>
    </Alert>
  );
}

export default NotConnected;
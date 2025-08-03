import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const NotConnected = () => {
  return (
    <Alert className="bg-[#F29F05] w-full mt-10">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Please connect your wallet.
      </AlertDescription>
    </Alert>
  );
}

export default NotConnected;
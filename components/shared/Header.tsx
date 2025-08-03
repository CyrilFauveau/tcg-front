import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <div className="flex justify-between items-center w-full p-5">
        <h1 className="text-2xl ml-5">Pokemon TCG</h1>
        <div className="flex justify-between items-center gap-x-5">
          <ConnectButton />
        </div>
    </div>
  );
}

export default Header;
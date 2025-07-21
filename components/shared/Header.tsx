import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <div className="flex justify-between items-center w-full p-5">
        <div className="text-2xl ml-5">Pokemon TCG</div>
        <div className="flex justify-between items-center gap-x-5">
          <ConnectButton />
        </div>
    </div>
  );
}

export default Header;
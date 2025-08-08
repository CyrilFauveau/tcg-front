import { ConnectButton } from "@rainbow-me/rainbowkit";

const HomeHeader = () => {
  return (
    <div className="flex p-5 pt-2 pb-2 shadow-md gap-5 bg-white">
      <div className="w-1/6 aspect-square bg-neutral-300 rounded-full"></div>

      <div className="w-3/6 flex flex-col justify-center">
        <ConnectButton />
      </div>
    </div>
  );
}

export default HomeHeader;
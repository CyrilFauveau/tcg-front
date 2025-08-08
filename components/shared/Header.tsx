import { usePathname } from "next/navigation";

const Header = () => {

    const pathname = usePathname();

    const titleMap: Record<string, string> = {
        "/booster": "Booster",
        "/collection": "Collection",
        "/community": "Community",
        "/fight": "Battle Arena",
      };
    
      const title = titleMap[pathname] || "Title";

    return (
        <div className="bg-white mb-5 pb-1 shadow-md">
            <h1 className="text-center text-2xl font-bold p-5">
                {title}
            </h1>

            <div className="h-1 bg-cyan-400"></div>
        </div>
    );
}

export default Header;
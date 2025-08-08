import { motion } from "motion/react";
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

            <motion.div
                className="h-1 bg-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ 
                    duration: 0.5,
                    ease: "easeOut"
                }}>

            </motion.div>
        </div>
    );
}

export default Header;
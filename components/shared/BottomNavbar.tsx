import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Home, Book, Users, Swords, Ellipsis } from "lucide-react";
import Link from "next/link";

const BottomNavbar = () => {
  const navItems = [
    {
      href: "/",
      icon: Home,
      label: "Home",
    },
    {
      href: "/collection",
      icon: Book,
      label: "Collection",
    },
    {
      href: "/community",
      icon: Users,
      label: "Community",
    },
    {
      href: "/fight",
      icon: Swords,
      label: "Fight",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <NavigationMenu className="w-full max-w-full">
        <NavigationMenuList className="flex justify-around w-full">
          {navItems.map((item) => (
            <NavigationMenuItem key={item.href} className="flex-1 w-20">
              <NavigationMenuLink asChild>
                <Link href={item.href} className="flex flex-col items-center justify-center py-2 px-3 hover:bg-gray-50 transition-colors w-full">
                  <item.icon className="h-5 w-5 mb-2 mt-2" />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem key="/parameters" className="flex-1">
              <NavigationMenuLink asChild>
                <Link href="/parameters" className="flex flex-col items-center justify-center py-2 px-3 hover:bg-gray-50 transition-colors w-full">
                  <Ellipsis className="h-5 w-5 mb-2 mt-2" />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default BottomNavbar; 
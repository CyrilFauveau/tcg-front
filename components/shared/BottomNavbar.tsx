'use client';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Home, Book, Users, Swords, Ellipsis } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavbar = () => {
  const pathname = usePathname();
  
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
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <NavigationMenuItem key={item.href} className="flex-1 w-20">
                <NavigationMenuLink asChild>
                  <Link 
                    href={item.href} 
                    className={`flex flex-col items-center justify-center py-2 px-3 hover:bg-gray-50 transition-colors w-full ${
                      isActive ? 'font-bold text-black-600' : ''
                    }`}
                  >
                    <item.icon className={`h-5 w-5 mb-2 mt-2 ${
                      isActive ? 'text-black-600' : ''
                    }`} />
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
          <NavigationMenuItem key="/parameters" className="flex-1">
            <NavigationMenuLink asChild>
              <Link 
                href="/parameters" 
                className={`flex flex-col items-center justify-center py-2 px-3 hover:bg-gray-50 transition-colors w-full ${
                  pathname === "/parameters" ? 'font-bold text-blue-600' : ''
                }`}
              >
                <Ellipsis className={`h-5 w-5 mb-2 mt-2 ${
                  pathname === "/parameters" ? 'text-blue-600' : ''
                }`} />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default BottomNavbar; 
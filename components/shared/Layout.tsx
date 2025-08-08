'use client';
import HomeHeader from "@/components/shared/HomeHeader";
import Header from "@/components/shared/Header";
import BottomNavbar from "@/components/shared/BottomNavbar";
import { usePathname } from 'next/navigation';

const Layout = ({ children }: {children: React.ReactNode }) => {

  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className="flex flex-col">
      {isHome ? (
        <HomeHeader />
      ) : (
        <Header />
      )}
      
      <div className="grow p-5 pb-20">
        {children}
      </div>

      <BottomNavbar />
    </div>
  );
}

export default Layout;
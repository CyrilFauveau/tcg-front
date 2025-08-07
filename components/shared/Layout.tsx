import Header from "@/components/shared/Header";
import BottomNavbar from "@/components/shared/BottomNavbar";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      
      <div className="grow p-5 pb-20">
        {children}
      </div>

      <BottomNavbar />
    </div>
  );
}

export default Layout;
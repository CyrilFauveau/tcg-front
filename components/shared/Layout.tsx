import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";


const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
        <Header />

        <div className="grow p-5">
          {children}
        </div>

        <Footer />
    </div>
  );
}

export default Layout;
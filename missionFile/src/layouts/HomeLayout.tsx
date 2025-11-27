import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import SidebarMenu from "../components/SidebarMenu";

const HomeLayout = () => {
    return (
    <div className="h-dvh flex flex-col">
        <SidebarMenu />
        <main className="flex-1 mt-10">
        <Outlet />
        </main>
        <Footer />
    </div>
    );
};

export default HomeLayout;

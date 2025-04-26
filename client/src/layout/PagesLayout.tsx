import SideBar from "@/components/SideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const PagesLayout = () => {
  return (
    <SidebarProvider>
      <SideBar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default PagesLayout;

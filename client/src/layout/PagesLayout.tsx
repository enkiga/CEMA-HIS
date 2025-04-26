import AppSideBar from "@/components/AppSideBar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const PagesLayout = () => {
  return (
    <SidebarProvider>
      <AppSideBar />
      <main>
        <SidebarTrigger />
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </main>
    </SidebarProvider>
  );
};

export default PagesLayout;

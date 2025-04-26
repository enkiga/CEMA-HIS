import AppSideBar from "@/components/AppSideBar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const PagesLayout = () => {
  const [currentRoute, setCurrentRoute] = useState("/");
  const { pathname } = useLocation();

  // Update pathname if it is / rename it to Dashboard for /clients  change to Clients and /projects to Projects
  useEffect(() => {
    if (pathname === "/") {
      setCurrentRoute("Dashboard");
    } else if (pathname === "/clients") {
      setCurrentRoute("Clients");
    } else if (pathname === "/projects") {
      setCurrentRoute("Projects");
    } else {
      setCurrentRoute(pathname);
    }
  }, [pathname]);

  return (
    <SidebarProvider>
      <AppSideBar />
      <SidebarInset>
        <header className="flex items-center gap-2 px-4 py-2 border-b">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-lg font-semibold text-gray-800">
            {currentRoute}
          </h1>
        </header>
        <div className="p-4 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PagesLayout;

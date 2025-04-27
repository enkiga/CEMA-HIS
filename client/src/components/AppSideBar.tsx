import NavLinkList from "@/constants/NavLinks";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronRight, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Logo } from "@/assets";

import { NavLink, useNavigate } from "react-router";
import { useUser } from "@/context/UserContext";
import { doctor } from "@/api";

const AppSideBar = () => {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const { user, loading } = useUser();

  // Check if user is loading
  if (loading) {
    return <></>;
  }

  // Logout function
  const handleLogout = async () => {
    try {
      await doctor.signout();
      // reload the page after logout
      window.location.reload(); // Redirect to the login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <Sidebar collapsible="icon">
      {/* Sidebar Header with Logo that is collapsible to only logo */}
      <SidebarHeader className="flex items-start justify-between px-4 py-2">
        <img src={Logo} alt="Logo" className="h-4 w-4 " />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {NavLinkList.map((link) => (
              <SidebarMenuItem key={link.title}>
                <NavLink
                  to={link.url}
                  className={({ isActive }) =>
                    isActive ? "text-blue-500 font-semibold" : ""
                  }
                >
                  <SidebarMenuButton tooltip={link.title} key={link.title}>
                    {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                    <span>{link.title}</span>
                  </SidebarMenuButton>
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="" alt="User Avatar" />
                    <AvatarFallback className="rounded-lg">JD</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                  <ChevronRight className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;

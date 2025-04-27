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
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Logo } from "@/assets";

import { NavLink } from "react-router";
import { useUser } from "@/context/UserContext";
import { doctor } from "@/api";

const AppSideBar = () => {
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

  // Function to get initials from the user's name
  const getInitials = (name?: string) => {
    // Fallback to "US" if name is not provided
    if (!name) return "US";
    // Split the name by spaces and take the first letter of each part, then join them and convert to uppercase
    // Limit to 2 characters
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // Check if user is not available
  // If user is not available, return an empty sidebar
  if (loading || !user) {
    return <div className="w-[--sidebar-width] bg-background border-r" />;
  }

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
                    <AvatarFallback className="rounded-lg">
                      {getInitials(user?.doctor?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.doctor?.name || "Unknown User"}
                    </span>
                    <span className="truncate text-xs">
                      {user?.doctor?.email || "No email provided"}
                    </span>
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

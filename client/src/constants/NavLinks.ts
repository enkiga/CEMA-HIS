import { FilesIcon, HomeIcon, Users2Icon } from "lucide-react";

// Define the structure of the navigation link
const NavLinkList = [
  {
    title: "Dashboard",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Clients",
    url: "/clients",
    icon: Users2Icon,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: FilesIcon,
  },
];

export default NavLinkList;

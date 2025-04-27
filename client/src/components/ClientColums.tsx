import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Trash2, ArrowDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export type Client = {
  _id: string;
  name: string;
  email: string;
  programEnrolled: number;
  createdAt: string;
  updatedAt: string;
};

// Define the columns for the client table
// Each column is defined with an accessor key, header, and cell renderer
export const clientColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full flex items-center justify-between"
        >
          Name
          <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-sm font-medium text-muted-foreground w-full flex items-center justify-between">
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full flex items-center justify-between"
        >
          Email
          <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "programEnrolled",
    // Get the length of the programEnrolled array and center it
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full flex items-center justify-between"
        >
          Enrolled Projects
          <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const enrolledProjects = row.getValue("programEnrolled") as any[];
      return (
        <div className="text-sm font-medium text-muted-foreground">
          {enrolledProjects.length}
        </div>
      );
    },
  },

  {
    accessorKey: "action",
    header: "Action",
    // Setting up the action column to be a dropdown menu with view and delete options
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        // Define the meta object to include the onClientClick and onClientDelete functions
        onClientClick?: (clientId: string) => void;
        onClientDelete?: (clientId: string) => Promise<void>;
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center w-full h-full">
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => meta.onClientClick?.(row.original._id)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-red-500"
              onClick={() => meta.onClientDelete?.(row.original._id)}
            >
              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

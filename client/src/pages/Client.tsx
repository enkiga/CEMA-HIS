import { Button } from "@/components/ui/button";
import { Edit, Eye, MoreHorizontal, PlusIcon, Search, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

type Props = {};

const Client = ({}: Props) => {
  return (
    <section className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="flex items-center">
          {/* Search Bar */}
          <div className="flex flex-1 items-center">
            <Input
              type="text"
              placeholder="Search Clients..."
              className="w-full max-w-sm"
            />
            <Button className="ml-1">
              <Search />
            </Button>
          </div>

          <Button variant="outline" className="gap-2">
            <PlusIcon /> <span>Add New Client</span>
          </Button>
        </div>
        {/* Table for clients */}
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead className="text-center">Client Name</TableHead>
              <TableHead className="text-center">Email Address</TableHead>
              <TableHead className="text-center">Projects</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Table rows */}
            <TableRow className="hover:bg-muted/50">
              <TableCell className="font-medium">1</TableCell>
              <TableCell className="text-center">John Doe</TableCell>
              <TableCell className="text-center">Contact Info</TableCell>
              <TableCell className="text-center">3</TableCell>
              <TableCell className="flex gap-2 items-center justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                  <DropdownMenuItem><Eye/> <span>View</span></DropdownMenuItem>
                    <DropdownMenuItem><Edit/> <span>Edit</span></DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">
                      <Trash2 className="text-red-500"/> <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableCaption className="text-muted-foreground">
            A list of clients and their details. You can add, edit, or delete
            clients.
          </TableCaption>
        </Table>
      </div>
    </section>
  );
};

export default Client;

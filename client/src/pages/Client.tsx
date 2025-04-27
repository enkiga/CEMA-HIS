import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, Search, Trash2 } from "lucide-react";
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
import ClientForm from "@/components/ClientForm";
import { client } from "@/api";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

type Props = {};

const Client = ({}: Props) => {
  // Fetch clients from the API
  const [clientsData, setClientsData] = useState<any>();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // handle loading state
  const navigate = useNavigate();

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const response = await client.getAllClients();
      setClientsData(response.data || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [refreshTrigger]);

  // handle navgigation to client details page
  const handleClientClick = (clientId: string) => {
    navigate(`/clients/${clientId}`);
  };

  // handle client deletion
  const handleClientDelete = async (clientId: string) => {
    try {
      await client.deleteClient(clientId);
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  return (
    <section className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="flex items-center flex-col md:flex-row md:justify-between gap-2 md:gap-0">
          {/* Search Bar */}
          <div className="flex flex-1 w-full md:w-fit items-center">
            <Input
              type="text"
              placeholder="Search Clients..."
              className="w-full max-w-sm"
            />
            <Button className="ml-1">
              <Search />
            </Button>
          </div>

          <ClientForm
            onClientAdded={() => setRefreshTrigger((prev) => prev + 1)}
          />
        </div>
        {/* Table for clients */}
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <h1 className="text-lg font-semibold">Loading</h1>
            <div className=" ml-2 animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : clientsData?.length === 0 ? (
          <div className="flex flex-col gap-2 rounded-md border bg-white p-4 shadow-md dark:bg-slate-800 mt-3">
            <h1 className="text-lg font-semibold">No Clients Found</h1>
            <p className="text-sm font-semibold">Please add a client.</p>
          </div>
        ) : (
          <Table className="w-full flex-1">
            <TableHeader>
              <TableRow>
                <TableHead className="text-start">Client Name</TableHead>
                <TableHead className="text-start">Email Address</TableHead>
                <TableHead className="text-center">Projects</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Table rows */}
              {clientsData?.map((client: any) => (
                <TableRow className="hover:bg-muted/50" key={client._id}>
                  <TableCell className="text-start">{client.name}</TableCell>
                  <TableCell className="text-start">{client.email}</TableCell>
                  <TableCell className="text-center">
                    {client.programEnrolled.length}
                  </TableCell>
                  <TableCell className="flex gap-2 items-center justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <MoreHorizontal className="cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleClientClick(client._id)}
                        >
                          <Eye /> <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => handleClientDelete(client._id)}
                        >
                          <Trash2 className="text-red-500" />{" "}
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption className="text-muted-foreground">
              A list of clients and their details. You can add, edit, or delete
              clients.
            </TableCaption>
          </Table>
        )}
      </div>
      <Outlet />
    </section>
  );
};

export default Client;

import ClientForm from "@/components/ClientForm";
import { client } from "@/api";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ClientDataTable } from "@/components/ClientDataTable";
import { clientColumns } from "@/components/ClientColums";

type Props = {};

const Client = ({}: Props) => {
  // Fetch clients from the API
  const [clientsData, setClientsData] = useState<any>();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // handle loading state
  const navigate = useNavigate();

  async function fetchClients() {
    setIsLoading(true);
    try {
      const response = await client.getAllClients();
      setClientsData(response.data || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchClients();
  }, [refreshTrigger]);

  // handle navigation to client details page
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
          <div>
            {/* Client count */}
            <p className="ml-2 text-xl font-semibold">
              {clientsData?.length}{" "}
              {clientsData?.length === 1 ? "Client" : "Clients"}
            </p>
          </div>

          <ClientForm
            onClientAdded={() => setRefreshTrigger((prev) => prev + 1)}
          />
        </div>
        {/* Client Data Table */}
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <p>Loading...</p>
          </div>
        ) : clientsData && clientsData.length > 0 ? (
          <ClientDataTable
            columns={clientColumns}
            data={clientsData}
            onClientClick={handleClientClick}
            onClientDelete={handleClientDelete}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p>No Clients Found</p>
          </div>
        )}
      </div>
      <Outlet />
    </section>
  );
};

export default Client;

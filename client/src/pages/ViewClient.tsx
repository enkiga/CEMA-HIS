import { client } from "@/api";
import EnrollForm from "@/components/EnrollForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewClient = () => {
  // fetch client id from the URL
  const { id } = useParams();
  const clientId = id as string;
  const [clientData, setClientData] = useState<any>();

  // fetch client data from the API
  const fetchClient = async () => {
    try {
      const response = await client.getClientById(clientId!);
      setClientData(response.data || []);
    } catch (error) {
      console.error("Error fetching client:", error);
    }
  };

  useEffect(() => {
    fetchClient();
  }, [clientId]);

  console.log("clientData", clientData);
  return (
    <section className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-2 rounded-md border bg-white p-4 shadow-md dark:bg-slate-800 mt-3">
        <h1 className="text-lg font-semibold">Client Details</h1>
        <div className="flex flex-row gap-2">
          <p className="text-sm font-semibold">Client ID:</p>
          <p className="text-sm">{clientData?._id}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p className="text-sm font-semibold">Client Name:</p>
          <p className="text-sm">{clientData?.name}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p className="text-sm font-semibold">Client Email:</p>
          <p className="text-sm">{clientData?.email}</p>
        </div>

        <div className="flex flex-row gap-2">
          <p className="text-sm font-semibold">Client Created At:</p>
          {/* Date format dd/mm/yy */}
          <p className="text-sm">
            {new Date(clientData?.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <p className="text-sm font-semibold">Client Updated At:</p>
          <p className="text-sm">
            {new Date(clientData?.updatedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-md border bg-white p-4 shadow-md dark:bg-slate-800">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-lg font-semibold">Client Enrolled Projects</h1>
          <EnrollForm
            clientId={clientData?._id}
            onProjectEnrolled={fetchClient}
          />
        </div>
        {clientData?.programEnrolled?.length === 0 ? (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">No Projects Enrolled</p>
            <p className="text-sm">Please enroll the client in a project.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {clientData?.programEnrolled?.map((project: any, index: number) => (
              <div key={project._id} className="flex flex-row gap-2">
                <p className="text-sm font-semibold">{index + 1} :</p>
                <p className="text-sm">{project.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ViewClient;

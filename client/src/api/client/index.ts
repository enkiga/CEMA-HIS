import medium from "../medium";

// Getting all clients
export const getAllClients = async () => {
  try {
    const response = await medium.get("/client/all-clients");
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

// Getting Client by ID
export const getClientById = async (id: string) => {
  try {
    const response = await medium.get(`/client/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client:", error);
    throw error;
  }
};

// Creating a new client
export const createClient = async (clientData: any) => {
  try {
    const response = await medium.post("/client/add-client", clientData);
    return response.data;
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
};

// Deleting a client
export const deleteClient = async (id: string) => {
  try {
    const response = await medium.delete(`/client/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};

// Enrolling a client in a project
export const enrollClientInProject = async (
  clientId: string,
  projectId: string
) => {
  try {
    const response = await medium.patch(`/client/${clientId}/enroll/`, {
      programId: projectId,
    });
    return response.data;
  } catch (error) {
    console.error("Error enrolling client in project:", error);
    throw error;
  }
};

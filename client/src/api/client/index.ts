import medium from "../medium";



export const getAllClients = async () => {
    try {
        const response = await medium.get("/client/all-clients");
        return response.data;
    } catch (error) {
        console.error("Error fetching clients:", error);
        throw error;
    }
}

export const getClientById = async (id: string) => {
    try {
        const response = await medium.get(`/client/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching client:", error);
        throw error;
    }
}

export const createClient = async (clientData: any) => {
    try {
        const response = await medium.post("/client/add-client", clientData);
        return response.data;
    } catch (error) {
        console.error("Error creating client:", error);
        throw error;
    }
}

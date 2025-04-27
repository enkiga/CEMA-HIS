import medium from "../medium";

export const getAllProjects = async () => {
  try {
    const response = await medium.get("/program/all-programs");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const createProject = async (projectData: any) => {
  try {
    const response = await medium.post("/program/create-program", projectData);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  try {
    const response = await medium.delete(`/program/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

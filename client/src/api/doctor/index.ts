import medium from "../medium";

// Signing up a new doctor
export const signup = async (data: any) => {
  // trycatch block to handle errors
  try {
    const response = await medium.post("/auth/signup", data);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

// Signing in an existing doctor
export const signin = async (data: any) => {
  // trycatch block to handle errors
  try {
    const response = await medium.post("/auth/signin", data);
    return response.data;
  } catch (error) {
    console.error("Error during signin:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

// Signing out the current doctor
export const signout = async () => {
  // trycatch block to handle errors
  try {
    const response = await medium.post("/auth/signout");
    return response.data;
  } catch (error) {
    console.error("Error during signout:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

// Getting the current doctor's data
export const getDoctor = async () => {
    // trycatch block to handle errors
    try {
        const response = await medium.get("/auth/doctor");
        return response.data;
    } catch (error) {
        console.error("Error fetching doctor data:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
}

// get all doctors
export const getAllDoctors = async () => {
    // trycatch block to handle errors
    try {
        const response = await medium.get("/auth/doctors");
        return response.data;
    } catch (error) {
        console.error("Error fetching all doctors data:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
}

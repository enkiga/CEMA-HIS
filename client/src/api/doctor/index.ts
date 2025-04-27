import client from "../client";

export const signup = async (data: any) => {
  // trycatch block to handle errors
  try {
    const response = await client.post("/auth/signup", data);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export const signin = async (data: any) => {
  // trycatch block to handle errors
  try {
    const response = await client.post("/auth/signin", data);
    return response.data;
  } catch (error) {
    console.error("Error during signin:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export const signout = async () => {
  // trycatch block to handle errors
  try {
    const response = await client.post("/auth/signout");
    return response.data;
  } catch (error) {
    console.error("Error during signout:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

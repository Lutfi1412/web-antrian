import axios from "axios";

export const fetchAllNumber = async (): Promise<any> => {
  try {
    const response = await axios.get(
      "https://api-antrian.vercel.app/api/alldetail"
    );
    console.log("API Response:", response.data);
    return response.data.data.queues || []; // Return an empty array if no queues
  } catch (error) {
    console.error("Error fetching queue data:", error);
    throw error; // Rethrow error to be handled in the caller
  }
};

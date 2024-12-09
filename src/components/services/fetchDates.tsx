import axios from "axios";

export const fetchDates = async (): Promise<any> => {
  try {
    const response = await axios.get("https://api-antrian.vercel.app/api/date");
    return response.data.data.dates || []; // Return an empty array if no dates
  } catch (error) {
    console.error("Error fetching dates:", error);
    throw error; // Rethrow error to be handled in the caller
  }
};

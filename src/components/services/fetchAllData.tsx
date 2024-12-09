import axios from "axios";

export const fetchAllData = async () => {
  try {
    const response = await axios.get(
      "https://api-alldata.vercel.app/api/alldata"
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching queue data:", error);
    throw error;
  }
};

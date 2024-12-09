import axios from "axios";

// Function to fetch the latest queue number
export const fetchQueueNumber = async (): Promise<number> => {
  try {
    const response = await axios.get(
      "https://api-antrian.vercel.app/api/jumlahantrian"
    );
    return response.data.data.jumlah_antrian; // Adjust to match backend response field
  } catch (error) {
    console.error("Error fetching queue number:", error);
    throw error; // Rethrow to handle it in the component if needed
  }
};

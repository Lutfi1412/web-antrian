import axios from "axios";

export const deleteDate = async (tanggal: string): Promise<void> => {
  try {
    const response = await axios.post(
      "https://api-antrian.vercel.app/api/delete",
      {
        tanggal,
      }
    );
    console.log("Tanggal berhasil dihapus:", response.data);
  } catch (error) {
    console.error("Error in deleteDate:", error);
    throw error;
  }
};

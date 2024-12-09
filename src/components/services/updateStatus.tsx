import axios from "axios";

export const updateStatus = async (
  id: number,
  status: string,
  loket: string,
  selected: string
): Promise<any> => {
  try {
    const response = await axios.post(
      "https://api-antrian.vercel.app/api/update",
      {
        id,
        status,
        loket,
        selected,
      }
    );
    console.log("Tanggal berhasil dihapus:", response.data);
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error while updating status");
  }
};

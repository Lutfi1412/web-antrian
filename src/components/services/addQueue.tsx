import axios from "axios";

export const addQueueNumber = async (queueNumber: number): Promise<void> => {
  try {
    await axios.post("https://api-antrian.vercel.app/api/insert", {
      queue_number: queueNumber,
    });
    console.log("Queue number added successfully : ", queueNumber);
  } catch (error) {
    console.error("Error adding queue number:", error);
    throw error; // Rethrow to handle it in the component if needed
  }
};

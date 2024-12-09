import { FC, useState, useEffect } from "react";
import { CardNomor } from "../layout";
import { addQueueNumber, fetchQueueNumber } from "../services";
import { useNavigate } from "react-router-dom";
import { validateNomor, isTokenExpired } from "../utils";
import { LottieBank } from "../common/index";

const NomorPage: FC = () => {
  const [queueNumber, setQueueNumber] = useState<number>(0);
  const navigate = useNavigate();

  // Function to load the latest queue number
  const loadQueueNumber = async () => {
    try {
      const number = await fetchQueueNumber();
      setQueueNumber(number);
    } catch (error) {
      console.error("Failed to load queue number:", error);
    }
  };

  const handleAddQueue = async () => {
    try {
      await addQueueNumber(queueNumber + 1);
      loadQueueNumber(); // Reload queue number after adding
    } catch (error) {
      console.error("Failed to add queue number:", error);
    }
  };
  // Check and remove expired token
  const checkAndRemoveExpiredToken = () => {
    const nomorToken = localStorage.getItem("nomor");

    if (nomorToken && isTokenExpired(nomorToken)) {
      localStorage.removeItem("nomor");
      navigate("/login/nomor");
    }
    if (!validateNomor(nomorToken)) {
      navigate("/login/nomor");
      return;
    }
  };

  useEffect(() => {
    checkAndRemoveExpiredToken();
    loadQueueNumber();
  }, []);

  return (
    <div className="container pt-5">
      <div className="row justify-content-center">
        {" "}
        {/* justify-content-center untuk mobile */}
        <div className="col-12 col-lg-5 mb-4">
          {" "}
          {/* col-12 untuk mobile, col-lg-5 untuk desktop */}
          <div className="px-4 py-3 mb-4 bg-white rounded-2 shadow-sm">
            <div className="d-flex align-items-center me-md-auto">
              <i className="bi-people-fill text-success me-3 fs-3"></i>
              <h1 className="h5 pt-2">Nomor Antrian</h1>
            </div>
          </div>
          {/* Pass handleAddQueue and queueNumber as props to CardNomor */}
          <CardNomor
            handleAddQueue={handleAddQueue}
            queueNumber={queueNumber}
          />
        </div>
      </div>
      <footer className="footer mt-auto mb-4 d-flex justify-content-center align-items-center ">
        <LottieBank height="50px" width="50px" />
        <span className="ms-2">Copyright by Lutfi Bank</span>
      </footer>
    </div>
  );
};

export default NomorPage;

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { CardPanggilan } from "../layout";
import "../../App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { fetchAllData } from "../services";
import { LottieBank } from "../common/index";

const CustomerPage: React.FC = () => {
  const [queueData, setQueueData] = useState<{
    jumlah_antrian: number;
    antrian_selanjutnya: string;
    sisa_antrian: number;
    antrian_loket_1: string;
    antrian_loket_2: string;
    antrian_loket_3: string;
  } | null>(null);

  // Fetch data function
  const fetchData = async () => {
    try {
      const data = await fetchAllData();
      setQueueData(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
  }, []);

  console.log(queueData);

  const toggleFullscreen = () => {
    const element = document.documentElement; // Fullscreen untuk seluruh dokumen
    if (!document.fullscreenElement) {
      element.requestFullscreen?.().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err.message);
      });
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div>
      <div className="container d-flex align-items-center justify-content-center">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-4 mb-6">
            <CardPanggilan
              jumlah={() => queueData?.jumlah_antrian ?? "0"}
              className="bi-people text-warning"
              className2="text-warning"
            >
              Jumlah Antrian
            </CardPanggilan>
          </div>
          <div className="col-md-4 mb-6">
            <CardPanggilan
              jumlah={() => queueData?.antrian_selanjutnya ?? "0"}
              className="bi-person-plus text-info"
              className2="text-info"
            >
              Antrian Selanjutnya
            </CardPanggilan>
          </div>
          <div className="col-md-4 mb-6">
            <CardPanggilan
              jumlah={() => queueData?.sisa_antrian ?? "0"}
              className="bi-person text-danger"
              className2="text-danger"
            >
              Sisa Antrian
            </CardPanggilan>
          </div>
          <div className="col-md-4 mb-6">
            <CardPanggilan
              jumlah={() => queueData?.antrian_loket_1 ?? "0"}
              className="bi-person-check text-success"
              className2="text-success"
            >
              Antrian Loket 1
            </CardPanggilan>
          </div>
          <div className="col-md-4 mb-6">
            <CardPanggilan
              jumlah={() => queueData?.antrian_loket_2 ?? "0"}
              className="bi-person-check text-success"
              className2="text-success"
            >
              Antrian Loket 2
            </CardPanggilan>
          </div>
          <div className="col-md-4 mb-6">
            <CardPanggilan
              jumlah={() => queueData?.antrian_loket_3 ?? "0"}
              className="bi-person-check text-success"
              className2="text-success"
            >
              Antrian Loket 3
            </CardPanggilan>
          </div>
        </div>
        <button
          className="btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-circle"
          onClick={toggleFullscreen}
          style={{
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i className="bi bi-arrows-fullscreen"></i>
        </button>

        <div className="d-flex flex-row align-items-center mb-4 bottom-0 position-fixed ">
          <LottieBank height="50px" width="50px" />
          <span className="ms-2">Copyright by Lutfi Bank</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;

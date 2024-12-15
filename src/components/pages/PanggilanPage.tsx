import { useTextToSpeech } from "../hooks/TextToSpeech";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { CardPanggilan, CardTable } from "../layout";
import "../../App.css";
import { ButtonPanggilan } from "../common";
import { fetchAllNumber, fetchAllData, updateStatus } from "../services";
import { useNavigate } from "react-router-dom";
import { validatePanggilan, isTokenExpired } from "../utils";
import { LottieBank } from "../common/index";
import tingtung from "../../assets/audio/tingtung.mp3";

const PanggilanPage: React.FC = () => {
  const [queueData, setQueueData] = useState<any[]>([]);
  const [activeQueue, setActiveQueue] = useState<{
    queueId: number;
    loket: string;
  } | null>(null);

  const [allData, setAllData] = useState<{
    jumlah_antrian: number;
    antrian_selanjutnya: string;
    sisa_antrian: number;
    antrian_loket_1: string;
    antrian_loket_2: string;
    antrian_loket_3: string;
  } | null>(null);
  const navigate = useNavigate();
  const { speak } = useTextToSpeech();

  const columns = ["Nomor Antrian", "Status", "Loket 1", "Loket 2", "Loket 3"];

  const handleStatusUpdate = async (
    id: number,
    loket: string,
    status: string,
    selected: string
  ) => {
    try {
      console.log("Updating status for ID:", id); // Tambahkan log untuk debug
      const result = await updateStatus(id, status, loket, selected);
      console.log(result); // Menampilkan hasil dari update status
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const fetchInfoData = async () => {
    try {
      const data = await fetchAllData();
      setAllData(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const fetchAllQueue = async () => {
    try {
      const allDataQueue = await fetchAllNumber();
      setQueueData(allDataQueue);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const checkAndRemoveExpiredToken = () => {
    const nomorToken = localStorage.getItem("panggilan");

    if (nomorToken && isTokenExpired(nomorToken)) {
      localStorage.removeItem("panggilan");
      navigate("/login/panggilan");
      console.log("Token expired");
    }
    if (!validatePanggilan(nomorToken)) {
      navigate("/login/panggilan");
      console.log("Token invalid");
      return;
    }
  };

  useEffect(() => {
    checkAndRemoveExpiredToken();
  }, []);

  useEffect(() => {
    fetchInfoData();
    const interval = setInterval(() => {
      fetchInfoData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchAllQueue();
    const interval = setInterval(() => {
      fetchAllQueue();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSpeak = (
    queueNumber: number,
    loket: string,
    queueId: number,
    loketN: string,
    selected: string
  ): void => {
    const text = `Nomor antrian ${queueNumber} menuju ${loket}`;

    // Mainkan audio tingtung terlebih dahulu
    const audio = new Audio(tingtung);
    audio.play();

    // Tunggu hingga audio selesai sebelum memulai text-to-speech
    audio.onended = () => {
      speak(text, "id-ID"); // Fungsi untuk membaca teks
      handleStatusUpdate(queueId, loketN, "1", selected); // Update status
      setActiveQueue({ queueId, loket }); // Set active queue
    };
  };

  // Fungsi untuk menangani konfirmasi
  const handleConfirm = (queueId: number, loketN: string, selected: string) => {
    console.log(`Konfirmasi untuk antrian ID: ${queueId}`);
    setActiveQueue(null); // Sembunyikan tombol tambahan
    handleStatusUpdate(queueId, loketN, "2", selected);
    setActiveQueue({ queueId, loket: loketN });
  };

  // Fungsi untuk menangani pembatalan
  const handleCancel = (queueId: number, loketN: string, selected: string) => {
    console.log(`Pembatalan untuk antrian ID: ${queueId}`);
    handleStatusUpdate(queueId, loketN, "0", selected);
    setActiveQueue(null);
    setActiveQueue({ queueId, loket: loketN });
  };

  return (
    <div>
      <div className="container pt-4">
        <div className="d-flex flex-column flex-md-row px-4 py-3 mb-4 bg-white rounded-2 shadow-sm">
          <div className="d-flex align-items-center me-md-auto">
            <i className="bi-mic-fill text-success me-3 fs-3"></i>
            <h1 className="h5 pt-2">Panggilan Antrian</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <CardPanggilan
              jumlah={() => allData?.jumlah_antrian ?? "0"}
              className="bi-people text-warning"
              className2="text-warning"
            >
              Jumlah Antrian
            </CardPanggilan>
          </div>
          <div className="col-md-4 mb-6">
            <CardPanggilan
              jumlah={() => allData?.antrian_selanjutnya ?? "0"}
              className="bi-person-plus text-info"
              className2="text-info"
            >
              Antrian Selanjutnya
            </CardPanggilan>
          </div>
          <div className="col-md-4 mb-6">
            <CardPanggilan
              jumlah={() => allData?.sisa_antrian ?? "0"}
              className="bi-person text-danger"
              className2="text-danger"
            >
              Sisa Antrian
            </CardPanggilan>
          </div>
          <div className="col-md-4 mb-6">
            <CardPanggilan
              jumlah={() => allData?.antrian_loket_1 ?? "0"}
              className="bi-person-check text-success"
              className2="text-success"
            >
              Antrian Loket 1
            </CardPanggilan>
          </div>
          <div className="col-md-4 mb-6">
            <CardPanggilan
              jumlah={() => allData?.antrian_loket_2 ?? "0"}
              className="bi-person-check text-success"
              className2="text-success"
            >
              Antrian Loket 2
            </CardPanggilan>
          </div>
          <div className="col-md-4 mb-6">
            <CardPanggilan
              jumlah={() => allData?.antrian_loket_3 ?? "0"}
              className="bi-person-check text-success"
              className2="text-success"
            >
              Antrian Loket 3
            </CardPanggilan>
          </div>
        </div>

        {/* Static Data Table with Status column hidden */}
        <div className="pt-4">
          <CardTable
            columns={columns}
            data={queueData.map((queue) => ({
              "Nomor Antrian": queue.no_antrian,
              Status: queue.status,
              "Loket 1": (
                <>
                  {queue.status === 0 && queue.selected === 0 && (
                    <ButtonPanggilan
                      handlePanggilan={() =>
                        handleSpeak(
                          queue.no_antrian,
                          "Loket 1",
                          queue.id,
                          "1",
                          "1"
                        )
                      }
                      classname="btn btn-success btn-sm rounded-circle btn_mic"
                      classname2="bi-mic-fill"
                    />
                  )}

                  {queue.status === 1 && queue.selected === 1 && (
                    <>
                      <ButtonPanggilan
                        handlePanggilan={() =>
                          handleSpeak(
                            queue.no_antrian,
                            "Loket 1",
                            queue.id,
                            "1",
                            "1"
                          )
                        }
                        classname="btn btn-warning btn-sm rounded-circle btn_mic"
                        classname2="bi-mic-fill"
                      />
                      <ButtonPanggilan
                        handlePanggilan={() =>
                          handleConfirm(queue.id, "1", "0")
                        }
                        classname="btn btn-success btn-sm rounded-circle mx-1 confirm-check"
                        classname2="bi-check-circle-fill"
                      />
                      <ButtonPanggilan
                        handlePanggilan={() => handleCancel(queue.id, "0", "0")}
                        classname="btn btn-danger btn-sm rounded-circle cancel-check"
                        classname2="bi-x-circle-fill"
                      />
                    </>
                  )}

                  {/* Jika tombol di Loket 3 tidak aktif, tampilkan tombol mic dengan status 1 */}
                  {queue.status === 1 && queue.selected !== 1 && (
                    <ButtonPanggilan
                      handlePanggilan={() => {}}
                      classname="btn btn-warning btn-sm rounded-circle btn_mic"
                      classname2="bi-mic-fill"
                    />
                  )}
                  {queue.status === 2 && (
                    <ButtonPanggilan
                      handlePanggilan={() => {}}
                      classname="btn btn-secondary btn-sm rounded-circle"
                      classname2="bi-mic-fill"
                    />
                  )}
                </>
              ),
              "Loket 2": (
                <>
                  {queue.status === 0 && queue.selected === 0 && (
                    <ButtonPanggilan
                      handlePanggilan={() =>
                        handleSpeak(
                          queue.no_antrian,
                          "Loket 2",
                          queue.id,
                          "2",
                          "2"
                        )
                      }
                      classname="btn btn-success btn-sm rounded-circle btn_mic"
                      classname2="bi-mic-fill"
                    />
                  )}

                  {queue.status === 1 && queue.selected === 2 && (
                    <>
                      <ButtonPanggilan
                        handlePanggilan={() =>
                          handleSpeak(
                            queue.no_antrian,
                            "Loket 2",
                            queue.id,
                            "2",
                            "2"
                          )
                        }
                        classname="btn btn-warning btn-sm rounded-circle btn_mic"
                        classname2="bi-mic-fill"
                      />
                      <ButtonPanggilan
                        handlePanggilan={() =>
                          handleConfirm(queue.id, "2", "0")
                        }
                        classname="btn btn-success btn-sm rounded-circle mx-1 confirm-check"
                        classname2="bi-check-circle-fill"
                      />
                      <ButtonPanggilan
                        handlePanggilan={() => handleCancel(queue.id, "0", "0")}
                        classname="btn btn-danger btn-sm rounded-circle cancel-check"
                        classname2="bi-x-circle-fill"
                      />
                    </>
                  )}

                  {/* Jika tombol di Loket 3 tidak aktif, tampilkan tombol mic dengan status 1 */}
                  {queue.status === 1 && queue.selected !== 2 && (
                    <ButtonPanggilan
                      handlePanggilan={() => {}}
                      classname="btn btn-warning btn-sm rounded-circle btn_mic"
                      classname2="bi-mic-fill"
                    />
                  )}
                  {queue.status === 2 && (
                    <ButtonPanggilan
                      handlePanggilan={() => {}}
                      classname="btn btn-secondary btn-sm rounded-circle"
                      classname2="bi-mic-fill"
                    />
                  )}
                </>
              ),
              "Loket 3": (
                <>
                  {queue.status === 0 && (
                    <ButtonPanggilan
                      handlePanggilan={() =>
                        handleSpeak(
                          queue.no_antrian,
                          "Loket 3",
                          queue.id,
                          "3",
                          "3"
                        )
                      }
                      classname="btn btn-success btn-sm rounded-circle btn_mic"
                      classname2="bi-mic-fill"
                    />
                  )}

                  {queue.status === 1 && queue.selected === 3 && (
                    <>
                      <ButtonPanggilan
                        handlePanggilan={() =>
                          handleSpeak(
                            queue.no_antrian,
                            "Loket 3",
                            queue.id,
                            "3",
                            "3"
                          )
                        }
                        classname="btn btn-warning btn-sm rounded-circle btn_mic"
                        classname2="bi-mic-fill"
                      />
                      <ButtonPanggilan
                        handlePanggilan={() =>
                          handleConfirm(queue.id, "3", "0")
                        }
                        classname="btn btn-success btn-sm rounded-circle mx-1 confirm-check"
                        classname2="bi-check-circle-fill"
                      />
                      <ButtonPanggilan
                        handlePanggilan={() => handleCancel(queue.id, "0", "0")}
                        classname="btn btn-danger btn-sm rounded-circle cancel-check"
                        classname2="bi-x-circle-fill"
                      />
                    </>
                  )}

                  {/* Jika tombol di Loket 3 tidak aktif, tampilkan tombol mic dengan status 1 */}
                  {queue.status === 1 && queue.selected !== 3 && (
                    <ButtonPanggilan
                      handlePanggilan={() => {}}
                      classname="btn btn-warning btn-sm rounded-circle btn_mic"
                      classname2="bi-mic-fill"
                    />
                  )}
                  {queue.status === 2 && (
                    <ButtonPanggilan
                      handlePanggilan={() => {}}
                      classname="btn btn-secondary btn-sm rounded-circle"
                      classname2="bi-mic-fill"
                    />
                  )}
                </>
              ),
            }))}
          />
        </div>
      </div>
      <footer className="footer mt-5 mb-4 d-flex justify-content-center align-items-center ">
        <LottieBank height="50px" width="50px" />
        <span className="ms-2">Copyright by Lutfi Bank</span>
      </footer>
    </div>
  );
};

export default PanggilanPage;

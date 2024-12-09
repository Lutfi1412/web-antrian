import React, { useEffect, useState } from "react";
import CardTable from "../layout/CardTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { DateRangePicker } from "react-bootstrap-daterangepicker";
import { fetchDates, deleteDate } from "../services/";
import "../../assets/styles/Table.scss";
import { FaTrash } from "react-icons/fa";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { validateLaporan, isTokenExpired } from "../utils";
import Swal from "sweetalert2";
import { LottieBank } from "../common/index";

interface DataItem {
  tanggal: string;
  jumlah: number;
  loket1: number;
  loket2: number;
  loket3: number;
}

const LaporanPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [range, setRange] = useState({ startDate: "", endDate: "" });
  const navigate = useNavigate();

  // Fetch data from the server and transform it for display
  const fetchData = async () => {
    try {
      const fetchedData: DataItem[] = await fetchDates();
      const transformedData = fetchedData.map((item, index) => ({
        No: index + 1,
        Tanggal: moment(item.tanggal, "YYYY-MM-DD").format("DD-MM-YYYY"),
        "Jumlah Antrian": item.jumlah,
        "Loket 1": item.loket1,
        "Loket 2": item.loket2,
        "Loket 3": item.loket3,
        "Tidak Diproses": item.jumlah - item.loket1 - item.loket2 - item.loket3,
        Action: (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(item.tanggal)}
          >
            <FaTrash />
          </button>
        ),
      }));

      setData(transformedData); // Set data to state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Polling every 1.5 seconds (1500ms) to fetch data
  useEffect(() => {
    const intervalId = setInterval(fetchData, 1500);
    return () => clearInterval(intervalId); // Fetch data every 1.5 seconds
  }, []);

  // Filter data based on the selected date range
  useEffect(() => {
    if (!range.startDate || !range.endDate) {
      setFilteredData(data); // Show all data if no range is selected
      return;
    }

    const filtered = data.filter((item) => {
      const itemDate = moment(item.Tanggal, "DD-MM-YYYY");
      return itemDate.isBetween(
        range.startDate,
        range.endDate,
        undefined,
        "[]"
      );
    });

    setFilteredData(filtered);
  }, [data, range]);

  // Handle delete action
  const handleDelete = async (tanggal: string) => {
    const formattedDate = moment(tanggal, "YYYY-MM-DD").format("DD-MM-YYYY");
    try {
      // Tampilkan dialog konfirmasi menggunakan SweetAlert2
      const result = await Swal.fire({
        title: "Konfirmasi Hapus",
        text: `Apakah Anda yakin ingin menghapus data pada tanggal ${formattedDate}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        // Jika pengguna menekan tombol "Ya, Hapus"
        await deleteDate(tanggal); // Hapus dari server
        const updatedData = data.filter((item) => item.Tanggal !== tanggal);
        setData(updatedData); // Perbarui state

        // Tampilkan pesan berhasil
        Swal.fire("Berhasil!", "Data berhasil dihapus.", "success");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
    }
  };

  // Handle Date Range Picker event
  const handleEvent = (event: any, picker: any) => {
    const start = picker.startDate.format("YYYY-MM-DD");
    const end = picker.endDate.format("YYYY-MM-DD");
    setRange({ startDate: start, endDate: end });
  };

  // Column names for the table
  const columns: string[] = [
    "No",
    "Tanggal",
    "Jumlah Antrian",
    "Loket 1",
    "Loket 2",
    "Loket 3",
    "Tidak Diproses",
    "Action",
  ];

  const checkAndRemoveExpiredToken = () => {
    const nomorToken = localStorage.getItem("laporan");

    if (nomorToken && isTokenExpired(nomorToken)) {
      localStorage.removeItem("laporan");
      navigate("/login/laporan");
    }
    if (!validateLaporan(nomorToken)) {
      navigate("/login/laporan");
      return;
    }
  };

  useEffect(() => {
    checkAndRemoveExpiredToken();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h3 className="mb-0">Laporan Harian</h3>

          <DateRangePicker onApply={handleEvent}>
            <button className="btn btn-outline-secondary">
              {range.startDate && range.endDate
                ? `${moment(range.startDate, "YYYY-MM-DD").format(
                    "DD-MM-YYYY"
                  )} - ${moment(range.endDate, "YYYY-MM-DD").format(
                    "DD-MM-YYYY"
                  )}`
                : "Pilih Tanggal"}
            </button>
          </DateRangePicker>
        </div>

        <div className="table-container">
          <CardTable
            columns={columns} // Columns for the table
            data={filteredData} // Filtered data based on date range
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

export default LaporanPage;

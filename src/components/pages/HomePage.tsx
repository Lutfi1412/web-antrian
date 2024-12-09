import { CardHome } from "../layout";
import "../../App.css";
import { LottieBank } from "../common/index";

const HomePage = () => {
  return (
    <div className="d-flex flex-column h-100">
      <main className="flex-shrink-0">
        <div className="container pt-5">
          <div
            className="alert alert-light d-flex align-items-center mb-5"
            role="alert"
          >
            <i className="bi-info-circle text-success me-3 fs-3"></i>
            <div>
              Selamat Datang di <strong>Aplikasi Antrian Berbasis Web</strong>.
              Silahkan pilih halaman yang ingin ditampilkan.
            </div>
          </div>
          <div className="row gx-5">
            <div className="col-lg-6 mb-4">
              <CardHome to="/login/nomor" children2="Nomor Antrian">
                Halaman Nomor Antrian digunakan pengunjung untuk mengambil nomor
                antrian.
              </CardHome>
            </div>
            <div className="col-lg-6 mb-4">
              <CardHome to="/login/panggilan" children2="Panggilan Antrian">
                Halaman Panggilan Antrian digunakan petugas loket untuk
                memanggil antrian pengunjung.
              </CardHome>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer mt-auto mb-4 d-flex justify-content-center align-items-center ">
        <LottieBank height="50px" width="50px" />
        <span className="ms-2">Copyright by Lutfi Bank</span>
      </footer>
    </div>
  );
};

export default HomePage;

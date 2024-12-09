import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  NomorPage,
  PanggilanPage,
  LaporanPage,
  CustomerPage,
  LoginPage,
} from "./components/pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pages/nomor" element={<NomorPage />} />
        <Route path="/pages/panggilan" element={<PanggilanPage />} />
        <Route path="/pages/laporan" element={<LaporanPage />} />
        <Route path="/pages/customer" element={<CustomerPage />} />
        <Route path="/login/laporan" element={<LoginPage login="laporan" />} />
        <Route path="/login/nomor" element={<LoginPage login="nomor" />} />
        <Route
          path="/login/panggilan"
          element={<LoginPage login="panggilan" />}
        />
      </Routes>
    </Router>
  );
};

export default App;

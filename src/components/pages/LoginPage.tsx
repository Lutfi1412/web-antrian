import React, { useState } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
  Image,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { LottieBank } from "../common/index";
import bankImage from "../../assets/images/bank.webp";

interface Login {
  login: string;
}

const LoginPage: React.FC<Login> = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook untuk navigasi

  // Fungsi untuk membuat JWT
  const createToken = (data: object, expiryInMinutes: number) => {
    const header = { alg: "HS256", typ: "JWT" };
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + expiryInMinutes);
    const payload = { ...data, exp: expiry.toISOString() };

    // Encode header dan payload menggunakan base64
    const encodeBase64 = (obj: object) =>
      btoa(JSON.stringify(obj)).replace(/=/g, "");

    const encodedHeader = encodeBase64(header);
    const encodedPayload = encodeBase64(payload);

    // Gabungkan header, payload, dan signature palsu
    const signature = "dummy-signature"; // Ganti dengan proses hash sebenarnya jika diperlukan
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      Swal.fire({
        icon: "warning",
        title: "Masukan Username",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (!password) {
      Swal.fire({
        icon: "warning",
        title: "Masukan Password",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (login === "laporan" && username === "admin" && password === "admin") {
      Swal.fire({
        icon: "success",
        title: "Signed in successfully as Laporan",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        const token = createToken({ laporan: "sukses" }, 540); // Token berlaku 1 menit
        localStorage.setItem("laporan", token);
        navigate("/pages/laporan");
      });
    } else if (
      login === "nomor" &&
      username === "security" &&
      password === "security"
    ) {
      Swal.fire({
        icon: "success",
        title: "Signed in successfully as Security",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        const token = createToken({ nomor: "sukses" }, 540); // Token berlaku 1 menit
        localStorage.setItem("nomor", token);
        navigate("/pages/nomor");
      });
    } else if (
      login === "panggilan" &&
      username === "karyawan" &&
      password === "karyawan"
    ) {
      Swal.fire({
        icon: "success",
        title: "Signed in successfully as Karyawan",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        const token = createToken({ panggilan: "sukses" }, 540); // Token berlaku 1 menit
        localStorage.setItem("panggilan", token);
        navigate("/pages/panggilan");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Password atau username salah",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div>
      <Container className="my-5 d-flex justify-content-center align-items-center">
        <Card
          className="shadow-lg"
          style={{ width: "100%", maxWidth: "900px" }}
        >
          <Row className="g-0">
            <Col md={6}>
              <Image
                src={bankImage}
                alt="login form"
                fluid
                className="rounded-start"
              />
            </Col>
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center"
            >
              <Card.Body className="d-flex flex-column justify-content-center w-100">
                <div className="d-flex flex-row align-items-center mt-2 mb-5">
                  <LottieBank height="100px" width="100px" />
                  <span className="h1 fw-bold mb-0">LUTFI BANK</span>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formUsername" className="mb-4">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      size="lg"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      size="lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    variant="dark"
                    size="lg"
                    className="w-100 mb-4"
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
      <footer className="footer mt-auto mb-4 d-flex justify-content-center align-items-center ">
        <LottieBank height="50px" width="50px" />
        <span className="ms-2">Copyright by Lutfi Bank</span>
      </footer>
    </div>
  );
};

export default LoginPage;

import React, { FC } from "react";
import { Link } from "react-router-dom";

// Tentukan tipe props untuk ButtonHome
interface ButtonHomeProps {
  to?: string; // rute tujuan, biasanya string
  children?: React.ReactNode; // elemen anak di antara tag <ButtonHome>
  classname?: string;
  handlePanggilan?: () => void;
  classname2?: string;
  classname3?: string;
  // opsional, kelas tambahan untuk styling
}

// Komponen ButtonHome menggunakan tipe ButtonHomeProps
export const ButtonHome: FC<ButtonHomeProps> = ({
  to = "/",
  children,
  classname,
}) => {
  return (
    <Link
      to={to}
      className={`btn btn-success rounded-pill px-4 py-2 ${classname || ""}`}
    >
      {children}
      <i className="bi-arrow-right ms-2"></i>
    </Link>
  );
};

export const ButtonPanggilan: FC<ButtonHomeProps> = ({
  handlePanggilan,
  classname,
  classname2,
  classname3,
}) => {
  return (
    <button className={`${classname || ""}`} onClick={handlePanggilan}>
      <i className={`${classname2 || ""}`}></i>
      {classname3 || ""}
    </button>
  );
};

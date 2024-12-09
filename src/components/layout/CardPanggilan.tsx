import React, { FC } from "react";

interface CardHomeProps {
  jumlah: () => number | string; // Allow `jumlah` to return either number or string
  children: React.ReactNode;
  className?: string;
  className2?: string;
}

const CardPanggilan: FC<CardHomeProps> = ({
  jumlah,
  children,
  className,
  className2,
}) => {
  return (
    <div className="card border-1 shadow-md">
      <div className="card-body p-4">
        <div className="d-flex justify-content-start">
          <div className="feature-icon-3 me-4">
            <i className={`${className || ""}`}></i>
          </div>
          <div>
            <p id="jumlah-antrian" className={`fs-3 ${className2 || ""} mb-1`}>
              {String(jumlah())}{" "}
              {/* Converts both number and string to a string format */}
            </p>
            <p className={`mb-0 ${className2 || ""}`}>{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPanggilan;

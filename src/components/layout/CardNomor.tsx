import { FC } from "react";
import { ButtonPanggilan } from "../common";

interface CardNomorProps {
  handleAddQueue: () => void; // Expecting a function prop
  queueNumber: number; // Queue number prop
}

const CardNomor: FC<CardNomorProps> = ({ handleAddQueue, queueNumber }) => {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body text-center d-grid p-5">
        <div className="border border-success rounded-2 py-2 mb-5">
          <h3 className="pt-4">ANTRIAN</h3>
          <h1 className="display-1 fw-bold text-success text-center lh-1 pb-2">
            {queueNumber}
          </h1>
        </div>
        <ButtonPanggilan
          handlePanggilan={handleAddQueue}
          classname="btn btn-success btn-block rounded-pill fs-5 px-5 py-4 mb-2"
          classname2="bi-person-plus fs-4 me-2"
          classname3="Ambil Nomor"
        />{" "}
      </div>
    </div>
  );
};

export default CardNomor;

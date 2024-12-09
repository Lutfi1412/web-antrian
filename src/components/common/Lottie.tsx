// Import Lottie dan file animasi
import React from "react";
import Lottie from "lottie-react";
import Bank from "../../assets/lottie/bank.json"; // Sesuaikan path dengan lokasi file animasi Anda

interface LottieProps {
  height?: string | number;
  width?: string | number;
}

export const LottieBank: React.FC<LottieProps> = ({ height, width }) => {
  return (
    <div>
      <Lottie
        animationData={Bank}
        loop={true}
        style={{ width: width, height: height }} // Ukuran langsung disini
      />
    </div>
  );
};

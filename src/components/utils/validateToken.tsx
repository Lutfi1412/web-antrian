import { decodeJwt } from "./tokenUtils";

export const validateNomor = (token: string | null): boolean => {
  if (!token) return false;

  const payload = decodeJwt(token);
  if (!payload || payload.nomor !== "sukses") {
    return false;
  }
  return true;
};

export const validatePanggilan = (token: string | null): boolean => {
  if (!token) return false;

  const payload = decodeJwt(token);
  if (!payload || payload.panggilan !== "sukses") {
    return false;
  }
  return true;
};

export const validateLaporan = (token: string | null): boolean => {
  if (!token) return false;

  const payload = decodeJwt(token);
  if (!payload || payload.laporan !== "sukses") {
    return false;
  }
  return true;
};

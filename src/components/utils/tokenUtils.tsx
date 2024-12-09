// src/utils/tokenUtils.ts
export const isTokenExpired = (token: string) => {
  const tokenParts = token.split(".");
  if (tokenParts.length === 3) {
    try {
      const decodedPayload = JSON.parse(atob(tokenParts[1]));
      const exp = decodedPayload.exp; // Waktu kadaluarsa dalam format ISO string
      const currentTime = Math.floor(Date.now() / 1000); // Waktu sekarang dalam detik
      console.log("Current Time:", currentTime);
      // Pastikan exp dikonversi ke timestamp (detik)
      const expiryTime = new Date(exp).getTime() / 1000; // Convert ISO string to Unix timestamp in seconds
      console.log("Token Expiry Time:", expiryTime);
      return currentTime > expiryTime; // Bandingkan waktu sekarang dengan waktu kadaluarsa
    } catch (error) {
      console.error("Error decoding token", error);
      return true; // Jika ada error dalam decoding, anggap token kadaluarsa
    }
  }
  return true; // Jika token tidak valid, anggap kadaluarsa
};

export const decodeJwt = (token: string): Record<string, any> | null => {
  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload));
  } catch (error) {
    console.error("Failed to decode JWT token:", error);
    return null;
  }
};

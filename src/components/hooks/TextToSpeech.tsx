import { TextToSpeech } from "@capacitor-community/text-to-speech";

export const useTextToSpeech = () => {
  const speak = async (
    text: string,
    lang = "id-ID",
    rate = 1.0,
    pitch = 1.0,
    volume = 1.0
  ) => {
    try {
      await TextToSpeech.speak({
        text: text,
        lang: lang,
        rate: rate,
        pitch: pitch,
        volume: volume,
        category: "ambient",
        queueStrategy: 1,
      });
    } catch (error) {
      console.error("Error during speak:", error);
    }
  };

  const stop = async () => {
    try {
      await TextToSpeech.stop();
    } catch (error) {
      console.error("Error during stop:", error);
    }
  };

  const getSupportedLanguages = async () => {
    try {
      const languages = await TextToSpeech.getSupportedLanguages();
      return languages;
    } catch (error) {
      console.error("Error fetching supported languages:", error);
      return [];
    }
  };

  const getSupportedVoices = async () => {
    try {
      const voices = await TextToSpeech.getSupportedVoices();
      return voices;
    } catch (error) {
      console.error("Error fetching supported voices:", error);
      return [];
    }
  };

  const isLanguageSupported = async (lang: string) => {
    try {
      const isSupported = await TextToSpeech.isLanguageSupported({ lang });
      return isSupported;
    } catch (error) {
      console.error("Error checking language support:", error);
      return false;
    }
  };

  return {
    speak,
    stop,
    getSupportedLanguages,
    getSupportedVoices,
    isLanguageSupported,
  };
};

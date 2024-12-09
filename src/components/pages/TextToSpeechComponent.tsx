import React from 'react';
import { useTextToSpeech } from '../hooks/TextToSpeech';

const TextToSpeechComponent = () => {
  const { speak, stop, getSupportedLanguages } = useTextToSpeech();

  const handleSpeak = () => {
    speak('nomor antrian 1 menuju loket 1', 'id-ID', 1.0, 1.0, 1.0);
  };

  const handleStop = () => {
    stop();
  };

  const fetchLanguages = async () => {
    const languages = await getSupportedLanguages();
    console.log('Supported languages:', languages);
  };

  return (
    <div>
      <button onClick={handleSpeak}>Speak</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={fetchLanguages}>Get Supported Languages</button>
    </div>
  );
};

export default TextToSpeechComponent;

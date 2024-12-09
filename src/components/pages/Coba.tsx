import React, { useState, useEffect, ChangeEvent } from "react";

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [rate, setRate] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(1);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const populateVoiceList = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoiceList;
    }
  }, [selectedVoice]);

  console.log(selectedVoice);

  const speakText = () => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      console.error("Already speaking...");
      return;
    }
    if (text !== "") {
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = voices.find((v) => v.name === selectedVoice);
      if (voice) {
        utterance.voice = voice;
      }
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.onend = () => console.log("Speech finished.");
      utterance.onerror = (err) => console.error("Speech error:", err);
      synth.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
    }
  };

  return (
    <div>
      <h1>Text-to-Speech App</h1>
      <textarea
        id="text-input"
        placeholder="Type something to speak..."
        rows={5}
        cols={40}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <label htmlFor="voice-select">Choose Voice: </label>
      <select
        id="voice-select"
        value={selectedVoice}
        onChange={(e) => setSelectedVoice(e.target.value)}
      >
        {voices.map((voice, index) => (
          <option key={index} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="rate">Rate: </label>
      <input
        type="range"
        id="rate"
        min="0.5"
        max="2"
        step="0.1"
        value={rate}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setRate(parseFloat(e.target.value))
        }
      />
      <span>{rate}</span>
      <br />
      <label htmlFor="pitch">Pitch: </label>
      <input
        type="range"
        id="pitch"
        min="0"
        max="2"
        step="0.1"
        value={pitch}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPitch(parseFloat(e.target.value))
        }
      />
      <span>{pitch}</span>
      <br />
      <button onClick={speakText}>Speak</button>
      <button onClick={stopSpeaking}>Stop</button>
    </div>
  );
};

export default TextToSpeech;

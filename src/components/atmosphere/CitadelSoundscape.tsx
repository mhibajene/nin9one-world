"use client";

import { useEffect, useRef, useState } from "react";

type SoundscapeSource = OscillatorNode | AudioBufferSourceNode;

type CitadelSoundscapeGraph = {
  context: AudioContext;
  master: GainNode;
  sources: SoundscapeSource[];
};

const soundscapeLevel = 0.085;
const soundscapeFadeInSeconds = 2.8;
const soundscapeFadeOutSeconds = 1.4;

function createBrownNoiseBuffer(context: AudioContext) {
  const durationSeconds = 6;
  const buffer = context.createBuffer(
    1,
    context.sampleRate * durationSeconds,
    context.sampleRate,
  );
  const channel = buffer.getChannelData(0);
  let seed = 919;
  let previous = 0;

  for (let index = 0; index < channel.length; index += 1) {
    seed = (seed * 16_807) % 2_147_483_647;
    const white = (seed / 2_147_483_647) * 2 - 1;
    previous = (previous + white * 0.018) / 1.018;
    channel[index] = previous * 3.2;
  }

  return buffer;
}

function createCitadelSoundscape(): CitadelSoundscapeGraph {
  const context = new AudioContext({ latencyHint: "playback" });
  const master = context.createGain();
  const spatialField = context.createStereoPanner();
  const droneFilter = context.createBiquadFilter();
  const noiseFilter = context.createBiquadFilter();
  const noiseGain = context.createGain();
  const sources: SoundscapeSource[] = [];

  master.gain.value = 0;
  master.connect(spatialField);
  spatialField.connect(context.destination);

  const addSlowMovement = (
    parameter: AudioParam,
    frequency: number,
    depth: number,
  ) => {
    const oscillator = context.createOscillator();
    const movementDepth = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    movementDepth.gain.value = depth;

    oscillator.connect(movementDepth);
    movementDepth.connect(parameter);
    oscillator.start();
    sources.push(oscillator);
  };

  droneFilter.type = "lowpass";
  droneFilter.frequency.value = 240;
  droneFilter.Q.value = 0.35;
  droneFilter.connect(master);

  const addDroneVoice = (
    frequency: number,
    detune: number,
    level: number,
  ) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    oscillator.detune.value = detune;
    gain.gain.value = level;

    oscillator.connect(gain);
    gain.connect(droneFilter);
    oscillator.start();
    sources.push(oscillator);
  };

  addDroneVoice(43, -3, 0.11);
  addDroneVoice(64.5, 4, 0.045);

  const noise = context.createBufferSource();
  noise.buffer = createBrownNoiseBuffer(context);
  noise.loop = true;

  noiseFilter.type = "lowpass";
  noiseFilter.frequency.value = 170;
  noiseFilter.Q.value = 0.2;
  noiseGain.gain.value = 0.035;

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(master);
  noise.start();
  sources.push(noise);

  addSlowMovement(droneFilter.frequency, 0.017, 28);
  addSlowMovement(noiseFilter.frequency, 0.029, 20);
  addSlowMovement(spatialField.pan, 0.011, 0.12);

  return { context, master, sources };
}

function fadeSoundscape(
  graph: CitadelSoundscapeGraph,
  target: number,
  durationSeconds: number,
) {
  const now = graph.context.currentTime;
  const gain = graph.master.gain;

  if (typeof gain.cancelAndHoldAtTime === "function") {
    gain.cancelAndHoldAtTime(now);
  } else {
    const currentLevel = gain.value;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(currentLevel, now);
  }

  gain.linearRampToValueAtTime(target, now + durationSeconds);
}

export function CitadelSoundscape() {
  const graphRef = useRef<CitadelSoundscapeGraph | null>(null);
  const suspendTimerRef = useRef<number | null>(null);
  const soundEnabledRef = useRef(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundAvailable, setSoundAvailable] = useState(true);
  const [announcement, setAnnouncement] = useState("");

  const clearSuspendTimer = () => {
    if (suspendTimerRef.current !== null) {
      window.clearTimeout(suspendTimerRef.current);
      suspendTimerRef.current = null;
    }
  };

  const handleToggle = async () => {
    clearSuspendTimer();

    if (soundEnabled) {
      const graph = graphRef.current;
      soundEnabledRef.current = false;
      setSoundEnabled(false);
      setAnnouncement("Citadel soundscape muted.");

      if (graph) {
        fadeSoundscape(graph, 0, soundscapeFadeOutSeconds);
        suspendTimerRef.current = window.setTimeout(() => {
          void graph.context.suspend();
          suspendTimerRef.current = null;
        }, soundscapeFadeOutSeconds * 1_000 + 80);
      }

      return;
    }

    try {
      const graph = graphRef.current ?? createCitadelSoundscape();
      graphRef.current = graph;
      await graph.context.resume();
      fadeSoundscape(graph, soundscapeLevel, soundscapeFadeInSeconds);
      soundEnabledRef.current = true;
      setSoundEnabled(true);
      setAnnouncement("Citadel soundscape enabled.");
    } catch {
      soundEnabledRef.current = false;
      setSoundEnabled(false);
      setSoundAvailable(false);
      setAnnouncement("Citadel soundscape is unavailable in this browser.");
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      const graph = graphRef.current;

      if (!graph) {
        return;
      }

      clearSuspendTimer();

      if (document.hidden) {
        void graph.context.suspend();
        return;
      }

      if (soundEnabledRef.current) {
        void graph.context
          .resume()
          .then(() => {
            fadeSoundscape(graph, soundscapeLevel, soundscapeFadeInSeconds);
          })
          .catch(() => undefined);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearSuspendTimer();

      const graph = graphRef.current;
      graphRef.current = null;

      graph?.sources.forEach((source) => source.stop());
      void graph?.context.close();
    };
  }, []);

  const label = soundAvailable
    ? soundEnabled
      ? "Mute Citadel soundscape"
      : "Enable Citadel soundscape"
    : "Citadel soundscape unavailable";

  return (
    <div className="soundscape">
      <button
        type="button"
        className="soundscape__control"
        aria-label={label}
        aria-pressed={soundEnabled}
        disabled={!soundAvailable}
        onClick={handleToggle}
      >
        <span className="soundscape__signal" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>{soundAvailable ? (soundEnabled ? "Silence" : "Listen") : "Silent"}</span>
      </button>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}

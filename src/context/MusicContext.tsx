import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

interface MusicContextType {
  isMuted: boolean;
  toggleMute: () => void;
  isPlaying: boolean;
  currentTrackName: string;
  playNextTrack: () => void;
}

const TRACKS = [
  { name: "Jingle Bells (Melody 1)", src: "/jingle_bell1.mp3" },
  { name: "Jingle Bells (Melody 2)", src: "/jingle_bell2.mp3" },
];

const MusicContext = createContext<MusicContextType | null>(null);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    const saved = localStorage.getItem("getrichify-music-muted");
    return saved !== null ? saved === "true" : false;
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const gapTimeoutRef = useRef<number | null>(null);
  const trackIndexRef = useRef<number>(currentTrackIndex);
  const isMutedRef = useRef<boolean>(isMuted);

  // Keep refs in sync to avoid stale closures in timeouts & event handlers
  trackIndexRef.current = currentTrackIndex;
  isMutedRef.current = isMuted;

  const clearTimer = () => {
    if (gapTimeoutRef.current !== null) {
      window.clearTimeout(gapTimeoutRef.current);
      gapTimeoutRef.current = null;
    }
  };

  const playTrack = useCallback((index: number) => {
    clearTimer();
    const track = TRACKS[index];
    if (!track) return;

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    audio.src = track.src;
    audio.muted = isMutedRef.current;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          // Autoplay policy might block unmuted playback until first user interaction
          console.log("[Music] Autoplay deferred until user interaction:", err?.message);
          setIsPlaying(false);
        });
    }
  }, []);

  const queueNextTrackWithGap = useCallback(() => {
    clearTimer();
    setIsPlaying(false);

    // 5 second gap as requested
    gapTimeoutRef.current = window.setTimeout(() => {
      const nextIndex = (trackIndexRef.current + 1) % TRACKS.length;
      setCurrentTrackIndex(nextIndex);
      playTrack(nextIndex);
    }, 5000);
  }, [playTrack]);

  // Setup single HTMLAudioElement lifecycle & listeners
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    audio.muted = isMutedRef.current;

    const handleEnded = () => {
      console.log("[Music] Track ended, waiting 5 seconds before next track...");
      queueNextTrackWithGap();
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Attempt to start initial track
    playTrack(0);

    // Browser autoplay policy handler: resume on any first user click/touch anywhere if blocked
    const handleFirstUserInteraction = () => {
      if (audioRef.current && audioRef.current.paused && !isMutedRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Ignore
        });
      }
      window.removeEventListener("pointerdown", handleFirstUserInteraction);
      window.removeEventListener("keydown", handleFirstUserInteraction);
    };

    window.addEventListener("pointerdown", handleFirstUserInteraction, { once: true });
    window.addEventListener("keydown", handleFirstUserInteraction, { once: true });

    return () => {
      clearTimer();
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      window.removeEventListener("pointerdown", handleFirstUserInteraction);
      window.removeEventListener("keydown", handleFirstUserInteraction);
      audio.pause();
      audio.src = "";
    };
  }, [playTrack, queueNextTrackWithGap]);

  // Handle Mute / Unmute
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    localStorage.setItem("getrichify-music-muted", String(nextMuted));

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
      if (nextMuted) {
        // If muted, we can keep the position or let it continue silently
      } else {
        // If unmuting and currently paused (or not started yet due to browser policy)
        if (audioRef.current.paused) {
          if (!audioRef.current.src) {
            playTrack(trackIndexRef.current);
          } else {
            audioRef.current.play().then(() => {
              setIsPlaying(true);
            }).catch((err) => {
              console.log("[Music] Play on unmute err:", err);
            });
          }
        }
      }
    }
  };


  const playNextTrack = () => {
    clearTimer();
    const nextIndex = (trackIndexRef.current + 1) % TRACKS.length;
    setCurrentTrackIndex(nextIndex);
    playTrack(nextIndex);
  };

  return (
    <MusicContext.Provider
      value={{
        isMuted,
        toggleMute,
        isPlaying,
        currentTrackName: TRACKS[currentTrackIndex]?.name || "Jingle Bells",
        playNextTrack,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};

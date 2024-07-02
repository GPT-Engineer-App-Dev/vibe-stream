import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const songs = [
  { title: "Song 1", artist: "Artist 1", src: "/songs/song1.mp3" },
  { title: "Song 2", artist: "Artist 2", src: "/songs/song2.mp3" },
  { title: "Song 3", artist: "Artist 3", src: "/songs/song3.mp3" },
];

const AudioPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setIsPlaying(false);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-muted/40 rounded-lg">
      <Button variant="outline" size="icon" onClick={handlePrevious}>
        <SkipBack className="h-5 w-5" />
      </Button>
      <Button variant="outline" size="icon" onClick={handlePlayPause}>
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </Button>
      <Button variant="outline" size="icon" onClick={handleNext}>
        <SkipForward className="h-5 w-5" />
      </Button>
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{songs[currentSongIndex].title}</span>
        <span className="text-xs text-muted-foreground">{songs[currentSongIndex].artist}</span>
      </div>
      <audio ref={audioRef} src={songs[currentSongIndex].src} onEnded={handleNext} />
    </div>
  );
};

export default AudioPlayer;
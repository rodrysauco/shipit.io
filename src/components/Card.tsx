import Play from "../assets/play.png";
import Pause from "../assets/pause.png";
import Favorite from "../assets/favorite.png";
import FavoriteFull from "../assets/favorite-full.png";
import { useEffect, useState } from "react";

interface CardProps {
  name: string;
  image: string;
  preview_url: string;
  className?: string;
  isPlaying?: boolean;
  isFavorite?: boolean;
  onToggle: Function;
  setFavorite: Function;
  isPlayable: boolean;
}


export const Card = ({ className, name, image, preview_url, isPlaying, isFavorite, onToggle, setFavorite, isPlayable }: CardProps) => {
  const [audio, setAudio] = useState(new Audio (preview_url));
  const toggle = () => {
    onToggle();
  };

  const favorite = () => {
    setFavorite();
  }

  useEffect(() => {
    if(isPlayable) {
      isPlaying ? audio.play() : audio.pause();
    }
  }, [isPlaying])

  return (
    <div
      className={`${className} bg-[#343434] h-24 hover:shadow-md flex cursor-pointer max-w-md`}
    >
      <img className="h-full w-24" src={image} alt="Episode cover" />
      <div className="px-3 py-1 flex items-center justify-between w-full">
        <div className="font-bold w-3/4">{name} </div>
        <div
          className="rounded-full bg-green-500 w-10 h-10 flex justify-center items-center cursor-pointer"
          onClick={toggle}
        >
          {isPlaying ? <img src={Pause} alt="Pause" /> : <img src={Play} alt="Play" />}
        </div>
        <div
          className="rounded-full bg-green-500 w-10 h-10 flex justify-center items-center cursor-pointer"
          onClick={favorite}
        >
          {isFavorite ? <img src={FavoriteFull} alt="Remove fav" /> : <img src={Favorite} alt="Add fav" />}
        </div>
      </div>
    </div>
  );
};

import { Card } from "../components/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEpisodes } from "../api/getEpisodes";
import { Episode } from "../types/episode";

const Home = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [favorites, setFavorites] = useState<Array<string>>([]);
  const [playing, setPlaying] = useState<Episode>();
  const navigate = useNavigate();
  useEffect(() => {
    !localStorage.getItem("access_token")
      ? navigate("/login")
      : fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    try {
      const data = await getEpisodes();
      const favs = getFavs();
      const dataAux = data.map((episode) => {
        return {
          ...episode,
          isFavorite: favs.includes(episode.id),
          isPlaying: false
        }
      });
      setEpisodes(dataAux);
      setFavorites(favs);
    } catch (error) {
      localStorage.removeItem("access_token");
      navigate("/login");
    }
  };



  const getFavs = (): string[] => {
    return JSON.parse(localStorage.getItem('favorites') || "[]");
  };

  const playPause = (id: string) => {
    const episodesAux = [...episodes];
    episodesAux.forEach((episode) => {
      if(episode.id === id){
        episode.isPlaying = !episode.isPlaying;
        setPlaying(episode);
      } else {
        episode.isPlaying = false;
      }
    });
    setEpisodes(episodesAux);
  };

  const handleFavorite = (id: string) => {
    const episodesAux = [...episodes];
    let favoritesAux = [...favorites];
    const index = episodes.findIndex(episode => episode.id === id);
    episodesAux[index].isFavorite = !episodesAux[index].isFavorite;
    if (episodesAux[index].isFavorite) {
      favoritesAux.push(id);
    } else {
      favoritesAux = favorites.filter(episodeId => episodeId !== id);
    }
    setFavorites(favoritesAux);
    localStorage.setItem('favorites', JSON.stringify(favoritesAux));
    setEpisodes(episodesAux);
  };

  return (
    <div>
      <div className="px-4 flex flex-col items-center">
        <div>
          <div className="text-lg font-bold my-4">Shipit.io</div>
          {episodes.map(({ name, audio_preview_url, images, isPlaying, isFavorite, id }, i) => (
            <Card
              key={i}
              className="mb-4"
              name={name}
              preview_url={audio_preview_url}
              image={images[1].url}
              isPlaying={isPlaying}
              isFavorite={isFavorite}
              onToggle={() => playPause(id)}
              setFavorite={() => handleFavorite(id)}
              isPlayable={true}
            />
          ))}
        </div>
      </div>
      <div className="footer">
        {playing &&
          <Card
            className="mb-4 mt-4"
            name={playing?.name}
            preview_url={playing.audio_preview_url}
            image={playing.images[1].url}
            isPlaying={playing.isPlaying}
            isFavorite={playing.isFavorite}
            onToggle={() => playPause(playing.id)}
            setFavorite={() => handleFavorite(playing.id)}
            isPlayable={false}
          />}
      </div>
    </div>
  );
};

export default Home;

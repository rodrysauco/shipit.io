import { Card } from "../components/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEpisodes } from "../api/getEpisodes";
import { Episode } from "../types/episode";

const Home = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    !localStorage.getItem("access_token")
      ? navigate("/login")
      : fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    try {
      const data = await getEpisodes();
      setEpisodes(data);
    } catch (error) {
      localStorage.removeItem("access_token");
      navigate("/login");
    }
  };

  return (
    <div className="px-4 flex flex-col items-center">
      <div>
        <div className="text-lg font-bold my-4">Shipit.io</div>
        {episodes.map(({ name, audio_preview_url, images }, i) => (
          <Card
            key={i}
            className="mb-4"
            name={name}
            preview_url={audio_preview_url}
            image={images[1].url}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

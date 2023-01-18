import axios from "../utils/axios";
import { Episode } from "../types/episode";

export const getEpisodes = async (): Promise<Episode[]> => {
  try {
    const { data } = await axios.get("/shows/2P2BVhs19aqHVg7jUPuTjL/episodes");
    return data.items;
  } catch (error) {
    console.log("Error while getting episodes");
    throw error;
  }
};

import axios from "axios";
import { ytConstants } from "./constants";

export const getBlackFungusYt = (max) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${max}&q=blackfungus&key=${API_KEY}`);
      dispatch({
        type: ytConstants.GET_BL_FUNGUS_SUCCESS,
        payload: { ytBlackVideo: res },
      });
    } catch (error) {
      dispatch({
        type: ytConstants.GET_BL_FUNGUS_REQUEST,
        payload: error,
      });
    }
  };
};


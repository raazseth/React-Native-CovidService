import axios from "axios";
import { ytConstants } from "./constants";

export const getBlackFungusYt = (max) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${max}&q=blackfungus&key=AIzaSyAoVEQqk0UoC9SVv7yoqkaV0Zggkm6ymFY`);
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

// export const getIpAddress = () => {
//   return async (dispatch) => {
//     dispatch({
//       type: ytConstants.GET_IP_REQUEST,
//     });
//     try {
//       const res = await axios.get("http://ip-api.com/json/");
//       dispatch({
//         type: ytConstants.GET_IP_SUCESS,
//         payload: { ip: res.data },
//       });
//     } catch (error) {
//       dispatch({
//         type: ytConstants.GET_IP_FAILURE,
//         payload: error.response.data,
//       });
//     }
//   };
// };

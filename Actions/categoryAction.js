import axios from "../Helpers/axios";
import { categoryConstants } from "./constants";

export const getBloods = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: categoryConstants.GET_BLOOD_REQUEST });
      const res = await axios.get(`/getBlood`);
      if (res.status === 200) {
        const { blood } = res.data;
        dispatch({
          type: categoryConstants.GET_BLOOD_SUCESS,
          payload: { blood },
        });
      } else {
        dispatch({
          type: categoryConstants.GET_BLOOD_FAILURE,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

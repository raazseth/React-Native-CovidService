import axios from "../Helpers/axios";
import { oxygenConstants } from "./constants";

export const addOxygen = (oxygenForm) => {
  return async (dispatch) => {
    dispatch({ type: oxygenConstants.POST_OXYGEN_REQUEST });
    const res = await axios.post("/addOxygen", oxygenForm);
    const { oxygen } = res.data;
    if (res.status === 200) {
      dispatch({
        type: oxygenConstants.POST_OXYGEN_SUCCESS,
        payload: { oxygen },
      });
    } else if (res.status === 400) {
      dispatch({
        type: oxygenConstants.POST_OXYGEN_FAILURE,
        payload: { error: res.data.errors },
      });
    }
  };
};

export const getOxygen = () => {
  return async (dispatch) => {
    dispatch({ type: oxygenConstants.GET_ALL_OXYGEN_REQUEST });
    const res = await axios.get("/getOxygen");
    const { oxygen } = res.data;
    if (res.status === 200) {
      dispatch({
        type: oxygenConstants.GET_ALL_OXYGEN_SUCCESS,
        payload: { oxygen },
      });
    } else if (res.status === 400) {
      dispatch({
        type: oxygenConstants.GET_ALL_OXYGEN_FAILURE,
        payload: { error: res.data.errors },
      });
    }
  };
};

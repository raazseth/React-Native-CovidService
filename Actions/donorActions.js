import axios from "../Helpers/axios";
import { donorConstants, patientConstants } from "./constants";

export const addDonorProfile = (donorform) => {
  return async (dispatch) => {
    dispatch({ type: donorConstants.POST_DONOR_PROFILE_REQUEST });
    const res = await axios.post("/addDonor", donorform);
    const { donor } = res.data;
    if (res.status === 200) {
      dispatch({
        type: donorConstants.POST_DONOR_PROFILE_SUCCESS,
        payload: { donor },
      });
    } else if (res.status === 400) {
      dispatch({
        type: donorConstants.POST_DONOR_PROFILE_FAILURE,
        payload: { error: res.data.errors },
      });
    }
  };
};

export const getAllDonorProfile = () => {
  return async (dispatch) => {
    const res = await axios.get("/getDonor");
    const { donor } = res.data;
    dispatch({
      type: donorConstants.GET_ALL_DONOR_PROFILE_SUCCESS,
      payload: { donor },
    });
  };
};

export const addPatientDonorProfile = (patientform) => {
  return async (dispatch) => {
    dispatch({ type: patientConstants.POST_PATIENT_PROFILE_REQUEST });
    const res = await axios.post("/addPatient", patientform);
    const { patient } = res.data;
    if (res.status === 200) {
      dispatch({
        type: patientConstants.POST_PATIENT_PROFILE_SUCCESS,
        payload: { patient },
      });
    } else if (res.status === 400) {
      dispatch({
        type: patientConstants.POST_PATIENT_PROFILE_FAILURE,
        payload: { error: res.data.errors },
      });
    }
  };
};

export const getAllPatientDonorProfile = () => {
  return async (dispatch) => {
    const res = await axios.get("/getPatient");
    const { patient } = res.data;
    dispatch({
      type: patientConstants.GET_ALL_PATIENT_PROFILE_SUCCESS,
      payload: {  patient },
    });
  };
};

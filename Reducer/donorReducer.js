import { donorConstants, patientConstants } from "../Actions/constants";

const initState = {
  error: null,
  donor: [],
  loading: false,
  patient: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case donorConstants.POST_DONOR_PROFILE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case donorConstants.POST_DONOR_PROFILE_SUCCESS:
      state = {
        ...state,
        donor: action.payload.donor,
      };
      break;
    case donorConstants.POST_DONOR_PROFILE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case donorConstants.GET_ALL_DONOR_PROFILE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case donorConstants.GET_ALL_DONOR_PROFILE_SUCCESS:
      state = {
        ...state,
        donor: action.payload.donor,
      };
      break;
    case donorConstants.GET_ALL_DONOR_PROFILE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case patientConstants.POST_PATIENT_PROFILE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case patientConstants.POST_PATIENT_PROFILE_SUCCESS:
      state = {
        ...state,
        patient: action.payload.patient,
      };
      break;
    case patientConstants.POST_PATIENT_PROFILE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case patientConstants.GET_ALL_PATIENT_PROFILE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case patientConstants.GET_ALL_PATIENT_PROFILE_SUCCESS:
      state = {
        ...state,
        patient: action.payload.patient,
      };
      break;
    case patientConstants.GET_ALL_PATIENT_PROFILE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    default:
  }
  return state;
};

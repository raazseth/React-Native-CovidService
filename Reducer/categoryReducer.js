import { categoryConstants } from "../Actions/constants";

const initState = {
  blood: [],
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_BLOOD_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.GET_BLOOD_SUCESS:
      state = {
        ...state,
        blood: action.payload.blood,
      };
      break;
    case categoryConstants.GET_BLOOD_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;

    default:
  }
  return state;
};

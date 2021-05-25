import { oxygenConstants } from "../Actions/constants";

const initState = {
  oxygen: [],
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case oxygenConstants.POST_OXYGEN_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case oxygenConstants.POST_OXYGEN_SUCCESS:
      state = {
        ...state,
        oxygen: action.payload.oxygen,
      };
      break;
    case oxygenConstants.POST_OXYGEN_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case oxygenConstants.GET_ALL_OXYGEN_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case oxygenConstants.GET_ALL_OXYGEN_SUCCESS:
      state = {
        ...state,
        oxygen: action.payload.oxygen,
        loading: false,
      };
      break;
    case oxygenConstants.GET_ALL_OXYGEN_FAILURE:
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

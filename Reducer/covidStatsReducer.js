import { covidConstants } from "../Actions/constants";

const initState = {
  error: null,
  loading: false,
  overall: [],
  ip: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case covidConstants.GET_OVERALL_STATS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case covidConstants.GET_OVERALL_STATS_SUCESS:
      state = {
        ...state,
        overall: action.payload.overall,
      };
      break;
    case covidConstants.GET_OVERALL_STATS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
      case covidConstants.GET_IP_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case covidConstants.GET_IP_SUCESS:
        state = {
          ...state,
          ip: action.payload.ip,
        };
        break;
      case covidConstants.GET_IP_FAILURE:
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

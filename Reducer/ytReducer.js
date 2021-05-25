import { ytConstants } from "../Actions/constants";

const initState = {
  error: null,
  loading: false,
  ytBlackVideo: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case ytConstants.GET_BL_FUNGUS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ytConstants.GET_BL_FUNGUS_SUCCESS:
      state = {
        ...state,
        ytBlackVideo: action.payload.ytBlackVideo,
      };
      break;
    case ytConstants.GET_BL_FUNGUS_FAILURE:
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

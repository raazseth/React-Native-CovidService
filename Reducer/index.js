import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";
import donorReducer from "./donorReducer";
import covidStatsReducer from "./covidStatsReducer";
import oxygenReducer from "./oxygenReducer";
import ytReducer from "./ytReducer";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  category: categoryReducer,
  donor: donorReducer,
  covid: covidStatsReducer,
  oxygen: oxygenReducer,
  ytVideo: ytReducer,

});
export default rootReducer;

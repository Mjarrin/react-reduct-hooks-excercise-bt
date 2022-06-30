import { combineReducers } from "redux";
import quoteReducer from "./quoteReducer";
import formReducer from "./formReducer";

const reducers = combineReducers({
  quotes: quoteReducer,
  formValues: formReducer
});

export default reducers;

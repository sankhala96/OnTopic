import { combineReducers } from "redux";
import user from "./reducers/user";
import locale from "./reducers/locale"
import topic from "./reducers/topic"

export default combineReducers({
    user,
    locale,
    topic
});
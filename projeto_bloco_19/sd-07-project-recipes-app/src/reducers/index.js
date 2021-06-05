import { combineReducers } from 'redux';
import header from './header';
import mainpage from './mainpage';

const rootReducer = combineReducers({
  header,
  mainpage,
});

export default rootReducer;

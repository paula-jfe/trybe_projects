import {
  RENDER_SEARCH_ICON,
  CHANGE_PAGE_TITLE,
  SHOW_BAR,
  HIDE_BAR,
} from '../actions/header';

const INITIAL_STATE = {
  hasSearchIcon: false,
  pageTitle: '',
  barIsShowing: false,
};

const header = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RENDER_SEARCH_ICON:
    return { ...state, hasSearchIcon: true };
  case CHANGE_PAGE_TITLE:
    return { ...state, pageTitle: action.title };
  case SHOW_BAR:
    return { ...state, barIsShowing: true };
  case HIDE_BAR:
    return { ...state, barIsShowing: false };
  default:
    return state;
  }
};

export default header;

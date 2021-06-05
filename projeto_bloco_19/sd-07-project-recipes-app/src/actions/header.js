export const RENDER_SEARCH_ICON = 'RENDER_SEARCH_ICON';
export const renderSearchIcon = () => ({ type: RENDER_SEARCH_ICON });

export const CHANGE_PAGE_TITLE = 'CHANGE_PAGE_TITLE';
export const changePageTitle = (title) => ({
  type: CHANGE_PAGE_TITLE,
  title,
});

export const SHOW_BAR = 'SHOW_BAR';
export const showBar = () => ({ type: SHOW_BAR });

export const HIDE_BAR = 'HIDE_BAR';
export const hideBar = () => ({ type: HIDE_BAR });

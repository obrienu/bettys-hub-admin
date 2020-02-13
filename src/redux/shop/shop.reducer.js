import {
  POST_SHOP_ITEM,
  CLEAR_POST_STATUS,
  SEARCH_ITEM,
  SEARCH_CATEGORY,
  CLEAR_CATEGORY,
  CLEAR_SEARCH_ITEM,
  CLEAR_ITEM
} from "./shop.types";

const INITIAL_STATE = {
  post_status: "",
  item: null,
  search_items: null,
  search_total: 0,
  search_category: []
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_POST_STATUS:
      return {
        ...state,
        post_status: ""
      };
    case POST_SHOP_ITEM:
      return {
        ...state,
        post_status: action.payload.status,
        item: action.payload.item
      };

    case SEARCH_CATEGORY:
      return {
        ...state,
        search_category: [...action.payload]
      };
    case CLEAR_CATEGORY:
      return {
        ...state,
        search_category: []
      };
    case SEARCH_ITEM:
      return {
        ...state,
        search_items: action.payload.items,
        search_total: action.payload.totalItems
      };
    case CLEAR_SEARCH_ITEM:
      return {
        ...state,
        search_items: null,
        search_total: 0
      };
    case CLEAR_ITEM:
      return {
        item: null
      };
    default:
      return state;
  }
};

export default shopReducer;

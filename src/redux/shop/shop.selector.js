import { createSelector } from "reselect";

const shop = state => state.shop;

export const StatusSelector = createSelector([shop], shop => shop.post_status);

export const itemSelector = createSelector([shop], shop => shop.item);

export const searchSelector = createSelector([shop], shop => shop.search_items);
export const searchTotalSelector = createSelector(
  [shop],
  shop => shop.search_total
);

export const categorySelector = createSelector(
  [shop],
  shop => shop.search_category
);

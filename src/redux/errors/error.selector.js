import { createSelector } from "reselect";

const errorSelector = state => state.error;

export const errorMessageSelector = createSelector(
  [errorSelector],
  error => error.msg
);
export const errorIdSelector = createSelector(
  [errorSelector],
  error => error.id
);

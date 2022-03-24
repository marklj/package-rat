import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface BundlesState {
  [keyof: string]: {
    loading: boolean;
    code: string;
    error: string;
  };
}

const initalState: BundlesState = {};

const reducer = produce(
  (state: BundlesState = initalState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: "",
          error: "",
        };
        return state;
      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle,
          error: action.payload.error,
        };
        return state;
      default:
        return state;
    }
  }
);

export default reducer;

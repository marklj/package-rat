import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface BundlesState {
  isInit: boolean;
  items: {
    [keyof: string]:
      | {
          loading: boolean;
          code: string;
          error: string;
        }
      | undefined;
  };
}

const initalState: BundlesState = {
  isInit: false,
  items: {},
};

const reducer = produce(
  (state: BundlesState = initalState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionType.BUNDLER_INIT_COMPLETE:
        state.isInit = true;
        return state;
      case ActionType.BUNDLE_START:
        state.items[action.payload.cellId] = {
          loading: true,
          code: "",
          error: "",
        };
        return state;
      case ActionType.BUNDLE_COMPLETE:
        state.items[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle,
          error: action.payload.error,
        };
        return state;
      default:
        return state;
    }
  },
  initalState
);

export default reducer;

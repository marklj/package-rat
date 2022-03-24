import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { ActionType } from "./action-types";

export const store = createStore(reducers, applyMiddleware(thunk));

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: "code",
  },
});

const id = store.getState().cells.order[0];
store.dispatch({
  type: ActionType.UPDATE_CELL,
  payload: {
    id,
    content: "document.querySelector('#root').innerHTML = 'hello!'",
  },
});

console.log(store.getState());

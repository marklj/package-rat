import { ActionType } from "../action-types";
import { CellType, Direction } from "../cell";

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string; // id
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null; // null will insert at end
    type: CellType;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface BundlerInitAction {
  type: ActionType.BUNDLER_INIT;
}
export interface BundlerInitCompleteAction {
  type: ActionType.BUNDLER_INIT_COMPLETE;
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: string;
    error: string;
  };
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundlerInitAction
  | BundlerInitCompleteAction
  | BundleStartAction
  | BundleCompleteAction;

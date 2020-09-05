import { IReduxAction } from "../../../state/interfaces";

export enum ActionTypes {
  RESET_BOARD = 'RESET_BOARD'
}

export const resetBoard = (): IReduxAction<ActionTypes.RESET_BOARD> => ({
  type: ActionTypes.RESET_BOARD,
});

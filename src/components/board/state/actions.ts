import { IReduxAction } from "../../../state/interfaces";

export enum ActionTypes {
  RESET_BOARD = 'RESET_BOARD',
  UPDATE_BOARD_DATA = 'UPDATE_BOARD_DATA',
}

export const resetBoard = (): IReduxAction<ActionTypes.RESET_BOARD> => ({
  type: ActionTypes.RESET_BOARD,
});

export const updateBoardData = (selectedRowIndex: number, selectedCellIndex: number): IReduxAction<ActionTypes.UPDATE_BOARD_DATA, { selectedRowIndex: number, selectedCellIndex: number }> => ({
  type: ActionTypes.UPDATE_BOARD_DATA,
  data: {
    selectedCellIndex,
    selectedRowIndex,
  }
});

export type Actions =
  | ReturnType<typeof resetBoard>
  | ReturnType<typeof updateBoardData>
  ;

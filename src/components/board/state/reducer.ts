import { IState } from "./interfaces";
import { Actions, ActionTypes } from "./actions";
import { getNextPlayer } from "./util";
import { evaluateWinner } from "../../../core/winning";

const initialState: IState = {
  boardData: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
  ],
  winner: null,
}

export const reducer = (state: IState = initialState, action: Actions): IState => {
  switch(action.type) {
    case ActionTypes.UPDATE_BOARD_DATA: {
      const { selectedCellIndex, selectedRowIndex } = action.data!;
      const boardData: string[][] = state.boardData.map((row) => row.map((cell) => cell));

      boardData[selectedRowIndex][selectedCellIndex] = getNextPlayer();
      let winner = evaluateWinner(boardData, selectedRowIndex, selectedCellIndex);
      return {
        ...state,
        boardData,
        winner: winner !== null ? winner : state.winner,
      };
    }
    case ActionTypes.RESET_BOARD: {
      return initialState;
    }
    default:
      return state;
  }
}

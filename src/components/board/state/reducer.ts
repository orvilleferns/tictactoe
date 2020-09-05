import { IReduxAction } from "../../../state/interfaces";
import { IState } from "./interfaces";

const initialState: IState = {
  boardData: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
  ],
  winner: null,
}

export const reducer = (state: IState = initialState, action: IReduxAction) => {
  switch(action.type) {
    default:
      return state;
  }
}

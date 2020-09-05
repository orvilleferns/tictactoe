import { IState as IBoardState } from "../components/board/state/interfaces";

export interface IReduxAction<T = any, D = any> {
  type: T;
  data?: D;
}

export interface ITicTacToeState {
  board: IBoardState;
}

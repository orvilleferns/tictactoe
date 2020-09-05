import { ITicTacToeState } from "../../../state/interfaces";
import {createSelector} from 'reselect'

export const state = (applicationState: ITicTacToeState) => applicationState.board;

export const boardDataSelector = createSelector(
    state,
    (localState) => localState.boardData 
);

export const winnerSelector = createSelector(
    state,
    (localState) => localState.winner 
);
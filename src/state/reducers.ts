import { reducer as boardReducer } from '../components/board/state/reducer';
import { NAME as boardReducerNAME } from '../components/board/state/constants';

export const reducers = {
  [boardReducerNAME]: boardReducer,
}

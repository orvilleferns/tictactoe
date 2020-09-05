import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Cell } from '../cell/Cell'
import { boardDataSelector, winnerSelector } from './state/selectors';
import { updateBoardData, resetBoard } from './state/actions';

import './Board.css';

interface IStateProps {
  boardData: ReturnType<typeof boardDataSelector>;
  winner: ReturnType<typeof winnerSelector>;
}

interface IDispatchProps {
  updateBoardData: typeof updateBoardData;
  resetBoard: typeof resetBoard;
}

interface IProps extends IStateProps, IDispatchProps {

}

const mapStateToProps = createStructuredSelector<any, IStateProps>({
  boardData: boardDataSelector,
  winner: winnerSelector,
});

const mapDispatchToProps = {
  updateBoardData,
  resetBoard,
}

class BoardComponent extends React.PureComponent<IProps> {
    public render() {
        let index = 0;
        const { boardData, winner } = this.props;
        return (
            <div className="board">
                {
                    boardData.map((row, rowIndex) => {
                        return row.map((cell, cellIndex) => {
                            return (
                                <Cell
                                    data={cell}
                                    key={index++}
                                    rowIndex={rowIndex}
                                    cellIndex={cellIndex}
                                    onCellClicked={(selectedRowIndex, selectedCellIndex) => this.updateBoardData(selectedRowIndex, selectedCellIndex, cell)}
                                />);
                        });
                    })
                }

                <div>
                    <button onClick={() => this.props.resetBoard()}>
                        Reset board
                    </button>
                </div>
                {winner && winner !== 'draw' &&
                    <div>
                        Winner is {winner}!
                    </div>
                }
                {winner && winner === 'draw' &&
                    <div>
                        The game is a {winner}!
                    </div>
                }

            </div>
        )
    }

    private updateBoardData = (selectedRowIndex: number, selectedCellIndex: number, cell: string) => {
        if (this.props.winner === null && cell === '') {
            this.props.updateBoardData(selectedRowIndex, selectedCellIndex);
        }
    }
}

export const Board = connect(mapStateToProps, mapDispatchToProps)(BoardComponent);

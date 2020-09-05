import React from 'react';

import { Cell } from '../cell/Cell'

import './Board.css';
import { boardDataSelector, winnerSelector } from './state/selectors';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect'

interface IStateProps {
    boardData: ReturnType<typeof boardDataSelector>;
    winner: ReturnType<typeof winnerSelector>;
}

interface IProps extends IStateProps{

}

const mapStateToProps = createStructuredSelector<any, IStateProps>({
    boardData: boardDataSelector,
    winner: winnerSelector
})

// const PLAYERS = ['x', 'o'];

// let playerIndex = 0;

// const getNextPlayer = () => {
//     const nextIndex = (playerIndex + 1) % PLAYERS.length;
//     const nextPlayer = PLAYERS[playerIndex];
//     playerIndex = nextIndex;
//     return nextPlayer;
// }


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
                                    onCellClicked={(selectedRowIndex, selectedCellIndex) => null}
                                />);
                        });
                    })
                }

                <div>
                    <button>
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

    // private updateBoardData = (selectedRowIndex: number, selectedCellIndex: number, cell: string) => {
    //     if (this.state.winner === null && cell === '') {
    //         const boardData: string[][] = this.state.boardData.map((row) => row.map((cell) => cell));

    //         boardData[selectedRowIndex][selectedCellIndex] = getNextPlayer()

    //         this.setState({
    //             boardData,
    //         })

    //         let winner = evaluateWinner(boardData, selectedRowIndex, selectedCellIndex)

    //         if (winner !== null) {
    //             this.setState({ winner })
    //         }
    //     }
    // }

    // private resetBoard = () => {
    //     this.setState({ ...initialState });
    //     playerIndex = 0;
    //     console.log(this.state, initialState);
    // }

}

export const Board = connect(mapStateToProps)(BoardComponent)
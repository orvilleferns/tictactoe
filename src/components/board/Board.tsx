import React from 'react';

import { Cell } from '../cell/Cell'

import './Board.css';

interface IProps {

}

interface IState {
    boardData: string[][];
    winner: string | null;
}

const PLAYERS = ['x', 'o'];

let playerIndex = 0;

const initialState: IState = {
    boardData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    winner: null,
}

const getNextPlayer = () => {
    const nextIndex = (playerIndex + 1) % PLAYERS.length;
    const nextPlayer = PLAYERS[playerIndex];
    playerIndex = nextIndex;
    return nextPlayer;
}


export class Board extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { ...initialState };
    }
    public render() {
        let index = 0;
        const { boardData, winner } = this.state;
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
                    <button onClick={() => this.resetBoard()}>
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
        if (this.state.winner === null && cell === '') {
            const boardData: string[][] = [...this.state.boardData];

            boardData[selectedRowIndex][selectedCellIndex] = getNextPlayer()

            this.setState({
                boardData,
            })

            let winner = this.evaluateWinner(boardData, selectedRowIndex, selectedCellIndex)

            if (winner !== null) {
                this.setState({ winner })
            }
        }
    }

    private resetBoard = () => {
        this.setState({ ...initialState });
        playerIndex = 0;
    }

    private evaluateWinner = (boardData: string[][], selectedRowIndex: number, selectedCellIndex: number) => {
        let winner: string | null = null;
        let vIndex = 0;
        let hIndex = 0;

        const checkRow = (rowIndex: number) => {
            return (boardData[rowIndex][vIndex] !== '' &&
                boardData[rowIndex][vIndex] === boardData[rowIndex][vIndex + 1] &&
                boardData[rowIndex][vIndex] === boardData[rowIndex][vIndex + 2])
        };

        const checkCol = (cellIndex: number) => {
            return (boardData[hIndex][cellIndex] !== '' &&
                boardData[hIndex][cellIndex] === boardData[hIndex + 1][cellIndex] &&
                boardData[hIndex][cellIndex] === boardData[hIndex + 2][cellIndex])
        };

        const checkDiag1 = () => {
            if (boardData[hIndex + 1][vIndex + 1] !== '') {
                return (boardData[hIndex][vIndex] === boardData[hIndex + 1][vIndex + 1] &&
                    boardData[hIndex][vIndex] === boardData[hIndex + 2][vIndex + 2])
            }
        }

        const checkDiag2 = () => {
            if (boardData[hIndex + 1][vIndex + 1] !== '') {
                return (boardData[hIndex + 0][vIndex + 2] === boardData[hIndex + 1][vIndex + 1] &&
                    boardData[hIndex + 0][vIndex + 2] === boardData[hIndex + 2][vIndex + 0])
            }
        }

        const gameHasEnded = (boardData: string[][]) => {
            return boardData.every(row => {
               return row.every(cell => {
                    return cell !== '';
                })
            })
        }

        if (checkRow(selectedRowIndex) || checkCol(selectedCellIndex) || checkDiag1() || checkDiag2()) {
            winner = boardData[selectedRowIndex][selectedCellIndex];
        } else {
            if (gameHasEnded(boardData)) {
                winner = 'draw'
            }
        }

        return winner;
    }


}
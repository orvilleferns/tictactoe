import React from 'react';

import { Cell } from '../cell/Cell'

import { evaluateWinner } from '../../core/winning'

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
            const boardData: string[][] = this.state.boardData.map((row) => row.map((cell) => cell));

            boardData[selectedRowIndex][selectedCellIndex] = getNextPlayer()

            this.setState({
                boardData,
            })

            let winner = evaluateWinner(boardData, selectedRowIndex, selectedCellIndex)

            if (winner !== null) {
                this.setState({ winner })
            }
        }
    }

    private resetBoard = () => {
        this.setState({ ...initialState });
        playerIndex = 0;
        console.log(this.state, initialState);
    }

}
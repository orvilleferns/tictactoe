let INDEX = 0;

const checkRow = (boardData: string[][], rowIndex: number) => {
    return (boardData[rowIndex][INDEX] !== '' &&
        boardData[rowIndex][INDEX] === boardData[rowIndex][INDEX + 1] &&
        boardData[rowIndex][INDEX] === boardData[rowIndex][INDEX + 2])
};

const checkCol = (boardData: string[][], cellIndex: number) => {
    return (boardData[INDEX][cellIndex] !== '' &&
        boardData[INDEX][cellIndex] === boardData[INDEX + 1][cellIndex] &&
        boardData[INDEX][cellIndex] === boardData[INDEX + 2][cellIndex])
};

const checkDiag1 = (boardData: string[][]) => {
    if (boardData[INDEX + 1][INDEX + 1] !== '') {
        return (boardData[INDEX][INDEX] === boardData[INDEX + 1][INDEX + 1] &&
            boardData[INDEX][INDEX] === boardData[INDEX + 2][INDEX + 2])
    }
}

const checkDiag2 = (boardData: string[][]) => {
    if (boardData[INDEX + 1][INDEX + 1] !== '') {
        return (boardData[INDEX + 0][INDEX + 2] === boardData[INDEX + 1][INDEX + 1] &&
            boardData[INDEX + 0][INDEX + 2] === boardData[INDEX + 2][INDEX + 0])
    }
}

const gameHasEnded = (boardData: string[][]) => {
    return boardData.every(row => {
        return row.every(cell => {
            return cell !== '';
        })
    })
}

export const evaluateWinner = (
    boardData: string[][],
    selectedRowIndex: number,
    selectedCellIndex: number
): string | null => {
    let winner: string | null = null;

    if (checkRow(boardData, selectedRowIndex) || checkCol(boardData, selectedCellIndex) || checkDiag1(boardData,) || checkDiag2(boardData,)) {
        winner = boardData[selectedRowIndex][selectedCellIndex];
    } else {
        if (gameHasEnded(boardData)) {
            winner = 'draw'
        }
    }
    return winner;
}
const PLAYERS = ['x', 'o'];

let playerIndex = 0;

export const getNextPlayer = () => {
    const nextIndex = (playerIndex + 1) % PLAYERS.length;
    const nextPlayer = PLAYERS[playerIndex];
    playerIndex = nextIndex;
    return nextPlayer;
}

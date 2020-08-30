console.log('*******Welcome To Tic-Tac-Toe Game*******');
import { service } from './TicTacToeService';

let main = () => {
    service.setBoardPositions();
    service.setDefaultflags();
    service.displayBoard();
    service.setMoves();
}

main();
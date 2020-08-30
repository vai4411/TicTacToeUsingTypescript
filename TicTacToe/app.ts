console.log('*******Welcome To Tic-Tac-Toe Game*******');
import { service } from './TicTacToeService';

let main = () => {
    service.setBoardPositions();
    service.setDefaultflags();
    service.displayBoard();
    service.toss();
    let count: number = 0;
    while (count < 8) {
        service.checkMove();
        service.winningMove();
        service.blockMove();
        if (count > 6) {
            service.availableCorner();
            service.availableCenter();
            service.availableSide();
        }
        count++;
    }
    console.log("\nDraw game...");
}

main();
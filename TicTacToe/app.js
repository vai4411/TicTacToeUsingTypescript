"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('*******Welcome To Tic-Tac-Toe Game*******');
const TicTacToeService_1 = require("./TicTacToeService");
let main = () => {
    TicTacToeService_1.service.setBoardPositions();
    TicTacToeService_1.service.setDefaultflags();
    TicTacToeService_1.service.displayBoard();
    //service.setMoves();
    let turn = TicTacToeService_1.service.toss();
    let count = 0;
    while (count < 8) {
        if (turn == 0) {
            TicTacToeService_1.service.checkMove();
            //               this.checkWin(playerChoice);
        }
        else {
            TicTacToeService_1.service.checkMove();
        }
        //           this.checkWin(computerChoice);
        count++;
        if (count > 1) {
            TicTacToeService_1.service.winningMove();
            TicTacToeService_1.service.blockMove();
        }
        if (count > 6) {
            TicTacToeService_1.service.availableCorner();
            TicTacToeService_1.service.availableCenter();
            TicTacToeService_1.service.availableSide();
        }
    }
    console.log("\nDraw game...");
};
main();
//# sourceMappingURL=app.js.map
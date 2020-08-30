"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('*******Welcome To Tic-Tac-Toe Game*******');
const TicTacToeService_1 = require("./TicTacToeService");
let count = 0;
let main = () => {
    TicTacToeService_1.service.setBoardPositions();
    TicTacToeService_1.service.setDefaultflags();
    TicTacToeService_1.service.displayBoard();
    TicTacToeService_1.service.setMoves();
};
main();
//# sourceMappingURL=app.js.map
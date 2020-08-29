"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('*******Welcome To Tic-Tac-Toe Game*******');
const TicTacToeService_1 = require("./TicTacToeService");
let main = () => {
    TicTacToeService_1.service.setBoardPositions();
    TicTacToeService_1.service.displayBoard();
    TicTacToeService_1.service.toss();
};
main();
//# sourceMappingURL=app.js.map
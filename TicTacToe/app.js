console.log('*******Welcome To Tic-Tac-Toe Game*******');
let board = new Array();
//for (let position = 1; position <= 9; position++) {
//    board[position] = position;
//}
let displayBoard = () => {
    console.log("\t\t  " + board[1] + " | " + board[2] + " | " + board[3] + " ");
    console.log("\t\t-------------");
    console.log("\t\t  " + board[4] + " | " + board[5] + " | " + board[6] + " ");
    console.log("\t\t-------------");
    console.log("\t\t  " + board[7] + " | " + board[8] + " | " + board[9] + " ");
};
displayBoard();
//# sourceMappingURL=app.js.map
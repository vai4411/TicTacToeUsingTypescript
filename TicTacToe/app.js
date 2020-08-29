console.log('*******Welcome To Tic-Tac-Toe Game*******');
let board = new Array();
for (let position = 1; position <= 9; position++) {
    board[position] = String(position);
}
let displayBoard = () => {
    console.log("\t\t  " + board[1] + " | " + board[2] + " | " + board[3] + " ");
    console.log("\t\t-------------");
    console.log("\t\t  " + board[4] + " | " + board[5] + " | " + board[6] + " ");
    console.log("\t\t-------------");
    console.log("\t\t  " + board[7] + " | " + board[8] + " | " + board[9] + " ");
    console.log("\n");
};
displayBoard();
board[1] = 'x';
board[2] = 'o';
board[3] = 'x';
board[4] = 'o';
board[5] = 'x';
board[6] = 'o';
board[7] = 'x';
board[8] = 'o';
board[9] = 'x';
displayBoard();
let toss = () => {
    if (Math.round(Math.random()) == 1) {
        console.log("Player win the toss");
    }
    else {
        console.log("Computer win the toss");
    }
};
toss();
toss();
toss();
toss();
toss();
//# sourceMappingURL=app.js.map
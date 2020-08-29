"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.service = void 0;
var readlineSync = require('readline-sync');
let board = new Array();
let flag = new Array();
let player;
let computer;
let turn = 0;
class TicTacToeService {
    constructor() {
        this.setBoardPositions = () => {
            for (let position = 1; position <= 9; position++) {
                board[position] = String(position);
            }
        };
        this.setDefaultflags = () => {
            for (let position = 1; position <= 9; position++) {
                flag[position] = 0;
            }
        };
        this.displayBoard = () => {
            console.log("\n\t\t  " + board[1] + " | " + board[2] + " | " + board[3]);
            console.log("\t\t-------------");
            console.log("\t\t  " + board[4] + " | " + board[5] + " | " + board[6]);
            console.log("\t\t-------------");
            console.log("\t\t  " + board[7] + " | " + board[8] + " | " + board[9] + "\n");
        };
        this.toss = () => {
            if (Math.round(Math.random()) == 1) {
                console.log("Player win the toss");
                this.playerChooseOpion();
            }
            else {
                console.log("Computer win the toss");
                this.computerChooseOption();
            }
        };
        this.occupyPosition = (position, letter) => {
            board[position] = letter;
            this.displayBoard();
        };
        this.playerChooseOpion = () => {
            let option = readlineSync.question("\nEnter letter X or O:");
            player = option;
            if (option == "X") {
                computer = "O";
            }
            else {
                computer = "X";
            }
            let position = readlineSync.question("\nEnter position:");
            this.occupyPosition(position, player);
            turn = 1;
        };
        this.computerChooseOption = () => {
            if (Math.round(Math.random()) == 1) {
                computer = "X";
                player = "O";
            }
            else {
                computer = "O";
                player = "X";
            }
            let position = Math.round(Math.random() * 8) + 1;
            this.occupyPosition(position, player);
            turn = 0;
        };
    }
}
exports.service = new TicTacToeService();
//# sourceMappingURL=TicTacToeService.js.map
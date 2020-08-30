"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.service = void 0;
const process_1 = require("process");
var readlineSync = require('readline-sync');
let board = new Array();
let flag = new Array();
let playerChoice = "";
let computerChoice = "";
let chooseboardposition = 0;
let turn = 0;
let count = 0;
class TicTacToeService {
    constructor() {
        // set all position in board
        this.setBoardPositions = () => {
            for (let position = 1; position <= 9; position++) {
                board[position] = String(position);
            }
        };
        // set all flags as zero
        this.setDefaultflags = () => {
            for (let position = 1; position <= 9; position++) {
                flag[position] = 0;
            }
        };
        // display board
        this.displayBoard = () => {
            console.log("\n\t\t  " + board[1] + " | " + board[2] + " | " + board[3]);
            console.log("\t\t-------------");
            console.log("\t\t  " + board[4] + " | " + board[5] + " | " + board[6]);
            console.log("\t\t-------------");
            console.log("\t\t  " + board[7] + " | " + board[8] + " | " + board[9] + "\n");
        };
        // toss
        this.toss = () => {
            turn = Math.round(Math.random());
            if (turn == 1) {
                console.log("Player win the toss");
                this.playerChooseOption();
            }
            else {
                console.log("Computer win the toss");
                this.computerChooseOption();
            }
            return turn;
        };
        // set occupied position
        this.occupyPosition = (letter) => {
            board[chooseboardposition] = letter;
            this.displayBoard();
            flag[chooseboardposition] = 1;
        };
        // player input
        this.takePlayerInput = () => {
            chooseboardposition = readlineSync.question("\nEnter position:");
        };
        // player occupy position
        this.playerTurnFlag = () => {
            this.occupyPosition(playerChoice);
            turn = 1;
        };
        // computer input
        this.takeComputerInput = () => {
            chooseboardposition = Math.round(Math.random() * 8) + 1;
            return chooseboardposition;
        };
        // computer occupy position
        this.computerTurnFlag = () => {
            this.occupyPosition(computerChoice);
            turn = 0;
        };
        // check moves of player and computer
        this.checkMove = () => {
            if (turn == 0) {
                this.takePlayerInput();
            }
            else {
                this.takeComputerInput();
            }
            if (flag[chooseboardposition] == 0) {
                if (turn == 0) {
                    this.playerTurnFlag();
                }
                else {
                    this.computerTurnFlag();
                }
            }
            else {
                while (flag[chooseboardposition] != 0) {
                    if (turn == 0) {
                        this.takePlayerInput();
                    }
                    else {
                        this.takeComputerInput();
                    }
                }
                if (turn == 0) {
                    this.playerTurnFlag();
                }
                else {
                    this.computerTurnFlag();
                }
            }
        };
        this.setMoves = () => {
            this.toss();
            while (count < 9) {
                if (turn == 0) {
                    this.checkMove();
                    this.checkWin(playerChoice);
                }
                else {
                    this.checkMove();
                    console.log("Computer choose : " + chooseboardposition);
                }
                count++;
                this.checkWin(computerChoice);
            }
        };
        // player choose letter
        this.playerChooseOption = () => {
            playerChoice = readlineSync.question("\nEnter letter X or O:");
            if (playerChoice == "X") {
                computerChoice = "O";
            }
            else {
                computerChoice = "X";
            }
            this.takePlayerInput();
            this.playerTurnFlag();
            return playerChoice;
        };
        // computer choose letter
        this.computerChooseOption = () => {
            if (Math.round(Math.random()) == 1) {
                computerChoice = "X";
                playerChoice = "O";
            }
            else {
                computerChoice = "O";
                playerChoice = "X";
            }
            this.takeComputerInput();
            this.computerTurnFlag();
            return computerChoice;
        };
        // winning condition
        this.checkWin = (value) => {
            if ((board[1] == value && board[2] == value && board[3] == value) ||
                (board[4] == value && board[5] == value && board[6] == value) ||
                (board[7] == value && board[8] == value && board[9] == value) ||
                (board[1] == value && board[4] == value && board[7] == value) ||
                (board[2] == value && board[5] == value && board[8] == value) ||
                (board[3] == value && board[6] == value && board[9] == value) ||
                (board[1] == value && board[5] == value && board[9] == value) ||
                (board[3] == value && board[5] == value && board[7] == value)) {
                if (value == playerChoice) {
                    console.log("Player wins...");
                }
                else {
                    console.log("Computer wins...");
                }
                process_1.exit();
            }
        };
    }
}
exports.service = new TicTacToeService();
//# sourceMappingURL=TicTacToeService.js.map
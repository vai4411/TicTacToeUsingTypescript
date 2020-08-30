"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.service = void 0;
const process_1 = require("process");
const one = 1;
const two = 2;
const three = 3;
const four = 4;
const five = 5;
const six = 6;
const seven = 7;
const eight = 8;
const nine = 9;
var readlineSync = require('readline-sync');
let board = new Array();
let flag = new Array();
let playerChoice = "";
let computerChoice = "";
let chooseBoardposition = 0;
let turn = 0;
let count = 0;
let win = 0;
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
            let boardPosition = 0;
            for (let position = 1; position <= 3; position++) {
                console.log("\t\t -------------");
                console.log("\t\t | " + board[one + boardPosition] + " | " + board[two + boardPosition] + " | " + board[three + boardPosition] + " | ");
                console.log("\t\t -------------");
                boardPosition += 3;
            }
            console.log("\n");
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
            board[chooseBoardposition] = letter;
            this.displayBoard();
            flag[chooseBoardposition] = 1;
        };
        // player input
        this.takePlayerInput = () => {
            chooseBoardposition = readlineSync.question("\nEnter position:");
            while (chooseBoardposition > 9 || chooseBoardposition < 1) {
                console.log("Invalid choice you need to enter position between 1-9...");
                chooseBoardposition = readlineSync.question("\nEnter new position:");
            }
        };
        // player occupy position
        this.playerTurnFlag = () => {
            this.occupyPosition(playerChoice);
            turn = 1;
        };
        // computer input
        this.takeComputerInput = () => {
            chooseBoardposition = Math.round(Math.random() * 8) + 1;
            return chooseBoardposition;
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
            if (flag[chooseBoardposition] == 0) {
                if (turn == 0) {
                    this.playerTurnFlag();
                }
                else {
                    this.computerTurnFlag();
                }
            }
            else {
                while (flag[chooseBoardposition] != 0) {
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
        // set all position on board
        this.setMoves = () => {
            this.toss();
            while (count < 8) {
                if (turn == 0) {
                    this.checkMove();
                    this.checkWin(playerChoice);
                }
                else {
                    this.checkMove();
                    console.log("\nComputer choose : " + chooseBoardposition);
                }
                this.checkWin(computerChoice);
                count++;
                if (count > 1) {
                    this.winningMove();
                    this.blockMove();
                }
                if (count > 6) {
                    this.availableCorner();
                    this.availableCenter();
                    this.availableSide();
                }
            }
            console.log("\nDraw game...");
        };
        // player choose letter
        this.playerChoice = () => {
            playerChoice = readlineSync.question("\nEnter letter X or O:");
            if (playerChoice == "X") {
                computerChoice = "O";
            }
            else if (playerChoice == "O") {
                computerChoice = "X";
            }
            else {
                console.log("You Enter Invalid Choice Enter Letter X or O...");
            }
        };
        // player choose wrong letter
        this.playerChooseOption = () => {
            while (playerChoice != "X" && playerChoice != "O") {
                this.playerChoice();
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
        // test winning sequence
        this.testCondition = (firstValue, secondValue, thirdValue, value) => {
            let isWin = false;
            if (board[firstValue] == value && board[secondValue] == value && board[thirdValue] == value) {
                isWin = true;
            }
            return isWin;
        };
        // winning condition
        this.winCondition = (value) => {
            if (this.testCondition(one, two, three, value) || this.testCondition(four, five, six, value) ||
                this.testCondition(seven, eight, nine, value) || this.testCondition(one, four, seven, value) ||
                this.testCondition(two, five, eight, value) || this.testCondition(three, six, nine, value) ||
                this.testCondition(one, five, nine, value) || this.testCondition(three, five, seven, value)) {
                win = 1;
            }
        };
        // winning move
        this.winningMove = () => {
            for (let position = 1; position <= 9; position++) {
                if (flag[position] == 0) {
                    board[position] = playerChoice;
                    this.winCondition(playerChoice);
                    if (win == 1) {
                        win = 0;
                        console.log("\nChoose " + position + " to win");
                    }
                    board[position] = String(position);
                }
            }
        };
        // blocking move
        this.blockMove = () => {
            for (let position = 1; position <= 9; position++) {
                if (flag[position] == 0) {
                    board[position] = computerChoice;
                    this.winCondition(computerChoice);
                    if (win == 1) {
                        board[position] = String(position);
                        win = 0;
                        console.log("\nChoose " + position + " for block");
                    }
                    board[position] = String(position);
                }
            }
        };
        // display available corner
        this.availableCorner = () => {
            let corner = 0;
            if (flag[one] == 0) {
                corner = one;
            }
            else if (flag[one] == 0) {
                corner = one;
            }
            else if (flag[one] == 0) {
                corner = one;
            }
            else if (flag[one] == 0) {
                corner = one;
            }
            if (corner != 0) {
                console.log("\ncorner " + corner + " is available");
            }
        };
        // display available center
        this.availableCenter = () => {
            if (flag[five] == 0) {
                console.log("\ncenter 5 is available");
            }
        };
        // display available side
        this.availableSide = () => {
            let side = 0;
            if (flag[two] == 0) {
                side = two;
            }
            else if (flag[four] == 0) {
                side = four;
            }
            else if (flag[six] == 0) {
                side = six;
            }
            else if (flag[eight] == 0) {
                side = eight;
            }
            if (side != 0) {
                console.log("\nside " + side + " is available");
            }
        };
        // check for winner
        this.checkWin = (value) => {
            win = 0;
            this.winCondition(value);
            if (win == 1) {
                if (value == playerChoice) {
                    console.log("Player wins...");
                    process_1.exit();
                }
                else {
                    console.log("Computer wins...");
                    process_1.exit();
                }
            }
        };
    }
}
exports.service = new TicTacToeService();
//# sourceMappingURL=TicTacToeService.js.map
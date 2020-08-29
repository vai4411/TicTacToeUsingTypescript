import { exit } from "process";

var readlineSync = require('readline-sync');
let board: Array<string> = new Array<string>();
let flag: Array<number> = new Array<number>();
let player: string;
let computer: string;
let turn: number = 0;

class TicTacToeService {

    setBoardPositions = () => {
        for (let position = 1; position <= 9; position++) {
            board[position] = String(position);
        }
    }

    setDefaultflags = () => {
        for (let position = 1; position <= 9; position++) {
            flag[position] = 0;
        }
    }

    displayBoard = () => {
        console.log("\n\t\t  " + board[1] + " | " + board[2] + " | " + board[3]);
        console.log("\t\t-------------");
        console.log("\t\t  " + board[4] + " | " + board[5] + " | " + board[6]);
        console.log("\t\t-------------");
        console.log("\t\t  " + board[7] + " | " + board[8] + " | " + board[9] + "\n");
    }

    toss = () => {
        if (Math.round(Math.random()) == 1) {
            console.log("Player win the toss");
            this.playerChooseOpion();
        }
        else {
            console.log("Computer win the toss");
            this.computerChooseOption();
        }
    }

    occupyPosition = (position: number, letter: string) => {
        board[position] = letter;
        this.displayBoard();

    }

    playerChooseOpion = () => {
        let option: string = readlineSync.question("\nEnter letter X or O:");
        player = option;
        if (option == "X") {
            computer = "O";
        }
        else {
            computer = "X";
        }
        let position: number = readlineSync.question("\nEnter position:");
        this.occupyPosition(position, player);
        turn = 1;
    }

    computerChooseOption = () => {
        if (Math.round(Math.random()) == 1) {
            computer = "X";
            player = "O";
        }
        else {
            computer = "O";
            player = "X";
        }
        let position: number = Math.round(Math.random() * 8) + 1;
        this.occupyPosition(position, player);
        turn = 0;
    }

    checkWin = (value: string) => {
        if ((board[1] == value && board[2] == value && board[3] == value) ||
            (board[4] == value && board[5] == value && board[6] == value) ||
            (board[7] == value && board[8] == value && board[9] == value) ||
            (board[1] == value && board[4] == value && board[7] == value) ||
            (board[2] == value && board[5] == value && board[8] == value) ||
            (board[3] == value && board[6] == value && board[9] == value) ||
            (board[1] == value && board[5] == value && board[9] == value) ||
            (board[3] == value && board[5] == value && board[7] == value)) {
            if (value == player) {
                console.log("Player wins...");
            }
            else {
                console.log("Computer wins...");
            }
            exit();
        }
    }
}

export let service = new TicTacToeService();
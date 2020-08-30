import { exit } from "process";
import { Console } from "console";

var readlineSync = require('readline-sync');
let board: Array<string> = new Array<string>();
let flag: Array<number> = new Array<number>();
let playerChoice: string = "";
let computerChoice: string = "";
let chooseBoardposition: number = 0;
let turn: number = 0;
let count: number = 0;
let win: number = 0;
let winMove: number = 0;

class TicTacToeService {

    // set all position in board
    setBoardPositions = () => {
        for (let position = 1; position <= 9; position++) {
            board[position] = String(position);
        }
    }

    // set all flags as zero
    setDefaultflags = () => {
        for (let position = 1; position <= 9; position++) {
            flag[position] = 0;
        }
    }

    // display board
    displayBoard = () => {
        console.log("\n\t\t  " + board[1] + " | " + board[2] + " | " + board[3]);
        console.log("\t\t-------------");
        console.log("\t\t  " + board[4] + " | " + board[5] + " | " + board[6]);
        console.log("\t\t-------------");
        console.log("\t\t  " + board[7] + " | " + board[8] + " | " + board[9] + "\n");
    }

    // toss
    toss = (): number => {
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
    }

    // set occupied position
    occupyPosition = (letter: string): void => {
        board[chooseBoardposition] = letter;
        this.displayBoard();
        flag[chooseBoardposition] = 1;
    }

    // player input
    takePlayerInput = (): void => {
        chooseBoardposition = readlineSync.question("\nEnter position:");
    }

    // player occupy position
    playerTurnFlag = (): void => {
        this.occupyPosition(playerChoice);
        turn = 1;
    }

    // computer input
    takeComputerInput = (): number => {
        chooseBoardposition = Math.round(Math.random() * 8) + 1;
        return chooseBoardposition;
    }

    // computer occupy position
    computerTurnFlag = (): void => {
        this.occupyPosition(computerChoice);
        turn = 0;
    }

    // check moves of player and computer
    checkMove = () => {
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
    }

    // set all position on board
    setMoves = () => {
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
            count++;
            this.checkWin(computerChoice);
            if (count > 1) {
                this.winningMove();
                this.blockMove();
            }
            if (count > 6) {
                this.availablePosition();
            }
        }
        console.log("\nDraw game...");
    }

    // player choose letter
    playerChooseOption = (): string => {
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
    }

    // computer choose letter
    computerChooseOption = (): string => {
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
    }

    // winning condition
    winCondition = (value: string) => {
        if ((board[1] == value && board[2] == value && board[3] == value) ||
            (board[4] == value && board[5] == value && board[6] == value) ||
            (board[7] == value && board[8] == value && board[9] == value) ||
            (board[1] == value && board[4] == value && board[7] == value) ||
            (board[2] == value && board[5] == value && board[8] == value) ||
            (board[3] == value && board[6] == value && board[9] == value) ||
            (board[1] == value && board[5] == value && board[9] == value) ||
            (board[3] == value && board[5] == value && board[7] == value)) {
            win = 1;
        }
    }

    // winning move
    winningMove = () => {
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
    }

    // blocking move
    blockMove = () => {
        for (let position = 1; position <= 9; position++) {
            if (flag[position] == 0) {
                board[position] = computerChoice;
                this.winCondition(computerChoice);
                if (win == 1) {
                    board[position] = String(position);
                    win = 0
                    console.log("\nChoose " + position + " for block");
                }
                board[position] = String(position);
            }
        }
    }

    availablePosition = () => {
        if (flag[1] == 0) {
            console.log("\ncorner 1 is available");
        }
        if (flag[3] == 0) {
            console.log("\ncorner 3 is available");
        }
        if (flag[7] == 0) {
            console.log("\ncorner 7 is available");
        }
        if (flag[9] == 0) {
            console.log("\ncorner 9 is available");
        }
    }

    // check for winner
    checkWin = (value: string) => {
        win = 0;
        this.winCondition(value);
        if (win == 1) {
            if (value == playerChoice) {
                console.log("Player wins...");
                exit();
            }
            else {
                console.log("Computer wins...");
            }
        }
    }
}

export let service = new TicTacToeService();
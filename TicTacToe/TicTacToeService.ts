import { exit } from "process";

var readlineSync = require('readline-sync');
let board: Array<string> = new Array<string>();
let flag: Array<number> = new Array<number>();
let playerChoice: string = "";
let computerChoice: string = "";
let chooseboardposition: number = 0;
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
        board[chooseboardposition] = letter;
        this.displayBoard();
        flag[chooseboardposition] = 1;
    }

    // player input
    takePlayerInput = (): void => {
        chooseboardposition = readlineSync.question("\nEnter position:");
    }

    // player occupy position
    playerTurnFlag = (): void => {
        this.occupyPosition(playerChoice);
        turn = 1;
    }

    // computer input
    takeComputerInput = (): number => {
        chooseboardposition = Math.round(Math.random() * 8) + 1;
        return chooseboardposition;
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
    }

    // set all position on board
    setMoves = () => {
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
            if (count > 2) {
                this.winningMove();
            }
        }
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

    winningMove = () => {
        for (let position = 1; position <= 9; position++) {
            if (flag[position] == 0) {
                board[position] = playerChoice;
                this.winCondition(playerChoice);
                if (win == 1) {
                    win = 0;
                    console.log("\nChoose move to win : " + position);
                }
                board[position] = String(position);
            }
        }
    }

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
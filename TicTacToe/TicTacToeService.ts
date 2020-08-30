import { exit } from "process";

var readlineSync = require('readline-sync');

// constants
const one: number = 1;
const two: number = 2;
const three: number = 3;
const four: number = 4;
const five: number = 5;
const six: number = 6;
const seven: number = 7;
const eight: number = 8;
const nine: number = 9;

// variables
let board: Array<string> = new Array<string>();
let flag: Array<number> = new Array<number>();
let playerChoice: string = "";
let computerChoice: string = "";
let chooseBoardPosition: number = 0;
let turn: number = 0;
let win: number = 0;

class TicTacToeService {

    // set all position in board
    setBoardPositions = (): void => {
        for (let position = 1; position <= 9; position++) {
            board[position] = String(position);
        }
    }

    // set all flags as zero
    setDefaultflags = (): void => {
        for (let position = 1; position <= 9; position++) {
            flag[position] = 0;
        }
    }

    // display board
    displayBoard = (): void => {
        let boardPosition = 0;
        for (let position = 1; position <= 3; position++) {
            console.log("\t\t -------------");
            console.log("\t\t | " + board[one + boardPosition] + " | " + board[two + boardPosition] + " | " + board[three + boardPosition] + " | ");
            console.log("\t\t -------------");
            boardPosition += 3;
        }
        console.log("\n");
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
        board[chooseBoardPosition] = letter;
        this.displayBoard();
        flag[chooseBoardPosition] = 1;
    }

    // player input
    takePlayerInput = (): void => {
        chooseBoardPosition = readlineSync.question("\nEnter position:");
        while (chooseBoardPosition > 9 || chooseBoardPosition < 1) {
            console.log("Invalid choice you need to enter position between 1-9...");
            chooseBoardPosition = readlineSync.question("\nEnter new position:");
        }
    }

    // player occupy position
    playerTurnFlag = (): void => {
        this.occupyPosition(playerChoice);
        turn = 1;
    }

    // computer input
    takeComputerInput = (): number => {
        chooseBoardPosition = Math.round(Math.random() * 8) + 1;
        return chooseBoardPosition;
    }

    // computer occupy position
    computerTurnFlag = (): void => {
        this.occupyPosition(computerChoice);
        turn = 0;
    }

    // check moves of player and computer
    checkMove = (): void => {
        if (turn == 0) {
            this.takePlayerInput();
        }
        else {
            this.takeComputerInput();
        }
        if (flag[chooseBoardPosition] == 0) {
            if (turn == 0) {
                this.playerTurnFlag();
            }
            else {
                this.computerTurnFlag();
                console.log("Computer choose : " + chooseBoardPosition);
            }
        }
        else {
            while (flag[chooseBoardPosition] != 0) {
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
                console.log("Computer choose : " + chooseBoardPosition);
            }
        }
        this.checkWin(playerChoice);
        this.checkWin(computerChoice);
    }

    // player choose letter
    playerChoice = (): void => {
        playerChoice = readlineSync.question("\nEnter letter X or O:");
        if (playerChoice == "X") {
            computerChoice = "O";
        }
        else
            if (playerChoice == "O") {
                computerChoice = "X";
            }
            else {
                console.log("You Enter Invalid Choice Enter Letter X or O...");
            }
    }

    // player choose wrong letter
    playerChooseOption = (): string => {
        while (playerChoice != "X" && playerChoice != "O") {
            this.playerChoice();
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
        console.log("Computer choose : " + chooseBoardPosition);
        return computerChoice;
    }

    // test winning sequence
    testCondition = (firstValue: number, secondValue: number, thirdValue: number, value: string): boolean => {
        let isWin: boolean = false;
        if (board[firstValue] == value && board[secondValue] == value && board[thirdValue] == value) {
            isWin = true;
        }
        return isWin;
    }

    // winning condition
    winCondition = (value: string): void => {
        if (this.testCondition(one, two, three, value) || this.testCondition(four, five, six, value) ||
            this.testCondition(seven, eight, nine, value) || this.testCondition(one, four, seven, value) ||
            this.testCondition(two, five, eight, value) || this.testCondition(three, six, nine, value) ||
            this.testCondition(one, five, nine, value) || this.testCondition(three, five, seven, value)) {
            win = 1;
        }
    }

    // winning move
    winningMove = (): void => {
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
    blockMove = (): void => {
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

    // display available corner
    availableCorner = (): void => {
        let corner: number = 0;
        if (flag[one] == 0) {
            corner = one;
        }
        else
            if (flag[one] == 0) {
                corner = one;
            }
            else
                if (flag[one] == 0) {
            corner = one;
                }
                else
                    if (flag[one] == 0) {
                        corner = one;
                    }
        if (corner != 0) {
            console.log("\ncorner " + corner +" is available");
        }
    }

    // display available center
    availableCenter = (): void => {
        if (flag[five] == 0) {
            console.log("\ncenter 5 is available");
        }
    }

    // display available side
    availableSide = (): void => {
        let side: number = 0;
        if (flag[two] == 0) {
            side = two;
        }
        else
            if (flag[four] == 0) {
                side = four;
            }
            else
                if (flag[six] == 0) {
                    side = six;
                }
                else
                    if (flag[eight] == 0) {
                        side = eight;
                    }
        if (side != 0) {
            console.log("\nside " + side + " is available");
        }
    }

    // check for winner
    checkWin = (value: string): void => {
        win = 0;
        this.winCondition(value);
        if (win == 1) {
            if (value == playerChoice) {
                console.log("Player wins...");
                exit();
            }
            else {
                console.log("Computer wins...");
                exit();
            }
        }
    }
}

export let service = new TicTacToeService();
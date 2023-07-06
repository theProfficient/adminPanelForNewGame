import game1 from "../assets/cricket.jpg"
import game2 from "../assets/snakeLadder.jpg"
import game3 from "../assets/tictactoe.jpg"
import game4 from "../assets/airHockey.jpg";
import { Route, Routes, Navigate } from "react-router-dom";

const gamesCardData = [
    {
        imgsrc: game1,
        title:"Cricket",
        text:"Cricket is a sport that requires the use of a bat and ball. It is easily one of the most prevalent sports in the world.",
        view:"/games/cricket"
    },

    {
        imgsrc: game2,
        title:"SnakeLadder",
        text:"Snakes and Ladders is a chance-based board game featuring 100 squares. Players have to get to the top while dealing with the consequences of every dice roll.",
        view:"/games/snakeLadder"
    },

    {
        imgsrc: game3,
        title:"TicTacToe",
        text:"Tic-Tac-Toe is traditionally played on a 3 × 3 grid. Players take turns placing a mark in one of the cells of the grid. The goal of the game is for players to position their marks so that they make a continuous line of three cells vertically, horizontally, or diagonally.",
        view:"/TicTacToe"
    },

    {
        imgsrc: game4,
        title:"AirHockey",
        text:"Air Hockey is a table game in which two players attempt to score points by using a handheld paddle to shoot a plastic disk across a surface with minimal friction into the opponent's goal.",
        view:"AirHockey"
    },

]

export default gamesCardData;
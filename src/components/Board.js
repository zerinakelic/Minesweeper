import React, {useState, useEffect} from "react";
import './Board.css'
import {Link} from "react-router-dom";
import CreateBoard from '../utils/CreateBoard';
import {revealed} from "../utils/Reveal";
import Cell from "./Cell";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useStopwatch} from "react-timer-hook";
import firebase from "firebase";

/**
 * Board component represents minesweeper board that we can click on
 * Contains the main logic for user interaction with game
 * @param props
 * @returns {JSX.Element}
 */
function Board(props) {
    const x = props.x
    const y = props.y
    const bombs = props.bombs
    const myName = props.name

    const [grid, setGrid] = useState([]);
    const [nonMinecount, setNonMinecount] = useState(0);
    const [mineLocation, setmineLocation] = useState([]);
    const [visible, setVisible] = useState(true);
    let db = firebase.firestore();

    /**
     * In UseEffect, only at the first page rendering, we use freshBoard
     */
    useEffect(() => {
        freshBoard();
    }, []);

    /**
     * Messages to display
     */
    const won = () => {
        toast.success("You won!", {position: toast.POSITION.TOP_CENTER, autoClose: 2000});
    }
    const lost = () => {
        toast.error("You lost!", {position: toast.POSITION.TOP_CENTER, autoClose: 2000});
    }
    /**
     * Stopwatch
     */
    const {
        seconds,
        minutes,
        hours,
        start,
        pause,
        reset,
    } = useStopwatch({autoStart: true});

    /**
     * Making freshboard at start
     */
    const freshBoard = () => {
        const newBoard = CreateBoard(x, y, bombs);
        setNonMinecount(x * y - bombs);
        setmineLocation(newBoard.mineLocation);
        setGrid(newBoard.board);
    }
    const newfresh = () => {
        freshBoard();
    }
    /**
     * Updates flag - if user pressed right mouse click we put flag on cell
     * @param e
     * @param x
     * @param y
     */
    const updateFlag = (e, x, y) => {
        e.preventDefault();
        // deep copy of the object
        let newGrid = JSON.parse(JSON.stringify(grid));
        newGrid[x][y].flagged = true;
        console.log(newGrid[x][y]);
        setGrid(newGrid);
    }
    /**
     * Revealing all cells and the minelocation with all mines when clicked on mines
     * @param x
     * @param y
     */
    const revealcell = (x, y) => {
        let newGrid = JSON.parse(JSON.stringify(grid));

        if (newGrid[x][y].value === "X") {
            setVisible(false)
            pause()
            lost()
            for (let i = 0; i < mineLocation.length; i++) {
                newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed = true;
            }
        }

        if (nonMinecount === 0) {
            setVisible(false)
            addUser()
            pause()
            won()
        } else {
            let revealedboard = revealed(newGrid, x, y, nonMinecount);
            setGrid(revealedboard.arr);
            setNonMinecount(revealedboard.newNonMines);
        }
    }
    /**
     * if we press button - New game - we call this function
     */
    const newGame = () => {
        setVisible(true)
        setGrid(grid);
        setTimeout(newfresh, 0);
        reset()
    }

    /**
     * Function that adds user to firebase
     */
    function addUser() {
        let time;
        time = minutes.toString() + " : " + seconds.toString();
        let level;
        if (y == 9)
            level = "Easy"
        else if (y == 16)
            level = "Medium"
        else
            level = "Expert"

        db.collection("winners").doc(myName.toString()).set({
            name: myName,
            level: level,
            time: time,
            timeInSeconds: seconds + 60 * minutes,
            winner: true
        })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }


    return (

        <div style={{textAlign: 'center'}}>
            <div>
                <div style={{fontSize: '80px', color: 'floralwhite'}}>
                    <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                </div>
            </div>

            <div>
                <h3 style={{color: 'white', textAlign: 'center', fontSize: '30px', margin: '0px'}}>Non-Mines
                    : {nonMinecount}</h3>
                {grid.map((singlerow, index1) => {
                    return (
                        <div style={{pointerEvents: visible ? "auto" : "none"}} className="board" key={index1}>
                            {singlerow.map((singlecol, index2) => {
                                return <Cell
                                    details={singlecol} key={index2} updateFlag={updateFlag}
                                    revealcell={revealcell}/>
                            })}
                        </div>
                    )
                })}
            </div>
            <button onClick={newGame} className="top-button">Play again</button>
            <Link to="/highscore">
                <button className="top-button">TOP 10</button>
            </Link>
            <ToastContainer/>
        </div>
    )
}

export default Board;

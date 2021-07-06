import React from 'react';
import Board from "../components/Board";
import '../App.css'

/**
 * Game component that renders Board component
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Game(props) {
    return (
        <div className="center">
            <div className="heading">
                <h1>MineSweeper</h1>
            </div>

            <div className="aligned">
                <Board x={props.match.params.x} y={props.match.params.y} bombs={props.match.params.bombs} name={props.match.params.name}/>
            </div>
        </div>
    );
}

export default Game;

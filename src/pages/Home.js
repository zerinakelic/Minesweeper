import React, {useState} from 'react';
import '../App.css'
import './Home.css'
import {Link} from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Home component - here we require from user to input username and choose level to play
 * @returns {JSX.Element}
 * @constructor
 */
function Home() {
    const [name, setName] = useState("")
    const message = () => {
        toast.info("Please enter your name", {position: toast.POSITION.TOP_CENTER, autoClose: 2000});
    }
    /**
     * Function that handles form submit
     * @param event
     */
    const handleSubmit = (event) => {
        if (name === "") {
            message()
            event.preventDefault()
        }
    }
    /**
     * We prevent default behaviour when pressing enter in input field
     * @param e
     */
    const checkKeyDown = (e) => {
        if (e.code === 'Enter') e.preventDefault();
    };
    /**
     * render component
     */
    return (
        <>
            <div className="centerHome">
                <div className="heading">
                    <h1>MineSweeper</h1>
                </div>
            </div>
            <div className="centerHome">
                <form onSubmit={handleSubmit} onKeyDown={(e) => checkKeyDown(e)} className="flex-form">
                    <label>Enter your name:</label>
                    <input type="text" onChange={event => setName(event.target.value)}/> {/*required*/}

                    <div className="flex-buttons">
                        <Link onClick={handleSubmit} to={`/game/ ${9}, ${9}, ${10}, ${name}`}>
                            <button className="play-button">Easy (9x9)</button>
                        </Link>
                        <Link onClick={handleSubmit} to={`/game/ ${16}, ${16}, ${40}, ${name}`}>
                            <button className="play-button">Medium (16x16)</button>
                        </Link>
                        <Link onClick={handleSubmit} to={`/game/ ${16}, ${30}, ${90}, ${name}`}>
                            <button className="play-button">Expert (30x16)</button>
                        </Link>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </>
    );
}

export default Home;

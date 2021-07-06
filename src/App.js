import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import HighScore from "./pages/HighScore";

/**
 * App component
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/game/:x,:y,:bombs,:name" component={Game}/>
                <Route path="/highscore" component={HighScore}/>
            </Switch>
        </Router>
    );
}

export default App;

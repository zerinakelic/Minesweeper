import firebase from "firebase";
import React, {useState, useEffect} from "react";
import "./HighScore.css";

/**
 * HighScore component - renders highscore - ordered by best players (shortest time)
 * @returns {JSX.Element}
 * @constructor
 */
function HighScore() {
    let db = firebase.firestore();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        readUser();
    }, [])

    /**
     * Function readUser - reads data from database
     */
    function readUser() {
        db.collection("winners").orderBy("timeInSeconds").limit(30)
            .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                let array = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        user: doc.data()
                    })
                ); //pravimo niz elemenata iz baze
                setUsers(array);  //kopiramo niz iz firebase u nas users
                console.log(array)

            });
        })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }
    /**
     *
     * Renders data that is Easy level
     */
    function renderObjectEasy() {
        return Object.entries(users).map(([key, value], i) => {
            if (value.user.level === "Easy")
                return (
                    <div key={key}>
                        <ul className="kartica">
                            <li> Player: {value.user.name} </li>
                            <li> Time: {value.user.time} </li>
                        </ul>
                    </div>
                )
        })
    }

    /**
     *
     * Renders data that is Medium level
     */
    function renderObjectMedium() {
        return Object.entries(users).map(([key, value], i) => {
            if (value.user.level === "Medium")
                return (
                    <div key={key}>
                        <ul className="kartica">
                            <li> Player: {value.user.name} </li>
                            <li> Time: {value.user.time} </li>
                        </ul>
                    </div>
                )
        })
    }

    /**
     *
     * Renders data that is Expert level
     */
    function renderObjectExpert() {
        return Object.entries(users).map(([key, value], i) => {
            if (value.user.level === "Expert")
                return (
                    <div key={key}>
                        <ul className="kartica">
                            <li> Player: {value.user.name} </li>
                            <li> Time: {value.user.time} </li>
                        </ul>
                    </div>
                )
        })
    }

    /**
     *
     */
    return (
        <div className="center">
            <h1>TOP PLAYERS</h1>
            <div className="three-containers">
                <div className="flex-container">
                    <h3>Easy</h3>
                    {renderObjectEasy()}
                </div>
                <div className="flex-container">
                    <h3>Medium</h3>
                    {renderObjectMedium()}
                </div>
                <div className="flex-container">
                    <h3>Expert</h3>
                    {renderObjectExpert()}
                </div>
            </div>
        </div>
    );
}

export default HighScore;
import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import {AwesomeButton} from "react-awesome-button";
//import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";
import "react-awesome-button/dist/styles.css";
import TextBox from "./TextBox";
import GameMessage from "./GameMessage";

function BlackJack(props) {
    const [playerScore, setPlayerScore] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);
    const [whoWon, setWhoWon] = useState("");

    function hit() {
        //filler obv
        setPlayerScore(21);
    }

    function stand() {
        const player = playerScore;
        const dealer = dealerScore;
        if (player > dealer) {
            //display "you win!"
            setWhoWon("You Win!");
        }
        else if (player < dealer) {
            //display "you lose :("
            setWhoWon("You Lose :(");
        }
        else {
            //display "it's a tie"
            setWhoWon("It's a Tie!");
        }
    }

    /**
     * Gets key longitude
     * @param lon
     * @param lambda
     * @returns {JSX.Element}
     */
 //function convertKeytoCard(num) {
//     return Math.floor(lon / lambda) * lambda;

 //}
    function Button() {
        return <AwesomeButton type="primary"> Button</AwesomeButton>;
    }
    return (
        <div>
            Testing hello!
            <br/>
            {/* <TextBox label="" change={testIng} /> */}
            {/* <AwesomeButton type="primary" onPress={requestStreetRoute}> Manual Street Input Button </AwesomeButton> */}
            <AwesomeButton
                type="primary"
                size="large"
                onPress={hit}>Hit</AwesomeButton>
            <br/>
            <AwesomeButton type="primary" size="large" onPress={stand}>Stand</AwesomeButton>
            <br/>
            <GameMessage text = {whoWon}/>
        </div>
    )
}


export default BlackJack
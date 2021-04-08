import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { AwesomeButton } from "react-awesome-button";
//import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";
import "react-awesome-button/dist/styles.css";
import TextBox from "./TextBox";
import GameMessage from "./GameMessage";

function BlackJack(props) {
    const cards = Array.from(Array(52).keys());
    const [playerScore, setPlayerScore] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);
    const [whoWon, setWhoWon] = useState("");

    const [cardsToDealer, setCardsToDealer] = useState([]);
    const [cardsToPlayer, setCardsToPlayer] = useState([]);
    const [cardValuesToDealer, setCardValuesToDealer] = useState([]);
    const [cardValuesToPlayer, setCardValuesToPlayer] = useState([]);

    function play() {
        let dealerCardsAndValues = setUpCards(2);
        let playerCardsAndValues = setUpCards(2);
        setCardsToDealer(cardsToDealer.concat(dealerCardsAndValues[0]));
        setCardsToPlayer(cardsToPlayer.concat(playerCardsAndValues[0]));
        setCardValuesToDealer(cardValuesToDealer.concat(dealerCardsAndValues[1]));
        setCardValuesToPlayer(cardValuesToPlayer.concat(playerCardsAndValues[1]));
    }

    function setUpCards(n) {
        let cardsToAdd = [];
        let cardsToPerson = [];
        let cardsValuesToPerson = [];

        for (let i = 0; i < n; i++) {
            let randIndex = Math.floor(Math.random() * cards.length);
            let chosenCardKey = cards.splice(randIndex, 1);
            let chosenCard = cardFromKey(chosenCardKey);

            cardsValuesToPerson.push(chosenCardKey % 13 + 1);
            cardsToPerson.push(chosenCard);
        }

        cardsToAdd.push(cardsToPerson);
        cardsToAdd.push(cardsValuesToPerson);

        return cardsToAdd;
    }

    // TODO: Currently coded for the purpose of displaying as text message, but should change it
    // to make it easier to find the right graphics to display
    function cardFromKey(key) {
        let card = "";

        let cardNumber = key % 13 + 1;
        if (cardNumber === 1) {
            card += "Ace ";
        } else if (cardNumber === 11) {
            card += "Jack ";
        } else if (cardNumber === 12) {
            card += "Queen ";
        } else if (cardNumber === 13) {
            card += "King ";
        } else {
            card += cardNumber + " ";
        }

        // Spades
        if (key < 13) {
            card += "Spades ";
        }
        // Hearts
        else if (key < 26) {
            card += "Hearts ";
        }
        // Clubs
        else if (key < 39) {
            card += "Clubs ";
        }
        // Diamonds
        else {
            card += "Diamonds ";
        }

        return card;
    }

    function checkGameResults() {
        const player = calculateScore(cardValuesToDealer);
        const dealer = calculateScore(cardValuesToPlayer);
        if (player > dealer || dealer > 21) {
            //display "you win!"
            setWhoWon("You Win!");
        }
        // else if (player < dealer) {
        else {
            //display "you lose :("
            setWhoWon("You Lose :(");
        }
        // else {
        //     //display "it's a tie"
        //     // I think dealer wins if its a tie
        //     setWhoWon("It's a Tie!");
        // }
    }

    function checkBust() {
        const player = calculateScore(cardValuesToDealer);
        const dealer = calculateScore(cardValuesToPlayer);
        if (player > 21) {
            setWhoWon("You Lose :(");
        }
        if (dealer > 21) {
            setWhoWon("You Win!");
        }
    }

    function calculateScore(person) {
        let score = 0;
        for (let i = 0; i < person.length; i++) {
            score += person[i];
        }
        return score;
    }


    function hit() {
        if (calculateScore(cardValuesToDealer) < 17) {
            let dealerCardsAndValues = setUpCards(1);
            setCardsToDealer(cardsToDealer.concat(dealerCardsAndValues[0]));
            setCardValuesToDealer(cardValuesToDealer.concat(dealerCardsAndValues[1]));
        }

        let playerCardsAndValues = setUpCards(1);
        setCardsToPlayer(cardsToPlayer.concat(playerCardsAndValues[0]));
        setCardValuesToPlayer(cardValuesToPlayer.concat(playerCardsAndValues[1]));

        checkBust();
    }

    function stand() {
        while (calculateScore(cardValuesToDealer) < 17) {
            let dealerCardsAndValues = setUpCards(1);
            setCardsToDealer(cardsToDealer.concat(dealerCardsAndValues[0]));
            setCardValuesToDealer(cardValuesToDealer.concat(dealerCardsAndValues[1]));
        }

        checkGameResults();
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
    // function Button() {
    //     return <AwesomeButton type="primary"> Button</AwesomeButton>;
    // }
    return (
        <div>
            <GameMessage text={"Dealer's cards: "} />
            <GameMessage text={cardsToDealer} />
            <br />
            <GameMessage text={"Player's cards: "} />
            <GameMessage text={cardsToPlayer} />
            <br />
            {/* <TextBox label="" change={testIng} /> */}
            {/* <AwesomeButton type="primary" onPress={requestStreetRoute}> Manual Street Input Button </AwesomeButton> */}
            <AwesomeButton type="primary" size="large" onPress={play}>Play!</AwesomeButton>
            <br />
            <AwesomeButton
                type="primary"
                size="large"
                onPress={hit}>Hit</AwesomeButton>
            <br />
            <AwesomeButton type="primary" size="large" onPress={stand}>Stand</AwesomeButton>
            <br />
            <GameMessage text={whoWon} />
        </div>
    )
}


export default BlackJack
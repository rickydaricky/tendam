import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { AwesomeButton } from "react-awesome-button";
// import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";
import "react-awesome-button/dist/styles.css";
// import TextBox from "./TextBox";
import GameMessage from "./GameMessage";


let cardsToDealer = [];
let cardValuesToDealer = [];
function BlackJack(props) {
    // const cards = Array.from(Array(52).keys());
    const [deck, setDeck] = useState([]);
    // const [playerScore, setPlayerScore] = useState(0);
    // const [dealerScore, setDealerScore] = useState(0);
    const [whoWon, setWhoWon] = useState("");

    const [dealerScore, setDealerScore] = useState(0);

    // const [cardsToDealer, setCardsToDealer] = useState([]);
    const [cardsToPlayer, setCardsToPlayer] = useState([]);
    // const [cardValuesToDealer, setCardValuesToDealer] = useState([]);
    const [cardValuesToPlayer, setCardValuesToPlayer] = useState([]);

    const [bets, setBets] = useState(0);

    useEffect(() => {
        if (deck.length === 52) {
            setUpBoard();
        }
    }, [deck])

    function play() {
        setDeck(Array.from(Array(52).keys()));
        setWhoWon("");
    }

    function setUpBoard() {
        let dealerCardsAndValues = setUpCards(2);
        let playerCardsAndValues = setUpCards(2);
        // setCardsToDealer(dealerCardsAndValues[0]);
        cardsToDealer = dealerCardsAndValues[0];
        setCardsToPlayer(playerCardsAndValues[0]);
        cardValuesToDealer = dealerCardsAndValues[1];
        // setCardValuesToDealer(dealerCardsAndValues[1]);
        setCardValuesToPlayer(playerCardsAndValues[1]);
    }

    function setUpCards(numCards) {
        let cardsToAdd = [];
        let cardsToPerson = [];
        let cardsValuesToPerson = [];

        for (let i = 0; i < numCards; i++) {
            let randIndex = Math.floor(Math.random() * deck.length);
            let chosenCardKey = deck.splice(randIndex, 1);
            setDeck(deck);
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
        if (player > 21 || (dealer < 22 && dealer >= player)) {
            setWhoWon("You Lose :(");
        } else {
            //display "you win!"
            setWhoWon("You Win!");
        }
    }

    useEffect(() => {
        checkBust();
    }, [cardValuesToPlayer])

    function checkBust() {
        const player = calculateScore(cardValuesToPlayer);
        if (player > 21) {
            setWhoWon("You Lose :(");
        }
    }

    function calculateScore(cards) {
        let score = 0;
        for (let i = 0; i < cards.length; i++) {
            if (cards[i] === 11 || cards[i] === 12 || cards[i] === 13) {
                score += 10;
            } else {
                score += cards[i];
            }
        }
        return score;
    }


    function hit() {
        let playerCardsAndValues = setUpCards(1);
        setCardsToPlayer(cardsToPlayer.concat(playerCardsAndValues[0]));
        setCardValuesToPlayer(cardValuesToPlayer.concat(playerCardsAndValues[1]));

        // checkBust();
    }

    // useEffect(() => {
    //     if (dealerScore < 17) {
    //         let dealerCardsAndValues = setUpCards(1);
    //         setCardsToDealer(cardsToDealer.concat(dealerCardsAndValues[0]));
    //         let newCards = cardValuesToDealer.concat(dealerCardsAndValues[1])
    //         setCardValuesToDealer(newCards);
    //         setDealerScore(calculateScore(newCards));
    //     } else {
    //         checkGameResults();
    //     }
    // }, [dealerScore])

    // useEffect(() => {
    //     if (playerStand) {
    //         let dealerScore = calculateScore(cardValuesToDealer);
    //     }
    // }, [playerStand])

    function stand() {
        // setPlayerStand(true);
        // setDealerScore(calculateScore(cardValuesToDealer));
        while (calculateScore(cardValuesToDealer) < 17) {
            let dealerCardsAndValues = setUpCards(1);
            cardsToDealer = cardsToDealer.concat(dealerCardsAndValues[0]);
            cardValuesToDealer = cardValuesToDealer.concat(dealerCardsAndValues[1]);
            // setCardsToDealer(cardsToDealer.concat(dealerCardsAndValues[0]));
            // setCardValuesToDealer(cardValuesToDealer.concat(dealerCardsAndValues[1]));
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
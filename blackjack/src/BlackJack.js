import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { AwesomeButton } from "react-awesome-button";
// import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";
import "react-awesome-button/dist/styles.css";
// import TextBox from "./TextBox";
import GameMessage from "./GameMessage";
// import { useAuth } from "../../context/AuthContext";
// import { useDatabase } from "../../context/DatabaseContext";


let cardsOfDealer = [];
let cardValuesOfDealer = [];
function BlackJack(props) {
    // const { currentUser } = useAuth();
    // const { getEntry, userDatabase } = useDatabase();

    // const [profileInfo, setProfileInfo] = useState({
    //     bio: "", name: "", age: "", matches: []});
    const sumOfValues = 364;

    const [deck, setDeck] = useState([]);

    const [whoWon, setWhoWon] = useState("");

    const [cardsOfPlayer, setCardsOfPlayer] = useState([]);
    const [cardValuesOfPlayer, setCardValuesOfPlayer] = useState([]);

    const [riskPropensityScore, setRiskPropensityScore] = useState(0);

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
        // setCardsOfDealer(dealerCardsAndValues[0]);
        cardsOfDealer = dealerCardsAndValues[0];
        setCardsOfPlayer(playerCardsAndValues[0]);
        cardValuesOfDealer = dealerCardsAndValues[1];
        // setCardValuesOfDealer(dealerCardsAndValues[1]);
        setCardValuesOfPlayer(playerCardsAndValues[1]);
    }

    function setUpCards(numCards) {
        let cardsToAdd = [];
        let cardsOfPerson = [];
        let cardsValuesOfPerson = [];

        for (let i = 0; i < numCards; i++) {
            let randIndex = Math.floor(Math.random() * deck.length);
            let chosenCardKey = deck.splice(randIndex, 1);
            setDeck(deck);
            let chosenCard = cardFromKey(chosenCardKey);

            cardsValuesOfPerson.push(chosenCardKey % 13 + 1);
            cardsOfPerson.push(chosenCard);
        }

        cardsToAdd.push(cardsOfPerson);
        cardsToAdd.push(cardsValuesOfPerson);

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

    /**
    * Makes an axios request for player's risk propensity score.
    */
    // const requestRiskPropensityScore = () => {
    //     const toSend = {
    //         playerID: playerID
    //     };

    //     let config = {
    //         headers: {
    //             "Content-Type": "application/json",
    //             'Access-Control-Allow-Origin': '*',
    //         }
    //     };

    //     axios.post(
    //         'http://localhost:4567/ways',
    //         toSend,
    //         config
    //     ).then(response => {
    //         setRiskPropensityScore(response.data);
    //     })

    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

    useEffect(() => {
        checkBust();
    }, [cardValuesOfPlayer])

    function checkBust() {
        const player = calculateScore(cardValuesOfPlayer);
        if (player > 21) {
            // update database for user's risk propensity score with final risk propensity score
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
        setCardsOfPlayer(cardsOfPlayer.concat(playerCardsAndValues[0]));
        setCardValuesOfPlayer(cardValuesOfPlayer.concat(playerCardsAndValues[1]));
        // update riskpropensityScore here
        // setRiskPropensityScore(calculateRisk());
    }

    function calculateRisk() {
        let remainingSum = sumOfValues;
        const maxBeforeBust = 21 - calculateScore(cardValuesOfPlayer);
        let count = 0;
        for (let i = 0; i < deck.length; i++) {
            if (deck[i] <= maxBeforeBust) {
                count++;
            }
        }
        return count / deck.length;
    }

    // useEffect(() => {
    //     if (dealerScore < 17) {
    //         let dealerCardsAndValues = setUpCards(1);
    //         setCardsOfDealer(cardsOfDealer.concat(dealerCardsAndValues[0]));
    //         let newCards = cardValuesOfDealer.concat(dealerCardsAndValues[1])
    //         setCardValuesOfDealer(newCards);
    //         setDealerScore(calculateScore(newCards));
    //     } else {
    //         checkGameResults();
    //     }
    // }, [dealerScore])

    // useEffect(() => {
    //     if (playerStand) {
    //         let dealerScore = calculateScore(cardValuesOfDealer);
    //     }
    // }, [playerStand])

    function checkGameResults() {
        const dealer = calculateScore(cardValuesOfDealer);
        const player = calculateScore(cardValuesOfPlayer);
        if (player > 21 || (dealer < 22 && dealer >= player)) {
            // update database for user's risk propensity score with final risk propensity score
            setWhoWon("You Lose :(");
        } else {
            //display "you win!"
            // update database for user's risk propensity score with final risk propensity score
            setWhoWon("You Win!");
        }
    }

    function stand() {
        // setPlayerStand(true);
        // setDealerScore(calculateScore(cardValuesOfDealer));
        while (calculateScore(cardValuesOfDealer) < 17) {
            let dealerCardsAndValues = setUpCards(1);
            cardsOfDealer = cardsOfDealer.concat(dealerCardsAndValues[0]);
            cardValuesOfDealer = cardValuesOfDealer.concat(dealerCardsAndValues[1]);
            // setCardsOfDealer(cardsOfDealer.concat(dealerCardsAndValues[0]));
            // setCardValuesOfDealer(cardValuesOfDealer.concat(dealerCardsAndValues[1]));
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
            <GameMessage text={cardsOfDealer} />
            <br />
            <GameMessage text={"Player's cards: "} />
            <GameMessage text={cardsOfPlayer} />
            <br />
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
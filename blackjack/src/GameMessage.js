import './App.css';

function GameMessage(props) {
    if (props.text !== "") {
        // We only want an error box to be rendered if there is an error to display!
        return(
            <div className={"gameMessage"}>{props.text}</div>
        );
    } else {
        return null;
    }
}

export default GameMessage;
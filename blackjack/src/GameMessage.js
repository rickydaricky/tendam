import './App.css';

function GameMessage(props) {
    if (props.text !== "") {
        // We only want game message to be rendered if there is a message to display!
        return(
            <div className={"gameMessage"}>{props.text}</div>
        );
    } else {
        return null;
    }
}

export default GameMessage;
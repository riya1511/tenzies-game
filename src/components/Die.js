import React from "react";
// import './styles.css';

function Die(props){
    return(
        <div className={props.isHeld ? "die-held" : "die-notHeld"} onClick={props.holdDice}>
            <h2>{props.value}</h2>
        </div>
    )
}

export default Die
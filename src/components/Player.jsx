import React, { useState } from "react";

function Player(props){

    const [name, setname]=useState(props.initname);
    const [isediting, setisediting]=useState(false);

    function clickhandler(){
        setisediting((editing)=>!editing);
        if(isediting){
            props.onnamechange(props.symbol, name);
        }
    }
    function namehandler(event){
        setname(event.target.value);
    }
    var temphtml=<span className="player-name">{name}</span>;
    if(isediting){
        temphtml=<input type="text" value={name} onChange={namehandler}/>
    }

    return (
        <li className={props.isactive}>
            <span className="player">
                {temphtml}
                <span className="player-symbol">{props.symbol}</span>
            </span>
            <button onClick={clickhandler}>{isediting?"Save":"Edit"}</button>
        </li>
    );
}

export default Player;
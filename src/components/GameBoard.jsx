import React from "react";

function GameBoard({onselectsquare, board}){
   
    return(
        <ol id="game-board">
            {board.map((row, rowindex)=>{
                return (
                    <li key={rowindex}>
                        <ol>
                            {row.map((col, colindex)=>{
                                return (
                                    <li key={colindex}><button onClick={()=>onselectsquare(rowindex, colindex)} disabled={col!==null}>{col}</button></li>
                                );
                            })}
                        </ol>
                    </li>
                );
            })}
        </ol>
    );
}

export default GameBoard;
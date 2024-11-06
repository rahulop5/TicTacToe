import React, {useState} from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Gameover from "./components/Gameover";
import {WINNING_COMBINATIONS} from "./winning-combinations";

const initGameboard=[
  [null, null, null],
  [null, null, null],
  [null, null, null]
];
const PLAYERS={
  X: "Player 1",
  O: "Player 2",
};


function deriveactiveactiveplayer(turns){
  var tempplayer="X";
  if(turns.length>0&&turns[0].player==="X"){
    tempplayer="O"; 
  }
  return tempplayer;
}
function derivegameboard(gameturns){
  var gameboard=[...initGameboard.map(array=>[...array])];
  for(const turn of gameturns){
    const {square, player}=turn;
    const {row, col}=square;
    gameboard[row][col]=player;
  }
  return gameboard;
}
function derivewinner(gameboard, players){
  var winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstone=gameboard[combination[0].row][combination[0].column];
    const secondone=gameboard[combination[1].row][combination[1].column];
    const thirdone=gameboard[combination[2].row][combination[2].column];
    
    if(firstone&&firstone===secondone&&firstone===thirdone){
      winner=players[firstone];
    }
  }
  return winner;
}

function App() {
  const [players, setplayers]=useState(PLAYERS);
  const [gameturns, setgameturns]=useState([]);

  const gameboard=derivegameboard(gameturns);
  const activeplayer=deriveactiveactiveplayer(gameturns);
  var winner=derivewinner(gameboard, players);
  const isdraw=gameturns.length===9&&!winner;

  function activeplayerhandler(rowindex, colindex){
    setgameturns((prevturns)=>{
      var tempplayer=deriveactiveactiveplayer(prevturns);
      const updatedturns=[{square: {row: rowindex, col: colindex}, player: tempplayer}, ...prevturns];
      return updatedturns;
    })  
  }
  function gameoverhandler(){
    setgameturns([]);
  }  
  function handlenamechange(symbol, newname){
    setplayers(prevplayers=>{
      return {
        ...prevplayers,
        [symbol]: newname
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initname={PLAYERS.X} symbol="X" isactive={activeplayer==="X"?"active":undefined} onnamechange={handlenamechange}/>
          <Player initname={PLAYERS.O} symbol="O" isactive={activeplayer==="O"?"active":undefined} onnamechange={handlenamechange}/>
        </ol>
        {(winner||isdraw)&&<Gameover winner={winner} rematch={gameoverhandler}/>}
        <GameBoard onselectsquare={activeplayerhandler} board={gameboard}/>
      </div>
      <Log turns={gameturns}/>
    </main>
  )
}

export default App

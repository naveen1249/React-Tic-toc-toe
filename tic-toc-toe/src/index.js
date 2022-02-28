import React from 'react';
import ReactDOM from 'react-dom';


const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

class Square extends React.Component {
  
  render() {
    const {value,onClick} = this.props;
    return (
      <div
        className="square"
        style={squareStyle}
        onClick={onClick}
        >{value}
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props){
    super(props)
  this.state ={
    squares:Array(9).fill(null),
    isX:true
  }
}

handleClick = (i)=>{
  console.log(i)
  const {squares,isX} = this.state;
  if (calculateWinner(squares) || squares[i]) {
    return
  }
  squares[i] = isX ? 'X' : 'O'
  this.setState({squares: squares,isX:!isX})
  console.log(this.state.squares);
}
handleRestart = () =>{
  this.setState({
    squares:Array(9).fill(null),
    isX:true
  })
}
  
  render() {
    const {squares,isX} = this.state;
    const winner = calculateWinner(squares)
    return (
      <div style={containerStyle} className="gameBoard">
        <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{isX ? 'X':'O'}</span></div>
        <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner || 'none'}</span></div>
        <button style={buttonStyle} onClick={()=>this.handleRestart()}>Reset</button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
           <Square value={squares[0]} onClick={()=>this.handleClick(0)}/>
           <Square value={squares[1]} onClick={()=>this.handleClick(1)}/>
           <Square value={squares[2]} onClick={()=>this.handleClick(2)}/>
          </div>
          <div className="board-row" style={rowStyle}>
          <Square value={squares[3]} onClick={()=>this.handleClick(3)}/>
          <Square value={squares[4]} onClick={()=>this.handleClick(4)}/>
          <Square value={squares[5]} onClick={()=>this.handleClick(5)}/>
          </div>
          <div className="board-row" style={rowStyle}>
          <Square value={squares[6]} onClick={()=>this.handleClick(6)}/>
          <Square value={squares[7]} onClick={()=>this.handleClick(7)}/>
          <Square value={squares[8]} onClick={()=>this.handleClick(8)}/>
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);




function calculateWinner(squares) {
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  
  for (let i = 0; i < winningPatterns.length; i++) {
    const [a, b, c] = winningPatterns[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

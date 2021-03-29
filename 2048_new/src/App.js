import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import cloneDeep from 'lodash.clonedeep'
import { useEvent} from './utils';
import Block from './components/block'
import GameOver from './components/gameOver';

function App() {

  const UP_ARROW = 38
  const DOWN_ARROW = 40
  const LEFT_ARROW = 37
  const RIGHT_ARROW = 39

  const [data, setData] = useState([
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ]);

  const [dataVieja, setDataVieja] = useState([]);

  const [sendRequest, setSendRequest] = useState(false)

//Initialize
const initialize = () => {
  let newGrid = cloneDeep(data)
  console.log(newGrid)
  
  addNumber(newGrid)
  //console.log(newGrid)

  addNumber(newGrid)
  setDataVieja(data)
  
  setData(newGrid)
  
}


//console.log(dataVieja)
//console.log(data)

//Add number
const addNumber = (Grid) => {
  let added = false
  let gridFull = false
  let attemps = 0
  while(!added){
    if(gridFull){
      break
    }
    let rand1 = Math.floor(Math.random() * 4)
    let rand2 = Math.floor(Math.random() * 4)
    attemps++
    if(Grid[rand1][rand2] === 0){
      Grid[rand1][rand2] = Math.random() >= 0.5 ? 2 : 4
      added = true
    }
  }  
}

const swipeLeft = (dummy) => {
  console.log("swipe left");
  let oldGrid = data;
  let newArray = cloneDeep(data);

  for (let i = 0; i < 4; i++) {
    let b = newArray[i];
    let slow = 0;
    let fast = 1;
    while (slow < 4) {
      if (fast === 4) {
        fast = slow + 1;
        slow++;
        continue;
      }
      if (b[slow] === 0 && b[fast] === 0) {
        fast++;
      } else if (b[slow] === 0 && b[fast] !== 0) {
        b[slow] = b[fast];
        b[fast] = 0;
        fast++;
      } else if (b[slow] !== 0 && b[fast] === 0) {
        fast++;
      } else if (b[slow] !== 0 && b[fast] !== 0) {
        if (b[slow] === b[fast]) {
          b[slow] = b[slow] + b[fast];
          b[fast] = 0;
          fast = slow + 1;
          slow++;
        } else {
          slow++;
          fast = slow + 1;
        }
      }
    }
  }
  if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
    addNumber(newArray);
  }
  if (dummy) {
    return newArray;
  } else {
    setData(newArray);
  }
};

const swipeRight = (dummy) => {
  console.log("swipe right");
  let oldData = data;
  let newArray = cloneDeep(data);

  for (let i = 3; i >= 0; i--) {
    let b = newArray[i];
    let slow = b.length - 1;
    let fast = slow - 1;
    while (slow > 0) {
      if (fast === -1) {
        fast = slow - 1;
        slow--;
        continue;
      }
      if (b[slow] === 0 && b[fast] === 0) {
        fast--;
      } else if (b[slow] === 0 && b[fast] !== 0) {
        b[slow] = b[fast];
        b[fast] = 0;
        fast--;
      } else if (b[slow] !== 0 && b[fast] === 0) {
        fast--;
      } else if (b[slow] !== 0 && b[fast] !== 0) {
        if (b[slow] === b[fast]) {
          b[slow] = b[slow] + b[fast];
          b[fast] = 0;
          fast = slow - 1;
          slow--;
        } else {
          slow--;
          fast = slow - 1;
        }
      }
    }
  }
  if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
    addNumber(newArray);
  }
  if (dummy) {
    return newArray;
  } else {
    setData(newArray);
  }
};

const swipeDown = (dummy) => {
  console.log("swipe down");
  let b = cloneDeep(data);
  let oldData = JSON.parse(JSON.stringify(data));
  for (let i = 3; i >= 0; i--) {
    let slow = b.length - 1;
    let fast = slow - 1;
    while (slow > 0) {
      if (fast === -1) {
        fast = slow - 1;
        slow--;
        continue;
      }
      if (b[slow][i] === 0 && b[fast][i] === 0) {
        fast--;
      } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
        b[slow][i] = b[fast][i];
        b[fast][i] = 0;
        fast--;
      } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
        fast--;
      } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
        if (b[slow][i] === b[fast][i]) {
          b[slow][i] = b[slow][i] + b[fast][i];
          b[fast][i] = 0;
          fast = slow - 1;
          slow--;
        } else {
          slow--;
          fast = slow - 1;
        }
      }
    }
  }
  if (JSON.stringify(b) !== JSON.stringify(oldData)) {
    addNumber(b);
  }
  if (dummy) {
    return b;
  } else {
    setDataVieja(data) 
    setData(b)
  }
};

//console.log(dataVieja)


const swipeUp = (dummy) => {
    console.log("swipe up");
    let b = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < 4; i++) {
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(b)) {
      addNumber(b);
    }
    if (dummy) {
      return b;
    } else {
      setData(b);
    }
  };


//HandleKeyDown

const handleKeyDown = (event) => {
  switch(event.keyCode) {
    case UP_ARROW:
      swipeUp()
      break
    case DOWN_ARROW:
      swipeDown()
      break
    case LEFT_ARROW:
      swipeLeft()
      break
    case RIGHT_ARROW:
      swipeRight()
      break
  }
}

//Reiniciar 
const reiniciar = () => {
  const emptyArray = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ]

  addNumber(emptyArray)
  addNumber(emptyArray)
  setData(emptyArray)
}


useEffect(() => {

  initialize()
}, 
[])

useEvent('keydown', handleKeyDown)

return(
  <div className='div-main'>
    <GameOver tabla = {data}/>
    <button className= 'button-new' onClick={() => reiniciar()}>Reiniciar</button>
    <div className= 'fondo'>     
      {data.map((row, oneIndex) => (
          <div style= {{ display: "flex" }} key = {oneIndex}>
            {row.map((digit, index) => (
              <Block num={digit} key={index}/>
            ))}
          </div>
        ))}
    </div>
  </div>
  )
}






export default App;

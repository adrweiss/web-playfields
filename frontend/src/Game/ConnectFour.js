import React, { useState } from 'react'
import './ConnectFour.css'

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

function ConnectFour() {
  const [status, setStatus] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [availableMoves, setAvailableMoves] = useState([0, 1, 2, 3, 4, 5, 6])
  const [player, setPlayer] = useState(true)
  const [messageMove, setMessageMove] = useState("");
  const [timerId, setTimerId] = useState();
  
  let playerStatus;
  let winCounter;
  var i;

  function removeMessage() {
    setMessageMove("")
  }

  const handleResetGame = () => {
    setStatus([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    setAvailableMoves([0, 1, 2, 3, 4, 5, 6])
    setPlayer(true)
  }

  const handleChangeCellState = (id) => {
    removeMessage()
    clearTimeout(timerId)

    if (!availableMoves.includes(id)) {
      setMessageMove("No valid move!");
      setTimerId(setTimeout(removeMessage, 10000));
      return
    }

    checkWin(id)

    if (player) {
      playerStatus = 1
      setPlayer(false)
    } else {
      playerStatus = 2
      setPlayer(true)
    }

    setStatus(
      status.map((status, index) => {
        return (index === id ? playerStatus : status)
      })
    )

    setAvailableMoves(
      availableMoves.map((avl, index) => {
        return (avl === id ? (id + 7) : avl)
      })
    )
  }

  function checkWin(id) {

    //console.log(status[id - 7])
    return checkVertical(id)
  }

  function checkVertical(id) {
    if ((id - 3 * 7) < 0 ){
      console.log("No win!")
      return 
    }    
    for (i = 0; i < 4 ; i++) {
      if (winCounter)
      console.log(id - i * 7)
      //console.log(status[i]);
    }      
  }

  return (
    <div className="connect__four__box">
      <div>
        <div>
          {messageMove && (
            <div className="response">
              {messageMove}
            </div>
          )}

          <table border="2">
            <tbody>
              <tr>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[41] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(41)} />)}
                      {status[41] === 1 && (<ClearIcon />)}
                      {status[41] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[40] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(40)} />)}
                      {status[40] === 1 && (<ClearIcon />)}
                      {status[40] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[39] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(39)} />)}
                      {status[39] === 1 && (<ClearIcon />)}
                      {status[39] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[38] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(38)} />)}
                      {status[38] === 1 && (<ClearIcon />)}
                      {status[38] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[37] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(37)} />)}
                      {status[37] === 1 && (<ClearIcon />)}
                      {status[37] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[36] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(36)} />)}
                      {status[36] === 1 && (<ClearIcon />)}
                      {status[36] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[35] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(35)} />)}
                      {status[35] === 1 && (<ClearIcon />)}
                      {status[35] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[34] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(34)} />)}
                      {status[34] === 1 && (<ClearIcon />)}
                      {status[34] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[33] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(33)} />)}
                      {status[33] === 1 && (<ClearIcon />)}
                      {status[33] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[32] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(32)} />)}
                      {status[32] === 1 && (<ClearIcon />)}
                      {status[32] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[31] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(31)} />)}
                      {status[31] === 1 && (<ClearIcon />)}
                      {status[31] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[30] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(30)} />)}
                      {status[30] === 1 && (<ClearIcon />)}
                      {status[30] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[29] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(29)} />)}
                      {status[29] === 1 && (<ClearIcon />)}
                      {status[29] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[28] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(28)} />)}
                      {status[28] === 1 && (<ClearIcon />)}
                      {status[28] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[27] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(27)} />)}
                      {status[27] === 1 && (<ClearIcon />)}
                      {status[27] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[26] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(26)} />)}
                      {status[26] === 1 && (<ClearIcon />)}
                      {status[26] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[25] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(25)} />)}
                      {status[25] === 1 && (<ClearIcon />)}
                      {status[25] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[24] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(24)} />)}
                      {status[24] === 1 && (<ClearIcon />)}
                      {status[24] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[23] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(23)} />)}
                      {status[23] === 1 && (<ClearIcon />)}
                      {status[23] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[22] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(22)} />)}
                      {status[22] === 1 && (<ClearIcon />)}
                      {status[22] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[21] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(21)} />)}
                      {status[21] === 1 && (<ClearIcon />)}
                      {status[21] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[20] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(20)} />)}
                      {status[20] === 1 && (<ClearIcon />)}
                      {status[20] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[19] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(19)} />)}
                      {status[19] === 1 && (<ClearIcon />)}
                      {status[19] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[18] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(18)} />)}
                      {status[18] === 1 && (<ClearIcon />)}
                      {status[18] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[17] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(17)} />)}
                      {status[17] === 1 && (<ClearIcon />)}
                      {status[17] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[16] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(16)} />)}
                      {status[16] === 1 && (<ClearIcon />)}
                      {status[16] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[15] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(15)} />)}
                      {status[15] === 1 && (<ClearIcon />)}
                      {status[15] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[14] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(14)} />)}
                      {status[14] === 1 && (<ClearIcon />)}
                      {status[14] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[13] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(13)} />)}
                      {status[13] === 1 && (<ClearIcon />)}
                      {status[13] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[12] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(12)} />)}
                      {status[12] === 1 && (<ClearIcon />)}
                      {status[12] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[11] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(11)} />)}
                      {status[11] === 1 && (<ClearIcon />)}
                      {status[11] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[10] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(10)} />)}
                      {status[10] === 1 && (<ClearIcon />)}
                      {status[10] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[9] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(9)} />)}
                      {status[9] === 1 && (<ClearIcon />)}
                      {status[9] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[8] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(8)} />)}
                      {status[8] === 1 && (<ClearIcon />)}
                      {status[8] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[7] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(7)} />)}
                      {status[7] === 1 && (<ClearIcon />)}
                      {status[7] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[6] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(6)} />)}
                      {status[6] === 1 && (<ClearIcon />)}
                      {status[6] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[5] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(5)} />)}
                      {status[5] === 1 && (<ClearIcon />)}
                      {status[5] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[4] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(4)} />)}
                      {status[4] === 1 && (<ClearIcon />)}
                      {status[4] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[3] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(3)} />)}
                      {status[3] === 1 && (<ClearIcon />)}
                      {status[3] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[2] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(2)} />)}
                      {status[2] === 1 && (<ClearIcon />)}
                      {status[2] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[1] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(1)} />)}
                      {status[1] === 1 && (<ClearIcon />)}
                      {status[1] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="connect__four__cell">
                    <div>
                      {status[0] === 0 && (<IconButton className="connect__four__iconbutton__style" onClick={(event) => handleChangeCellState(0)} />)}
                      {status[0] === 1 && (<ClearIcon />)}
                      {status[0] === 2 && (<RadioButtonUncheckedIcon />)}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="connect__four__Reset__Button">
          <Button className="connect__four__Reset__Button" variant="contained" color="primary" disableElevation onClick={handleResetGame}>
            Reset Game
          </Button>
        </div>
      </div>
    </div >
  )
}

export default ConnectFour

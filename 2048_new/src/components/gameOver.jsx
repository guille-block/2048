import { render } from '@testing-library/react'
import React from 'react'
import cloneDeep from 'lodash.clonedeep'


const GameOver = ({tabla}) => {
      let dataIterable = {...tabla}
      //let newArray = cloneDeep({tabla});
      let finalJuego = 0

      //const mapArray = Object.values()
      
      
      //console.log(dataIterable)
      //console.log(newArray)

      let suma = 0
      
      
      for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            //console.log(dataIterable[i][j])
            let num =  dataIterable[i][j] !== 0 ? 1 : 0
            suma = suma + num 
            }
        }
        console.log(suma)
      if(suma === 16) {
          for(let i = 0; i < 4; i++) {
            for(let j = 0; j < 3; j++) { 
                const resultado1 = (dataIterable[i][j] !== dataIterable[i][j+1]) ? 0 : 1
                const resultado2 = (dataIterable[j][i] !== dataIterable[j+1][i]) ? 0 : 1
                const resultado = resultado1 + resultado2
                finalJuego += resultado
                }
            }
         if(finalJuego === 0) {
            return (<h1>Perdiste! Perdiste! No hay nadie peor que vos!</h1>)
         }
        }
        return (<h1>Dale que podes ganar!</h1>)

    
}


export default GameOver


/*     let dataIterable = {tabla}
      
} */
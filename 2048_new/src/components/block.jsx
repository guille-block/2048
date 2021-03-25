import React from 'react'
import { getColors } from '../utils'

const Block = ({ num }) => {
    const { blockStyle } = style
  
    return (
      <div
        style={{
          ...blockStyle,
          background: getColors(num),
          color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
        }}
      >
        {num !==0 ? num : ""}
      </div>
    );
  };
  
   
  const style = {
    blockStyle: {
      height: 80,
      width: 80,
      background: 'lightgrey',
      margin: 3,
      display: 'flex',
      justifyContent: 'center',
      alignItems: "center",
      fontSize: 45,
      fontWight: "800",
      color: "white"
    }
  }


export default Block
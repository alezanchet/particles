import React,{useState} from 'react';

import P5Wrapper from 'react-p5-wrapper';

import sketch from './sketch.js'

//import { Container } from './styles';

const Particles= () => {
  const [color, setColor] = useState([Math.random()*255, Math.random()*255, Math.random()*255])

  function randomColor(){
    setColor([Math.random()*255, Math.random()*255, Math.random()*255])
  }

  //color={color}

  return (
    <div>
      <P5Wrapper sketch={sketch} ></P5Wrapper>
    </div>
  )
}

export default Particles;
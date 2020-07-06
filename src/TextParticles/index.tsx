import React from 'react';

import Column1 from './Column1/index.js'
import Column2 from './Column2/index.js'
import Column3 from './Column3/index.js'

import { Container } from './styles';

const TextParticles: React.FC = () => {
  return (
    <Container>
      <Column1/>
      <Column2/>
      <Column3/>
    </Container>
  )
}

export default TextParticles;
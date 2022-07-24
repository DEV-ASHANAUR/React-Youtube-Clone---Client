import React from 'react'
import styled from 'styled-components'
import Card from '../components/Card';

const Container = styled.div`
  display: flex;
  /* justify-content: space-between; */
  justify-content: center;
  gap:10px;
  flex-wrap: wrap;
`;
const Home = () => {
  return (
    <Container>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </Container>
  )
}

export default Home
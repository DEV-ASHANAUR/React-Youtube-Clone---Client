import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
const Container = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #000000a7;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styled.div`
    max-width: 600px;
    width: 100%;
    height: auto;
    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};
    padding:20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
`
const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`
const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
    z-index: 999;
`
const Title = styled.h1`
    text-align: center;
    font-size: 1.2rem;
`
const Button = styled.button`
    padding: 0.4rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 3px;
`
const SearchModal = ({setSopen}) => {
  const [q, setQ] = useState();
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?q=${q}`);
    setSopen(false);
  }
  return (
    <Container>
        <Wrapper>
            <Close onClick={() => setSopen(false)}>X</Close>
            <Title>Search Here</Title>
            <Input placeholder='Search Here' onChange={(e)=>setQ(e.target.value)} />
            <Button onClick={handleSearch}>Submit</Button>
        </Wrapper>
    </Container>
  )
}

export default SearchModal
import React from 'react'
import styled from "styled-components";
import {Link} from 'react-router-dom'
import YoutubeLogo from '../img/logo.png';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import { SwitchUnstyled } from '@mui/base';

const Container = styled.div`
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.bgLighter};
    height: 56px;
`;
const Wrapper = styled.div`
    display: flex;
    align-items:center;
    justify-content: flex-end;
    height: 100%;
    padding: 0px 20px;
    position:relative;
    @media (max-width: 1041px) {
        justify-content: space-between;
    }
`;
const Toggle = styled.div`
    display: none;
    color:${({ theme }) => theme.text};
    cursor: pointer;
    @media (max-width: 1041px) {
        display: block;
        display: flex;
        align-items: center;
        gap:15px;
    }
`;
const Logo = styled.div`
    display:flex;
    align-items:center;
    gap:5px;
    font-weight:bold;
`
const Img = styled.img`
    height:25px;
`
const Search = styled.div`
    width: 40%;
    position:absolute;
    left:0px;
    right: 0px;
    margin:auto;
    display:flex;
    align-items: center;
    justify-content:space-between;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius:3px;
    @media (max-width: 767px) {
        width: 25%;
    }
    @media (max-width: 576px) {
        display: none;
    }
`;
const Input = styled.input`
    border:none;
    background-color: transparent;
    outline: none;
    color: ${({ theme }) => theme.text};
    width:80%
    
`;
const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`;


const Navbar = ({darkMode,setTogger,toggle}) => {
    
    return (
        <Container>
            <Wrapper>
                <Toggle>
                    <MenuIcon onClick={()=> setTogger(!toggle)} />
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        <Logo>
                            <Img src={YoutubeLogo} />
                            Youtube
                        </Logo>
                    </Link>
                </Toggle>
                
                <Search>
                    <Input placeholder='Search' />
                    <SearchOutlinedIcon style={{color:`${darkMode? 'white':'#000'}`,cursor:"pointer"}} />
                </Search>
                <Link to="signin" style={{textDecoration:"none"}}>
                    <Button>
                        <AccountCircleOutlinedIcon />
                        SIGN IN
                    </Button>
                </Link>
            </Wrapper>
        </Container>
    )
}

export default Navbar
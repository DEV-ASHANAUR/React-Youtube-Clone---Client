import React, { useState } from 'react'
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom'
import YoutubeLogo from '../img/logo.png';
import avater from '../img/user.png';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { VideoCallOutlined } from '@mui/icons-material';
import Upload from './Upload';
import SearchModal from './SearchModal';
// import { SwitchUnstyled } from '@mui/base';

const Container = styled.div`
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.bgLighter};
    height: 56px;
    z-index: 10;
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

const User = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
`;

const Avater = styled.img`
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 50%;
    background-color: #999;
`
const Name = styled.span`
    text-transform: capitalize;
    @media (max-width: 576px) {
        display: none;
    }
`

const SearchBtn = styled.div`
    display: none;
    @media (max-width: 576px) {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        color: ${({ theme }) => theme.text};
    }
    
`

const Navbar = ({ darkMode, setTogger, toggle }) => {
    const [q, setQ] = useState();
    const [open, setOpen] = useState(false);
    const [sopen, setSopen] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    return (
        <>
            <Container>
                <Wrapper>
                    <Toggle>
                        <MenuIcon onClick={() => setTogger(!toggle)} />
                        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                            <Logo>
                                <Img src={YoutubeLogo} />
                                Youtube
                            </Logo>
                        </Link>
                    </Toggle>
                    <SearchBtn>
                        <SearchOutlinedIcon onClick={()=>setSopen(true)} />
                    </SearchBtn>
                    <Search>
                        <Input placeholder='Search' onChange={(e)=>setQ(e.target.value)} />
                        <SearchOutlinedIcon style={{ color: `${darkMode ? 'white' : '#000'}`, cursor: "pointer" }} onClick={()=>navigate(`/search?q=${q}`)} />
                    </Search>
                    {
                        currentUser ? (
                            <User>
                                <VideoCallOutlined style={{ cursor: "pointer" }} onClick={()=>setOpen(true)} />
                                <Avater src={currentUser.img ? currentUser?.img : avater} />
                                <Name>{currentUser.name}</Name>

                            </User>
                        ) : (
                            <Link to="signin" style={{ textDecoration: "none" }}>
                                <Button>
                                    <AccountCircleOutlinedIcon />
                                    SIGN IN
                                </Button>
                            </Link>
                        )
                    }

                </Wrapper>
            </Container>
            {sopen && <SearchModal setSopen={setSopen} />}
            {open && <Upload setOpen={setOpen} />}
        </>
    )
}

export default Navbar
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Conatiner = styled.div`
    width: ${(props) => props.type !== "sm" && "345px"};
    /* width: 100%; */
    margin-bottom: ${(props) => props.type !== "sm" ? "10px" : "45px"};
    cursor:pointer;
    display: ${(props) => props.type === "sm" && "flex"};
    gap: 10px;
    @media (max-width: 1313px) {
        max-width: ${(props) => props.type !== "sm" && "345px"};
        width: 100%;
    }
`;
const Image = styled.img`
    width: 100%;
    height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
    object-fit: cover;
    background-color: #999;
    flex: 1;
`;
const Details = styled.div`
    display: flex;
    margin-top: ${(props) => props.type !== "sm" && "16px"};
    gap: 12px;
    flex: 1;
`;
const ChannelImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
    display: ${(props) => props.type === "sm" && "none"};
`;
const Texts = styled.div`
    
`;
const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
    margin: 9px 0px;
`;
const Info = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
`;


const Card = ({ type }) => {
    return (
        <Link to="/video/dfgbvds" style={{ textDecoration: "none" }}>
            <Conatiner type={type}>
                <Image type={type} src="https://legiit-service.s3.amazonaws.com/e6b231fb2b3929775603d68aba761207/6f2c8ec05be61314ccee5bce008da04c.jpg" />
                <Details type={type}>
                    <ChannelImage type={type} src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />
                    <Texts>
                        <Title>Test Video</Title>
                        <ChannelName>Nice Weather</ChannelName>
                        <Info>660,908 views • 1 day ago </Info>
                    </Texts>
                </Details>
            </Conatiner>
        </Link>
    )
}

export default Card
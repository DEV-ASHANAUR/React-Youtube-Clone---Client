import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {format} from "timeago.js";
import axios from 'axios';
import avater from '../img/user.png';

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
    text-transform: capitalize;
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
    text-transform: capitalize;
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
    margin: 9px 0px;
`;
const Info = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
`;


const Card = ({ type,video }) => {
  const BaseUrl = 'http://localhost:8000/api';
  const [channel,setChannel] = useState({});

  useEffect(()=>{
    const fetchVideos = async () =>{
      try {
        const res = await axios.get(`${BaseUrl}/users/find/${video.userId}`);
        // console.log(res.data);
        setChannel(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchVideos();
  },[video.userId])
    return (
        <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
            <Conatiner type={type}>
                <Image type={type} src={video.imgUrl} />
                <Details type={type}>
                    <ChannelImage type={type} src={channel.img?channel.img:avater} />
                    <Texts>
                        <Title>{video.title}</Title>
                        <ChannelName>{channel.name}</ChannelName>
                        <Info>{video.views} views • {format(video.createdAt)} </Info>
                    </Texts>
                </Details>
            </Conatiner>
        </Link>
    )
}

export default Card
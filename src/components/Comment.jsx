import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import avater from '../img/user.png';
import axios from "axios";
import { ToastContainer } from "react-toastify";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text}
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({comment}) => {
  const BaseUrl = 'http://localhost:8000/api';
  const api = axios.create({
      baseURL: BaseUrl,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: "no-cache",
      },
      withCredentials: true,  // <=== add here
      timeout: 60000
    })

  const [channel,setChannel] = useState({});

  useEffect(()=>{
    const fetchChannel = async () => {
      try {
        const res = await api.get(`/users/find/${comment.userId}`);
        setChannel(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchChannel();
  },[]);

  return (
    <Container>
      <Avatar src={channel?.img?channel.img:avater} />
      <Details>
        <Name>
          {channel.name} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>
          {comment.desc}
        </Text>
      </Details>
    </Container>
  );
};

export default Comment;

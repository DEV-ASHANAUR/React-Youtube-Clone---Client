import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components'
import Card from '../components/Card';

const Container = styled.div`
  display: flex;
  /* justify-content: space-between; */
  justify-content: center;
  gap:10px;
  flex-wrap: wrap;
`;
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  width: 100%;
  height: 100vh;

`
const Home = ({type}) => {
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
  const [videos,setVideos] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    const fetchVideos = async () =>{
      setLoading(true);
      try {
        const res = await api.get(`/video/${type}`);
        // console.log(res.data);
        setVideos(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
    }
    fetchVideos();
  },[type])

  return (
    <Container>
      {
        loading ? (
          <Loading>Loading ...</Loading>
        ):(
          videos.length > 0 ? (
            videos?.map((video)=>(
              <Card key={video._id} video={video} />
            ))
          ):(
            <Loading>Content Not Avaiable!</Loading>
          )
        )
      }
    </Container>
  )
}

export default Home
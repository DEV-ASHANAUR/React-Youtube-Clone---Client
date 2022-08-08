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
const Home = ({type}) => {
  const BaseUrl = 'http://localhost:8000/api';
  const [videos,setVideos] = useState([]);

  useEffect(()=>{
    const fetchVideos = async () =>{
      try {
        const res = await axios.get(`${BaseUrl}/video/${type}`,{withCredentials:true});
        // console.log(res.data);
        setVideos(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchVideos();
  },[type])

  return (
    <Container>
      {
        videos.map((video)=>(
          <Card key={video._id} video={video} />
        ))
      }
    </Container>
  )
}

export default Home
import { async } from '@firebase/util'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import Card from './Card'
const Container = styled.div`
    flex: 2;
`
const Recommendation = ({tags}) => {
  const BaseUrl = 'http://localhost:8000/api';
  const [videos,setVideos] = useState([]);

  useEffect(()=>{
    const fetchVideos = async () =>{
        const res = await axios.get(`${BaseUrl}/video/tags?tags=${tags}`);

        setVideos(res.data);
    }
  },[])
  return (
    <Container>
        {videos.map((video)=>(
            <Card key={videos._id} video={video} />
        ))}
        
    </Container>
  )
}

export default Recommendation
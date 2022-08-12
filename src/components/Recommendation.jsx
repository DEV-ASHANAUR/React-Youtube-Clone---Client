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
const Recommendation = ({ tags }) => {
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
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await api.get(`/video/tags?tags=${tags}`);
      setVideos(res.data);
    }
    fetchVideos();
  }, [])
  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}

    </Container>
  )
}

export default Recommendation
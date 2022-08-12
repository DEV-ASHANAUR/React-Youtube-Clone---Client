import React,{useState} from 'react'
import styled from 'styled-components';
import avater from '../img/user.png';
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from '../components/Comments';
import {useDispatch,useSelector} from 'react-redux'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { dislike, fetchFailure, fetchSuccess, like } from '../redux/videoSlice';
import { format } from 'timeago.js';
import Recommendation from '../components/Recommendation';
import { subscription } from '../redux/userSlice';
import {toast,ToastContainer} from 'react-toastify';
import { async } from '@firebase/util';

const Container = styled.div`
    display:flex;
    gap:24px;
    @media (max-width: 767px) {
        flex-direction: column;
    }
`;
const Content = styled.div`
    flex:5;
`;
const VideoWrapper = styled.div`
    
`;
const Title = styled.h1`
    font-size: 18px;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.text};
`;
const Details = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
`;
// const Popup = styled.div`
//     max-width: 100px;
//     padding: 10px;
//     border-radius: 10px;
//     background-color: #4e4e4e;
//     position: absolute;
//     bottom: -25%;
//     left:55%;
// `
const Info = styled.span`
    color: ${({ theme }) => theme.textSoft};
`;
const Buttons = styled.div`
    display: flex;
    gap: 20px;
    color: ${({ theme }) => theme.text};
`;
const Button = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
`;
const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
`;
const ChannelInfo = styled.div`
    display: flex;
    gap: 20px;
`;
const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;
const ChannelDetail = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
    text-transform: capitalize;
    font-weight: 500;
`;
const ChannelCounter = styled.span`
    margin-top: 5px;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.textSoft};
    font-size: 12px;
`;
const Description = styled.p`
    text-transform: capitalize;
    font-size: 14px;
`;
const Subscribe = styled.span`
    background-color: #cc1a00;
    font-weight: 500;
    color: white;
    border: none;
    border-radius: 3px;
    height: max-content;
    padding: 10px 20px;
    cursor: pointer;
`;
const Subscribed = styled.span`
    background-color: #ECECEC;
    font-weight: 500;
    color: #606060;
    border: none;
    border-radius: 3px;
    height: max-content;
    padding: 10px 20px;
    cursor: pointer;
`
const VideoFrame = styled.video`
  max-height: 520px;
  width: 100%;
  object-fit: cover;
`;


const Video = () => {
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
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state)=>state.user);
    const {currentVideo} = useSelector((state)=>state.video);
    const path = useLocation().pathname.split("/")[2];

    const [channel,setChannel] = useState({});

    const handleSub = async() =>{
        if(currentUser){
            currentUser.subscribedUsers.includes(channel._id)? await api.put(`/users/unsub/${channel._id}`): await api.put(`/users/sub/${channel._id}`);
            dispatch(subscription(channel._id));
            fetchData();
        }else{
            toast.warn("Please Login for Subscribe!")
        }
    }

    useEffect(()=>{
        fetchData();
        addView();
    },[path,dispatch]);

    const addView = async() =>{
        try {
            await api.put(`/video/view/${path}`);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchData = async()=>{
        try {
            const videoRes = await axios.get(`${BaseUrl}/video/find/${path}`,{withCredentials:true});

            const channelRes = await axios.get(`${BaseUrl}/users/find/${videoRes.data.userId}`,{withCredentials:true});

            setChannel(channelRes.data);

            dispatch(fetchSuccess(videoRes.data));
        } catch (error) {
            dispatch(fetchFailure());
            console.log(error)
        }
    }

    const handleLike = async () =>{
        if(currentUser){
            await api.put(`/users/like/${currentVideo._id}`);
            dispatch(like(currentUser._id));
        }else{
            toast.warn("Please Login for Like!")
        }
    }

    const handleDisLike = async ()=>{
        if(currentUser){
            await api.put(`/users/dislike/${currentVideo._id}`);
            dispatch(dislike(currentUser._id));
        }else{
            toast.warn("Please Login for DisLike!")
        }
    }


    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <VideoFrame src={currentVideo?.videoUrl} controls />
                </VideoWrapper>
                <Title>{currentVideo?.title}</Title>
                <Details>
                    <Info>{currentVideo.views} views • {format(currentVideo.createdAt)}</Info>
                    <Buttons>
                        <Button onClick={handleLike}>
                            {currentVideo.likes?.includes(currentUser?._id)?(
                                <ThumbUpIcon />
                            ):(
                                <ThumbUpOutlinedIcon /> 
                            )}
                            
                            {currentVideo.likes?.length}
                        </Button>
                        <Button onClick={handleDisLike}>
                            {currentVideo.dislikes?.includes(currentUser?._id)?(
                                <ThumbDownIcon />
                            ):(
                                <ThumbDownOffAltOutlinedIcon />
                            )}
                             Dislike
                        </Button>
                        <Button>
                            <ReplyOutlinedIcon /> Share
                        </Button>
                        <Button>
                            <AddTaskOutlinedIcon /> Save
                        </Button>
                    </Buttons>
                </Details>
                <Hr />
                <Channel>
                    <ChannelInfo>
                        <Image src={channel.img?channel.img:avater} />
                        <ChannelDetail>
                            <ChannelName>{channel.name}</ChannelName>
                            <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
                            <Description>
                                {currentVideo.desc}
                            </Description>
                        </ChannelDetail>
                    </ChannelInfo>
                    {
                        currentUser?.subscribedUsers?.includes(channel._id)? (
                            <Subscribed onClick={handleSub}>
                                SUBSCRIBED
                            </Subscribed>
                        ):(
                            <Subscribe onClick={handleSub}>
                                SUBSCRIBE
                            </Subscribe>
                        )
                    }
                    {/* <Popup>Please Login For - like commennt and subscribe</Popup> */}
                </Channel>
                <Hr />
                <Comments videoId={currentVideo._id} />
            </Content>
            <Recommendation tags={currentVideo.tags} />
            <ToastContainer />
        </Container>
    )
}

export default Video
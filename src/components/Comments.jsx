import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import avater from '../img/user.png';
import styled from 'styled-components';
import Comment from './Comment';
import SendIcon from '@mui/icons-material/Send';
import { toast, ToastContainer } from 'react-toastify';

const Container = styled.div`

`;
const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const First = styled.div`
  color: ${({ theme }) => theme.text};
  padding-top: 20px;
  padding-left: 55px;
  text-transform: capitalize;

`

const Comments = ({ videoId }) => {
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
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [desc, setDesc] = useState("");
  

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/comment/${videoId}`);
        setComments(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchComments();
  }, [videoId]);

  const add = async () => {
    if(desc){
      try {
        const res = await api.post(`/comment`, { videoId: videoId, desc: desc });
        setComments([...comments, res.data]);
        setDesc("");
      } catch (error) {
        console.log(error)
      }
    }else{
      toast.error("Field is required!")
    }
  }

  return (
    <Container>
      {
        currentUser && <NewComment>
          <Avatar src={currentUser?.img ? currentUser.img : avater} />
          <Input placeholder="Add a comment..." onChange={(e) => setDesc(e.target.value)} value={desc} />
          <SendIcon style={{color:"red",cursor:"pointer"}} onClick={add} />
        </NewComment>
      }
      {
        comments.length > 0 ? (
          comments?.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
        ) : (
          <First>you are the first to comment this video</First>
        )
      }
      <ToastContainer />
    </Container>
  )
}

export default Comments
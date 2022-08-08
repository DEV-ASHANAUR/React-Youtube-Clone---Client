import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { loginFaild, loginStart, loginSuccess, logout } from '../redux/userSlice';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from '../.firebase';
const Conatiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;
const Title = styled.h1`
  font-size: 24px;
`;
const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;
const Links = styled.div`
  margin-left: 50px;
`;
const Link = styled.span`
  margin-left: 30px;
`;


const SignIn = () => {
  const BaseUrl = 'http://localhost:8000/api';

  const { loading, error } = useSelector((state) => state.user);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (error) {
    toast.error(error.message, {
      position: "bottom-right"
    });
    dispatch(logout());
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginStart());
      try {
        const res = await axios.post(`${BaseUrl}/auth/signin`, { email, password },{withCredentials:true});
        // console.log(res);
        dispatch(loginSuccess(res.data));
        navigate("/");
      } catch (error) {
        dispatch(loginFaild(error.response.data))
        console.log(error)
      }
    } else {
      toast.error("All Field Are Required!");
    }

  }
  //signInWithGoogle
  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider).then((result) => {
      axios.post(`${BaseUrl}/auth/google`, {
        name: result.user.displayName,
        email: result.user.email,
        img: result.user.photoURL,
      }).then((res)=>{
        dispatch(loginSuccess(res.data));
        navigate("/");
      }).catch((error)=>{
        dispatch(loginFaild(error.response.data));
      })
    }).catch((error) => {
      dispatch(loginFaild(error));
      console.log(error);
    })
  }

  const handleReg = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      dispatch(loginStart());
      try {
        const res = await axios.post(`${BaseUrl}/auth/signup`, { name, email, password });
        dispatch(loginSuccess(res.data));
        navigate("/");
      } catch (error) {
        dispatch(loginFaild(error.response.data))
        // console.log(error)
      }
    } else {
      toast.error("All Field Are Required!");
    }
  }

  return (
    <Conatiner>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to Youtube</SubTitle>
        <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleLogin} disabled={loading}>{loading ? "loging.." : "Sign in"}</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin With Google</Button>
        <Title>or</Title>
        <Input placeholder="username" onChange={(e) => setName(e.target.value)} />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleReg} disabled={loading}>{loading ? "loging.." : "Sign up"}</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
      <ToastContainer />
    </Conatiner>
  )
}

export default SignIn
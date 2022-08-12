import {useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import styled,{ThemeProvider} from "styled-components";
import {darkTheme,lightTheme} from './utils/Theme'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Video from './pages/Video';
import SignIn from './pages/SignIn';
import { useSelector } from 'react-redux';
import Search from './pages/Search';

// styled
const Container = styled.div`
  display:flex;
`;
const Main = styled.div`
  flex:5;
  background-color: ${({theme}) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 20px;
  @media (max-width: 576px) {
      padding: 22px 5px;
    }
`;

function App() {
  const {currentUser} = useSelector((state)=>state.user)
  const [darkMode,setDarkMode] = useState(true);
  const [toggle,setTogger] = useState(false);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} toggle={toggle} />
          <Main>
            <Navbar darkMode={darkMode} setTogger={setTogger} toggle={toggle} />
            <Wrapper>
              <Routes>
                <Route path='/'>
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="subscription" element={currentUser ? <Home type="sub" /> : <Navigate to="/signin" /> } />
                  <Route path="signin" element={currentUser ? <Navigate to="/" /> : <SignIn />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;

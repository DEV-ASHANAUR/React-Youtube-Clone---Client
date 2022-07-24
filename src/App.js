import {useState} from 'react';
import styled,{ThemeProvider} from "styled-components";
import {darkTheme,lightTheme} from './utils/Theme'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Video from './pages/Video';
import SignIn from './pages/SignIn';

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
`;

function App() {
  const [darkMode,setDarkMode] = useState(true);
  const [toggle,setTogger] = useState(false);
  console.log("toggle",toggle);
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
                  <Route index element={<Home/>} />
                  <Route path="signin" element={<SignIn />} />
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

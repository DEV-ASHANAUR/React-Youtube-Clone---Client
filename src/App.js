import {useState} from 'react';
import styled,{ThemeProvider} from "styled-components";
import {darkTheme,lightTheme} from './utils/Theme'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import Home from './pages/Home';

// styled
const Container = styled.div`
  display:flex;
`;
const Main = styled.div`
  flex:5;
  background-color: ${({theme}) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  const [darkMode,setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar/>
            <Wrapper>
              <Routes>
                <Route path='/'>
                  <Route index element={<Home/>} />
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

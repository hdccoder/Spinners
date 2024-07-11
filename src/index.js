import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, useNavigate, Route, Routes } from 'react-router-dom';
import Home from './Home';
import SignIn from './Components/SignIn';
import Login from './Components/Login';
import api from './api';
import SignUp from './Components/SignUp';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    //blue
    primary: {
      main: '#9ad8eb',
      light: '#bbe4f2',
      dark: '#66c4e1',
      contrastText: '#3d3d3d',
    },
    //cream
    secondary: {
      main: '#efe19f',
      light: '#f8f3dd',
      dark: '#eadb99',
    },
    //purple
    accentPurple: {
      dark: '#c999ff',
      main: '#d3adff',
      light: '#e9d6ff',
    },
    //pink
    accentPink: {
      dark: '#FE86AE',
      main: '#FEA0C0',
      light: '#FEC2D6',
      darkest: '#fd5d93'
    },
    //yellow
    accentYellow: {
      main: 'eeee73',
    },
    //very light cream
    background: {
      default: '#FFFFFF',
    },
    text: {
      primary: 'rgba(20,20,20,1)',
      secondary: 'rgba(40,40,42,0.7)',
    },
  },
  typography: {
    fontWeightLight: 200,
    fontFamily: 'Noteworthy',
    h1: {
      fontFamily: 'Noteworthy',
      fontWeight: 800,
    },
    h2: {
      fontFamily: 'Noteworthy',
      fontWeight: 780,
    },
    h3: {
      fontFamily: 'Noteworthy',
      fontWeight: 700,
    },
    h4: {
      fontFamily: 'Noteworthy',
      fontWeight: 690,
    },
    h5: {
      fontFamily: 'Noteworthy',
      fontWeight: 700,
    },
    h6: {
      fontFamily: 'Noteworthy',
      fontWeight: 600,
    },
    body1: {
      fontWeight: 550
    },
    body2: {
      fontWeight: 500
    }
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#C0C0C0',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#C0C0C0', // Silver color for dark mode background
    },
  },
  typography: {
    fontFamily: 'Noteworthy',
    // Add other typography settings as needed
  },
});

const App = () => {
  const [auth, setAuth] = useState({});
  const [darkMode, setDarkMode] = useState(() => {
    // Retrieve darkMode value from local storage
    const storedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    // Return true if darkMode is stored as true or if the user prefers dark mode, otherwise false
    return storedDarkMode !== null ? storedDarkMode : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    // Toggle darkMode state
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    // Store updated darkMode value in local storage
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  useEffect(() => {
    // Attempt to login with token on component mount
    attemptLoginWithToken(setAuth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (credentials) => {
    await api.login({ credentials, setAuth });
    navigate("/");
  };

  const logout = () => {
    api.logout(setAuth);
    navigate("/");
  };

  const attemptLoginWithToken = async (setAuth) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('/api/me', getHeaders());
        setAuth(response.data);
      } catch (ex) {
        if (ex.response.status === 401) {
          window.localStorage.removeItem('token');
        }
      }
    }
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline style={{ backgroundColor: darkMode ? '#C0C0C0' : '#FFFFFF' }} />
      <Routes>
        <Route path="/*" element={<Home user={auth} logout={logout} setUser={setAuth} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/sign-in" element={<SignIn login={login} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import store from '@/store';
import { DataProvider } from '@/providers/DataProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import '@/styles/App.css';

const App = () => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: 'Montserrat',
    },
    palette: {
      type: 'light',
      common: {
        black: '#000',
        white: '#fff',
      },
      primary: {
        light: 'rgba(72, 72, 72, 1)',
        main: 'rgba(33, 33, 33, 1)',
        dark: 'rgba(0, 0, 0, 1)',
        contrastText: '#fff',
      },
      secondary: {
        light: 'rgba(72, 72, 72, 1)',
        main: 'rgba(33, 33, 33, 1)',
        dark: 'rgba(0, 0, 0, 1)',
        contrastText: '#fff',
      },
      error: {
        light: '#e57373',
        main: '#f44336',
        dark: '#d32f2f',
        contrastText: '#fff',
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DataProvider>
          <Container maxWidth="md" component="main">
            <BrowserRouter>
              <Header />
              <Navigation />
              <Footer />
            </BrowserRouter>
          </Container>
        </DataProvider>
      </ThemeProvider>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

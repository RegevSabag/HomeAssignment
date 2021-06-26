import React, {useEffect} from 'react';
// Routers
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Components
import NavBar from './components/NavBar';
import SnackBar from './components/SnackBar';
import BrowseBeers from './pages/BrowseBeers';
import FavoritesBeers from './pages/FavoritesBeers';
//Redux
import { useSelector } from "react-redux";
//Material-UI
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { lightThemePalette, darkThemePalette } from './utils';

const lightTheme = createMuiTheme({
  palette: lightThemePalette,
  typography: {
    fontFamily: [
      //'Noto Sans JP',
      'Poppins',
      'sans-serif'
    ].join()
  }
});

const darkTheme = createMuiTheme({
  palette: darkThemePalette,
  typography: {
    fontFamily: [
      //'Noto Sans JP',
      'Poppins',
      'sans-serif'
    ].join()
  }
});


function App() {
  const themeMode = useSelector(state => state.UI.themeMode)

  useEffect(() => {
    document.body.style.backgroundColor = themeMode === 'dark'? darkThemePalette.background.main: lightThemePalette.background.main;
  }, [themeMode])
  
  return (
    <ThemeProvider theme={themeMode === 'dark'? darkTheme: lightTheme}>
      <Router>
        <NavBar/>
        <SnackBar/>
        <Switch>
          <Route exact path="/favorites" component={FavoritesBeers} />
          <Route exact path="/" component={BrowseBeers} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

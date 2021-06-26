import React from "react";
// Assets
import { ReactComponent as BeerLogo } from "../../assets/beer.svg";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';
// Router
import { withRouter } from "react-router-dom";
// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Link, IconButton } from "@material-ui/core";
import clsx from 'clsx';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as UIactions from '../../store/UI/action';

function NavBar(props) {
  const classes = useStyles();
  const { history } = props;
  const pathname = props.location.pathname;
  const themeMode = useSelector(state => state.UI.themeMode);
  const dispatch = useDispatch();

  const handleOnClickRoute = (routeName) => {
    history.push(routeName);
  };

  const handleOnClickThemeMode = () => {
    dispatch(UIactions.setThemeMode(themeMode === 'dark'? 'light':'dark'));
  };

  return (
    <div className={classes.container}>
      <BeerLogo className={classes.beerLogo}/>
      <Typography variant="h6" className={classes.titlePart1}>{"Beer"}</Typography>
      <Typography variant="h6" className={classes.titlePart2}>{"Buddy"}</Typography>
      <div className={classes.containerLinks}>
        <Link 
          className={clsx(classes.link, {[classes.activeLink]: pathname === '/'})} 
          component="button" 
          onClick={() => { handleOnClickRoute("/") }}
        >
          <Typography className={clsx(classes.textLink, {[classes.activeTextLink]: pathname === '/'})} >{"Browse"}</Typography>
        </Link>
        <Link 
          className={clsx(classes.link, {[classes.activeLink]: pathname === '/favorites'})} 
          component="button" 
          onClick={() => { handleOnClickRoute("/favorites") }}
        >          
          <Typography className={clsx(classes.textLink, {[classes.activeTextLink]: pathname === '/favorites'})}>{"Favorite"}</Typography>
        </Link>
      </div>
      <div className={classes.containerButtonMode}>
        <IconButton className={classes.iconButton} onClick={handleOnClickThemeMode}>
          {
            themeMode === 'dark'? 
            <Brightness4Icon className={classes.modeIcon}/>
            : <Brightness4OutlinedIcon className={classes.modeIcon}/>
          }
        </IconButton>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width:'100%',
    maxHeight:'46px',
    display:'flex',
    alignItems:'center',
    overflow: 'hidden',
    position:'fixed',
    top: 0,
    zIndex:'3',
    backgroundColor: theme.palette.navbar.main,
    boxShadow: '0px 0px 0px 0px rgb(0 0 0 / 9%), 0px 0px 0px 0px rgb(0 0 0 / 9%), 0px 1px 10px 5px rgb(0 0 0 / 9%)',
  },
  beerLogo: {
    width:'38px',
    height:'38px',
    margin: '10px'
  },
  titlePart1: {
    fontWeight:'500',
    color: theme.palette.navbar.textTitlePart1
  },
  titlePart2:{
    fontWeight:'700',
    color: theme.palette.navbar.textTitlePart2
  },
  link:{
    color: theme.palette.navbar.textTitlePart1,
    padding:'9px',
    marginLeft:'1rem',
    "&:hover": {
      textDecoration: 'none',
      color: theme.palette.navbar.textTitlePart2,
    },
    "&:active": {
      opacity:'0.8'
    },
  },
  activeLink: {
    textDecoration: 'none',
    fontWeight:'600',
    color: theme.palette.navbar.textTitlePart2,
    borderBottom: '2px solid '+ theme.palette.navbar.textTitlePart2,
  },
  textLink:{
    fontSize:'1.1rem',
    fontWeight:'400',
  },
  activeTextLink: {
    fontSize:'1.1rem',
    fontWeight:'500',
  },
  containerButtonMode: {
    display:'flex',
    flex:1,
    justifyContent: 'flex-end',
  },
  iconButton:{
    margin:'12px',
    padding:0,
  },
  modeIcon:{
    color: theme.palette.navbar.textTitlePart1,
    fontSize:'1.7rem'
  }
}));

export default withRouter(NavBar);

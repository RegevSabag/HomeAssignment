import React, { useState } from "react";
// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";
// Components
import BeerCard from '../components/Beer/BeerCard';
import ModalConfirm from '../components/Beer/ModalConfirm';
import ModalView from '../components/Beer/ModalView';
// Redux
import { useSelector, useDispatch } from 'react-redux'
import * as UIactions from '../store/UI/action';

function FavoritesBeers() {
  const classes = useStyles();
  const items = useSelector(state => state.beers.favorites);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(UIactions.toggleModalConfirm())
  };

  const handleOnClickRemoveAll = () => {
    setSelectedItem(null);
    toggleModal();
  };

  return (
    <div className={classes.container}>
      <Grid container style={{width:'95%'}}>
      { Object.entries(items).length?
        <>
          <Grid item xs={12}>
            <Button className={classes.buttonRemoveAll} variant="contained" onClick={handleOnClickRemoveAll}>
              <Typography>{"Remove All"}</Typography>
            </Button>
          </Grid>
          <Grid container className={classes.containerCards}>
            {Object.entries(items).map(([key, value]) => (
              <Grid key={key} item xs={12} sm={6} md={4} lg={3} style={{padding:'10px'}}>
                <BeerCard
                  item={value}
                  setSelectedItem={setSelectedItem}
                />
              </Grid>
            ))}
          </Grid>
        </>
        :
        <Grid className={classes.containerEmptyFavorites} item xs={12}>
          <Typography className={classes.textEmptyFavorites} >{"Add some favorite beer"}</Typography>
        </Grid>
      }
      </Grid>
      <ModalConfirm 
        selectedItem={selectedItem}
      />
      <ModalView
        selectedItem={selectedItem}
      />
    </div>
  );
}


const useStyles = makeStyles((theme) => ({
  container: {
    display:'flex',
    justifyContent:'center',
    paddingTop: '50px',
    backgroundColor: theme.palette.background.main,
    height:'100%'
  },
  containerCards: {
    backgroundColor: theme.palette.background.main
  },
  buttonRemoveAll: {
    background: theme.palette.primary.main,
    color: '#000000',
    boxShadow:'none',
    marginLeft:'15px',
    marginTop:'10px',
    textTransform:'none',
    "&:hover": {
      background: theme.palette.primary.hover,
      boxShadow:'none',
    }
  },
  containerEmptyFavorites: {
    height:'70vh',
    display:'flex',
    justifyContent:'center', 
    alignItems:'center',
    color: theme.palette.text.main
  },
  textEmptyFavorites: {
    color: theme.palette.text.secondary,
    fontSize: '2rem'
  }
}));

export default FavoritesBeers;

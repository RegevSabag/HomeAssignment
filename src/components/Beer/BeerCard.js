import React from 'react';
// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, TextField, MenuItem } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { ReactComponent as ImageNotFound } from "../../assets/image_not_found.svg";
// Router
import { withRouter } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as UIactions from '../../store/UI/action';
import * as actionsBeers from '../../store/Beers/action';


function BeerCard(props) {
  const classes = useStyles();
  const { item, setSelectedItem } = props;
  const pathname = props.location.pathname;
  const favorites = useSelector(state => state.beers.favorites);
  const dispatch = useDispatch();

  const handleOnChangeSelect = (event) => {
    event.stopPropagation();
    dispatch(actionsBeers.setRankToFavoriteBeer(item.id, event.target.value));
  };

  const handleOnClickCard = (event) => {
    event.preventDefault();
    setSelectedItem(item);
    dispatch(UIactions.toggleModalView());
  };

  const handleOnClickFavorite = (event) => {
    event.stopPropagation();
    if(pathname !== '/favorites'){
      dispatch(actionsBeers.toggleItemFavorite(item)); 
    }
    else {
      setSelectedItem(item);
      dispatch(UIactions.toggleModalConfirm());
    }
  };

  return (
    <Card className={classes.card} onClick={(e) => handleOnClickCard(e)}>
      <div className={classes.containerStarIcon}>
      {
        favorites[item.id]?
          <StarIcon className={classes.starIcon} onClick={(e) => handleOnClickFavorite(e)}/>
        : <StarBorderIcon className={classes.starIcon} onClick={(e) => handleOnClickFavorite(e)}/>
      }
      { 
        pathname === '/favorites'? 
        <TextField
          select
          className={classes.root}
          size='small'
          variant="outlined"
          SelectProps={{ value: item.rank, onChange: (e) => {handleOnChangeSelect(e)} }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {[1,2,3,4,5].map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
        : null
      }
      </div>
      <div className={classes.containerImage}>
        {item.image_url? <img alt="_img" src={item.image_url}/>: <ImageNotFound className={classes.imageNotFound}/>}
      </div>
      <div className={classes.containerText}>
        <Typography className={classes.title}>{item.name}</Typography>
        <Typography className={classes.secondaryTitle}>{item.tagline}</Typography>
      </div>
    </Card>
  );
}

export default withRouter(BeerCard);

const useStyles = makeStyles((theme) => ({
  card: {
    height: '370px',
    background: theme.palette.card.main,
    "&:hover": {
      cursor:'pointer',
      background: theme.palette.card.hover,
    }
  },
  containerImage: {
    paddingBottom:'0.2rem',
    display:'flex', 
    alignItems:'center',
    justifyContent:'center'
  },
  containerText: {
    display:'flex',
    flexDirection:'column',
    textAlign:'center',
    alignItems:'center',
    overflow: 'hidden',
    width:'100%',
  },
  title: {
    fontSize:'1.4rem',
    fontWeight:'500',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width:'95%',
    color: theme.palette.text.title,
  },
  secondaryTitle: {
    fontSize:'1.2rem',
    fontWeight:'300',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width:'95%',
    color: theme.palette.text.secondary
  },
  containerStarIcon:{
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row-reverse'
  },
  starIcon:{
    fontSize:'2.5rem',
    paddingRight:'12px',
    paddingTop:'9px',
    color: theme.palette.primary.main,
    "&:hover": {
      cursor:'pointer'
    }
  },
  imageNotFound:{
    color: theme.palette.primary.main,
    width:'auto',
    height:'auto',
    maxWidth:'200px',
    maxHeight:'200px'
  },
  root: {
    paddingLeft:'12px',
    paddingTop:'9px',
    [`& fieldset`]: {
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.text.borderInput
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.text.borderInput
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.text.borderInput,
      borderWidth:'1px'
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.text.input,
      fontWeight:'500',
      width:'30px',
    },
    "&:hover .MuiOutlinedInput-input": {
      color: theme.palette.text.input,
      fontWeight:'500'
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: theme.palette.text.input,
      fontWeight:'500'
    }
  },
}));
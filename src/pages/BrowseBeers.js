import React, { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component'
// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, CircularProgress, Typography } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
// Components
import BeerCard from '../components/Beer/BeerCard';
import ModalView from '../components/Beer/ModalView';
// Redux
import { useSelector, useDispatch} from 'react-redux';
import { SET_ITEMS } from '../store/Beers/constants';
import * as actionsBeer from '../store/Beers/action';


function BrowseBeers() {
  const classes = useStyles();
  const items = useSelector(state => state.beers.items);
  const loadingIndicator = useSelector(state => state.beers.loadingIndicator);
  const loadingIndicatorFetchMore = useSelector(state => state.beers.loadingIndicatorFetchMore);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(1); 
  const [hasMoreItems, setHasMoreItems] = useState(true); 
  const [searchKey, setSearchKey] = useState(null); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionsBeer.fetchItems(page, searchKey, setHasMoreItems));
    
    return () => {
      dispatch({type: SET_ITEMS, payload:[]});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChangeInputSearch = (value) => {
    if(value === ''){
      setSearchKey(null)
    } else {
      setSearchKey(value)
    }
  };

  const handleOnClickSearch = () => {
    setPage(1);
    dispatch(actionsBeer.fetchItems(1, searchKey, setHasMoreItems))
  };

  const fetchBeers = () => {
    setPage(page + 1);
    dispatch(actionsBeer.fetchItems(page + 1, searchKey, setHasMoreItems))
  };

  return (
    <div className={classes.container}>
      <Grid container style={{width:'95%'}}>
        <Grid item xs={12}>
          <div className={classes.containerTextInput}>
            <TextField 
              className={classes.root}
              variant="outlined"
              placeholder="Food Pairing"
              size="small"
              onChange={(e) => handleOnChangeInputSearch(e.target.value)}
              InputProps={{
                className: classes.textInputProps
              }}
            />
            <Button
              className={classes.searchButton}
              onClick={handleOnClickSearch}
              variant="contained"
              color="primary"
              size="small"
            >
              <SearchIcon className={classes.searchIcon}/>
            </Button>
          </div>
        </Grid>
        {
        loadingIndicator? 
          <Grid item xs={12} className={classes.containerLoadingIndicator}>
            <CircularProgress color={"primary"} ></CircularProgress>
          </Grid>
        : !items.length ? 
          <Grid item xs={12} className={classes.containerEmptyFavorites}>
            <Typography className={classes.textEmptyFavorites} >{"No matching results found"}</Typography>
          </Grid>
        :
        <Grid item xs={12}>
          <InfiniteScroll
              dataLength={items.length}
              next={fetchBeers}
              hasMore={hasMoreItems}
            >
            <Grid container className={classes.containerCards}>
              {items.map(value => (
                <Grid key={value.id} item xs={12} sm={6} md={4} lg={3} style={{padding:'10px'}}>
                  <BeerCard
                    item={value}
                    setSelectedItem={setSelectedItem}
                  />
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
          { 
            loadingIndicatorFetchMore? 
            <Grid item xs={12} className={classes.containerLoadingIndicator}>
              <CircularProgress color={"primary"} ></CircularProgress>
            </Grid>
            : null
          }
        </Grid>
        }
      </Grid>
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
    paddingTop: '55px',
    backgroundColor: theme.palette.background.main
  },
  containerCards: {
    backgroundColor: theme.palette.background.main
  },
  containerTextInput: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  root: {
    marginLeft:'15px',
    width:'275px',
    [`& fieldset`]: {
      borderRadius: 0,
      borderBottomLeftRadius:'3px',
      borderTopLeftRadius:'3px',
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
      fontWeight:'500'
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
  textInputProps: {
    color:theme.palette.text.main,
    height:'36px'
  },
  searchButton: {
    background: theme.palette.primary.main,
    borderRadius:'0',
    borderBottomRightRadius:'3px',
    borderTopRightRadius:'3px',
    border: '1px solid ' + theme.palette.primary.main,
    minHeight:'36px',
    minWidth:'36px',
    width:'36px',
    boxShadow:'none',
    marginLeft:'-1px',
    '&:hover': {
      boxShadow:'none',
      background: theme.palette.primary.hover,
      border: '1px solid ' + theme.palette.primary.hover,
    }
  },
  searchIcon: {
    color: theme.palette.background.main,
    fontSize:'1.7rem'
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
  },
  containerLoadingIndicator:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  }
}));

export default BrowseBeers;

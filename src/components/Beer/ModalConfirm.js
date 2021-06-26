import React from 'react';
// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Fade, Grid, Backdrop, Typography, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import * as UIactions from '../../store/UI/action';
import * as actionsBeers from '../../store/Beers/action';


export default function ModalConfirm(props) {
  const classes = useStyles();
  const{ selectedItem } = props
  const modalConfirm = useSelector(state => state.UI.modalConfirm);
  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(UIactions.toggleModalConfirm())
  };

  const handleOnClickConfirm = () => {
    if(selectedItem){
      dispatch(actionsBeers.toggleItemFavorite(selectedItem));
    } else {
      dispatch(actionsBeers.removeAllFavorites(selectedItem));
    }
    toggleModal()
  };

  return (
    <Modal
      className={classes.modal}
      open={modalConfirm}
      onClose={toggleModal}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalConfirm}>
        <Grid container className={classes.paper}>
          <Grid item xs={12} className={classes.modalTitleContainer}>
            <Typography className={classes.modalTitle}>{selectedItem? `Beer #${selectedItem.id}` : `Remove all`}</Typography>
            <CloseIcon className={classes.closeIcon} onClick={toggleModal}/>
          </Grid>
          <Grid className={classes.containerText} item xs={12}>
            <Typography style={{fontSize:'1.2rem'}}>{selectedItem? `You're sure you want to remove ${selectedItem.name}?`: `You're sure you want to remove all favorites?`}</Typography>
          </Grid>
          <Grid className={classes.containerButtons} item xs={12}>
            <Button 
              variant="contained"
              onClick={handleOnClickConfirm}
              className={clsx(classes.button, classes.buttonRemove)}
            >
              <Typography>{selectedItem? "Remove": "Remove all"}</Typography>
            </Button>
            <Button className={classes.buttonCancel} variant="contained" onClick={toggleModal}>
              <Typography>{"Cancel"}</Typography>
            </Button>
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width:'50%',
    height:'28%',
    minHeight:'180px',
    maxWidth:'650px',
    minWidth:'337px',
    backgroundColor: theme.palette.modal.secondary,
    boxShadow: theme.shadows[5],
    outline: 'none',
    borderRadius:'5px'
  },
  modalTitleContainer:{
    height:'60px',
    borderBottom:'1px solid' + theme.palette.modal.border,
    alignItems:'center',
    display:'flex',
    justifyContent:'space-between',
    padding:'5px',
    paddingLeft:'10px',
    paddingRight:'10px',
    backgroundColor: theme.palette.modal.main,
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px'
  },
  modalTitle:{
    fontSize:'1.3rem',
    fontWeight:'500',
    color: theme.palette.modal.title
  },
  closeIcon:{
    width:'1.5rem',
    color: theme.palette.closeIcon.main,
    "&:hover":{
      cursor:'pointer',
      color: theme.palette.closeIcon.hover,
    }
  },
  containerText: {
    paddingLeft:'20px',
    backgroundColor: theme.palette.modal.secondary,
    color: theme.palette.modal.text,
  },
  containerButtons: {
    alignItems:'center',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '20px', 
    borderTop: '1px solid ' + theme.palette.modal.border,
    backgroundColor: theme.palette.modal.main,
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px'
  },
  button: {
    color:'#ffffff',
    marginRight:'20px',
    textTransform:'none',
    minWidth:'98px',
    boxShadow:'none',
    "&:hover": {
      boxShadow:'none',
    }
  },
  buttonRemove: {
    background: '#c83b33',
    color: '#ffffff',
    "&:hover": {
      background:'#c74d46',
    }
  },
  buttonCancel: {
    background: theme.palette.modal.main,
    border: '1px solid ' + theme.palette.primary.main,
    color: theme.palette.modal.text,
    textTransform:'none',
    boxShadow:'none',
    "&:hover": {
      background: theme.palette.primary.main,
      color: '#000000',
      boxShadow:'none',
    }
  },
}));
import React from 'react';
// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Fade, Grid, Backdrop, Typography, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx'
// Redux
import { useSelector, useDispatch } from 'react-redux';
import * as UIactions from '../../store/UI/action';


export default function ModalView(props) {
  const classes = useStyles();
  const { selectedItem } = props
  const modalView = useSelector(state => state.UI.modalView);
  const fieldsToShow = [ 'id', 'name', 'abv', 'tagline', 'first_brewed', 'description' ];
  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(UIactions.toggleModalView())
  };

  const processTitle = (value) => {
    return (value.charAt(0).toUpperCase() + value.slice(1)).replace("_", " ");
  };


  return (
    <Modal
      className={classes.modal}
      open={modalView}
      onClose={toggleModal}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalView}>
        <Grid container className={classes.paper}>
          <Grid item xs={12} className={classes.modalTitleContainer}>
            <Typography className={classes.modalTitle} >{selectedItem?.name}</Typography>
            <CloseIcon className={classes.closeIcon} onClick={toggleModal}/>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.mainContainerItems}>
              {
                fieldsToShow.map((value, index) => (
                  <Grid 
                    key={value} 
                    item xs={12} 
                    className={clsx(classes.containerItem, {[classes.borderItem]: index !== (fieldsToShow.length - 1)})}
                  >
                    {
                      value === 'description' ? 
                        <div style={{display:'flex', flexDirection:'column'}}>
                          <Typography className={classes.titleItem}>{processTitle(value)}</Typography>
                          <Typography className={classes.textItemDescription}>{selectedItem?.[value]}</Typography>
                        </div>
                      :
                      <>
                        <Typography className={classes.titleItem}>{processTitle(value)}</Typography>
                        <Typography>{selectedItem?.[value]}</Typography>
                      </>
                    }
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
          <Grid className={classes.containerButtons} item xs={12}>
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
    width:'60%',
    backgroundColor: theme.palette.modal.secondary,
    boxShadow: theme.shadows[5],
    borderRadius:'5px',
    outline: 'none',
    [theme.breakpoints.down('xs')]: {
      width:'100%',
      height:'100%',
    }
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
  mainContainerItems: {
    paddingLeft:'8%',
    paddingRight:'8%',
    overflow:'scroll', 
    maxHeight:'60vh',
    backgroundColor: theme.palette.modal.secondary,
    color: theme.palette.modal.text,
    [theme.breakpoints.down('xs')]: {
      maxHeight:'calc(100vh - 120px)'
    }
  },
  containerItem: {
    padding:'10px',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    // color: theme.palette.modal.text
  },
  titleItem:{
    fontWeight:'600'
  },
  textItemDescription: {
    marginLeft:'20%'
  },
  borderItem: {
    borderBottom:'1px solid ' + theme.palette.modal.border
  },
  containerButtons: {
    height:'70px',
    alignItems:'center',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '20px', 
    borderTop: '1px solid ' + theme.palette.modal.border,
    backgroundColor: theme.palette.modal.main,
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px'
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
      boxShadow:'none'
    }
  },
}));
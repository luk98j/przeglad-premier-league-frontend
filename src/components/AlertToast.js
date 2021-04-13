import React, { useState, useRef } from "react";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));


export default function AlertToast(props){
    const [open, setOpen] = React.useState(true);
    console.log(props)
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <Alert severity="error"  action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }>{props}</Alert>
            </Collapse>
        </div>
    )
}

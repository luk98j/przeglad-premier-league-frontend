import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import LineChartPoints from "./LineChartPoints";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '75%',
  },
  p1:{
    margin:"10px",
}
}));

export default function ModalWithPointsChart(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [stats, setStats] = React.useState(null);

    useEffect(()=>{
        if(props.stats != null || props.stats !=undefined){
            setStats(props.stats)
        }
    },[])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <Button type="button" onClick={handleOpen} variant="contained" color="primary" className={classes.p1}>
            Wykres punktów
        </Button>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
            <div className={classes.paper}>
                <LineChartPoints stats={stats}/>
            </div>
            </Fade>
        </Modal>
        </div>
    );
}
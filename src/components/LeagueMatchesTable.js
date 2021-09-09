import { Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';
import TablePagination from '@material-ui/core/TablePagination';
import {Table, TableCell, TableRow, TableBody, TableHead, TableContainer, Paper, Typography, Box, Collapse, IconButton, Badge, Button} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import clsx from 'clsx';
import ImageLoader from "../components/ImageLoader";
import ModalWithWDLChart from "./ModalWithWDLChart";
import ModalWithPointsChart from "./ModalWithPointsChart";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    center: {
      margin: 'auto',
      width: '30%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    rowTable:{
      padding: "1.5px",
    },
    flexRow: {
      width:"10%",
      flexDirection: "row",
      flexWrap: "nowrap",
      padding: "1.5px",
    },
    shape: {
      padding:"1px",
      width: 20,
      height: 20,
      fontWeight: "bold",
      float: "left",
      textAlign:"center",
      margin: "0.5px",
    },
    shapeCircle: {
      borderRadius: '50%',
    },
    redColor: {
      backgroundColor: '#cc0000'
    },
    greyColor: {
      backgroundColor: '#bfbfbf',
    },
    greenColor: {
      backgroundColor: "#00b300",
    },
    p1:{
      padding:"10px",
      margin:"10px",
    }
  }));

const LeagueMAtchesTable = (props) =>{
    const [leagueMatches, setLeagueMatches] = useState(null);
    const classes = useStyles();
    
    useEffect(()=>{
        if(props.table){
            setLeagueMatches(props.table);
        }
    }, [props.table])

   
    function Row(props){
    const { row } = props;
    const [open, setOpen] = useState(false);
    const classes = useStyles();

        return (
            <React.Fragment>
            <TableRow>
                <TableCell className={classes.rowTable}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="center" className={classes.rowTable}>{createView(row)}</TableCell>
                <TableCell></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                <Collapse in={open} timeout="auto" unmountOnExit>                   
                    <Grid container spacing={3}>                    
                            <Table>
                                <TableRow>
                                    <TableCell align="left" style={{width: '15%'}}></TableCell>
                                    <TableCell align="center" style={{width: '30%'}}><h4>Home</h4></TableCell>
                                    <TableCell align="center" style={{width: '10%'}}></TableCell>
                                    <TableCell align="center" style={{width: '30%'}}><h4>Away</h4></TableCell>
                                    <TableCell align="left" style={{width: '15%'}}></TableCell>
                                </TableRow>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center"><b>Posiadanie</b></TableCell>
                                        <TableCell align="center">{row.teamAPossession}</TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">{row.teamBPossession}</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center"><b>Strzały</b></TableCell>
                                        <TableCell align="center">{row.teamAShots}</TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">{row.teamBShots}</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center"><b>Strzały celne</b></TableCell>
                                        <TableCell align="center">{row.teamAShotsOnTarget}</TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">{row.teamBShotsOnTarget}</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center"><b>Strzały niecelne</b></TableCell>
                                        <TableCell align="center">{row.teamAShotsOffTarget}</TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">{row.teamBShotsOffTarget}</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center"><b>Faule</b></TableCell>
                                        <TableCell align="center">{row.teamAFouls}</TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">{row.teamBFouls}</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center"><b>Żółte kartki</b></TableCell>
                                        <TableCell align="center">{row.teamAYellowCards}</TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">{row.teamBYellowCards}</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center"><b>Czerwone kartki</b></TableCell>
                                        <TableCell align="center">{row.teamARedCards}</TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">{row.teamBRedCards}</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center"><b>Spalone</b></TableCell>
                                        <TableCell align="center">{row.teamAOffsides}</TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">{row.teamBOffsides}</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center"><b>Rożne</b></TableCell>
                                        <TableCell align="center">{row.teamHomeCorners}</TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">{row.teamAwayCorners}</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>                    
                    </Grid>
                </Collapse>
                </TableCell>
            </TableRow>
            </React.Fragment>
        );
    }

    function createView(data){
        return(
            <div>
                <h6>
                    Status: {data.status}<br/>
                    Stadion: {data.stadiumName}<br/>
                    Tydzien: {data.gameWeek}<br/>
                </h6>
                <Grid container spacing={4}>
                    <Grid item xs>
                        <ImageLoader logo={data.homeIdClubName} type={"league"}/>
                    </Grid>
                    <Grid item xs>
                        <h1>{data.homeGoals}</h1>
                    </Grid>
                    <Grid item xs>
                        <h1>-</h1>
                    </Grid>
                    <Grid item xs>
                        <h1>{data.awayGoals}</h1>
                    </Grid>
                    <Grid item xs>
                        <ImageLoader logo={data.awayIdClubName} type={"league"}/>
                    </Grid>
                    
                </Grid>
      
            </div>
        );
    }

    return (
    <Container>
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {leagueMatches && leagueMatches.map((row,i) => (
                <Row key={i} row={row} />
                ))}
            </TableBody> 
            </Table>
        </TableContainer>
    </Container>
    );
};
    
export default LeagueMAtchesTable;
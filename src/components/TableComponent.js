import { Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';
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

const TableComponent = (props) =>{
    const [seasonTable, setSeasonTable] = useState(null);
    const classes = useStyles();
    
    useEffect(()=>{
        if(props.table){
            setSeasonTable(props.table);
        }
    }, [props.table])

    const createCircleWithWinDrawOrLose = (lastResults) =>{
        var resultArray = lastResults.split("")
        var result = resultArray.reverse().slice(0,5)
        return (
          <div>
          {result && result.map((matchResult)=>(
          <div>
            {matchResult === 'w' && 
            <div className={clsx(classes.shape, classes.shapeCircle, classes.greenColor)}>
              {matchResult.toUpperCase()}
            </div>
            }
            {matchResult === 'd' && 
            <div className={clsx(classes.shape, classes.shapeCircle, classes.greyColor)}>
              {matchResult.toUpperCase()}
            </div>
            }
            {matchResult === 'l' && 
            <div className={clsx(classes.shape, classes.shapeCircle, classes.redColor)}>
              {matchResult.toUpperCase()}
            </div>
            }
          </div>
          ))}
          </div>
        )
      }
    
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
            <TableCell align="center" className={classes.rowTable}>{row.position}</TableCell>
            <TableCell align="center" className={classes.rowTable}><ImageLoader logo={row.shortHand}/></TableCell>
            <TableCell align="left" className={classes.rowTable}>{row.clubClubName}</TableCell>
            <TableCell align="center" className={classes.rowTable}>{row.matchesPlayed}</TableCell>
            <TableCell align="center" className={classes.rowTable}>{row.points}</TableCell>
            <TableCell align="center" className={classes.rowTable}>{row.seasonWinsOverall}</TableCell>
            <TableCell align="center" className={classes.rowTable}>{row.seasonDrawsOverall}</TableCell>
            <TableCell align="center" className={classes.rowTable}>{row.seasonLossesOverall}</TableCell>
            <TableCell align="center" className={classes.rowTable}>{row.seasonGoals}</TableCell>
            <TableCell align="center" className={classes.rowTable}>{row.seasonConceded}</TableCell>
            <TableCell align="center" className={classes.rowTable}>{row.seasonGoalDifference}</TableCell>
            <TableCell align="center" className={classes.flexRow}>{createCircleWithWinDrawOrLose(row.wdlRecord)}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={2}>
                
                <Grid container spacing={3}>
                  <Grid item xs={2}> 
                    <ImageLoader logo={row.shortHand} type={"big"}/>
                  </Grid>
                  <Grid item xs={6}>
                    <Table style={{borderTop: '1px solid red'}}>
                      <TableRow>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">Wygrane</TableCell>
                        <TableCell align="center">Przegrane</TableCell>
                        <TableCell align="center">Remis</TableCell>
                        <TableCell align="center">Gole</TableCell>
                      </TableRow>
                      <TableBody>
                        <TableRow>
                        <TableCell align="center">Domowy</TableCell>
                        <TableCell align="center">{row.seasonWinsHome}</TableCell>
                        <TableCell align="center">{row.seasonLossesHome}</TableCell>
                        <TableCell align="center">{row.seasonDrawsHome}</TableCell>
                        <TableCell align="center">{row.seasonDrawsHome}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">Wyjazd</TableCell>
                          <TableCell align="center">{row.seasonWinsAway}</TableCell>
                          <TableCell align="center">{row.seasonLossesAway}</TableCell>
                          <TableCell align="center">{row.seasonDrawsAway}</TableCell>
                          <TableCell align="center">{row.seasonDrawsAway}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    </Grid>
                        <Grid item xs>
                        {<ModalWithWDLChart stats={row.wdlRecord}/> }
                        {<ModalWithPointsChart stats={row.wdlRecord}/>}
                        </Grid>
                </Grid>
                </Box>
            </Collapse>
            </TableCell>
        </TableRow>
        </React.Fragment>
    );
    }

    return (
    <Container>
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell />
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="left" className={classes.rowTable}>Klub</TableCell>
                <TableCell align="center" className={classes.rowTable}>Rozegrane</TableCell>
                <TableCell align="center" className={classes.rowTable}>Punkty</TableCell>
                <TableCell align="center" className={classes.rowTable}>Wygrane</TableCell>
                <TableCell align="center" className={classes.rowTable}>Remisy</TableCell>
                <TableCell align="center" className={classes.rowTable}>Przegrane</TableCell>
                <TableCell align="center" className={classes.rowTable}>GZ</TableCell>
                <TableCell align="center" className={classes.rowTable}>GS</TableCell>
                <TableCell align="center" className={classes.rowTable}>RG</TableCell>
                <TableCell align="center" className={classes.rowTable}>Bilans</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {seasonTable && seasonTable.map((row,i) => (
                <Row key={i} row={row} />
                ))}
            </TableBody> 
            </Table>
        </TableContainer>
    </Container>
    );
};
    
export default TableComponent;
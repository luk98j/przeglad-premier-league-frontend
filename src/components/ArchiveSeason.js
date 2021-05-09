import { Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import API from "../services/API.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../components/TableComponent';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  select:{
    margin: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    margin:"20px",
    minWidth:"130px",
    height:"50px",
  },
  centerDiv:{
    width:"100%",
    display: "flex",
    justifyContent: "center",
  },
}));

const ArchiveSeason = () => {
  const classes = useStyles();
  const [tablePeriod, setTablePeriod] = useState(null);
  const [seasonTable, setSeasonTable] = useState(null);
  const [chosenPeriod, setChosenPeriod] = useState(null);
  useEffect(() => {
    if(tablePeriod === null){
      API.getAllSeasonPeriodPrivate()
      .then(
        (response)=>{
          setTablePeriod(response.data)
        }
      ).catch(error =>{
        errorMessage(error)
      })
  }
  }, [tablePeriod]);

  const getSeasonTable = (period) => {
    API.getDetailsAboutOldSeason(period)
    .then(
      (response) => {
        setSeasonTable(response.data)
      })
    .catch(
      (error) => {
        errorMessage(error)
      }
    )
  }

  const errorMessage = (text) =>{
    toast.error(text, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  
  const handlePeriodChange = (event) => {
    setChosenPeriod(event.target.value)
    getSeasonTable(event.target.value)
  }
  
  return (
      <Container>
        <header className="jumbotron">
          <div className={classes.centerDiv}>
            {tablePeriod &&
            <FormControl>
                <Select
                defaultValue={tablePeriod[0].period}
                className={classes.select}
                value={chosenPeriod}
                onChange={handlePeriodChange}
                >
                {tablePeriod && tablePeriod.map((key)=>
                    <option value={key.period}>{key.period}</option>
                )}
                </Select>
            </FormControl>}
          </div>
        </header>
        <TableComponent table={seasonTable}/>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
    </Container>
  );
};

export default ArchiveSeason;
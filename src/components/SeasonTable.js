import { Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import API from "../services/API.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../components/TableComponent';

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
}));

const SeasonTable = () => {
  const classes = useStyles();
  const [tablePeriod, setTablePeriod] = useState(null);
  const [seasonTable, setSeasonTable] = useState(null);

  useEffect(() => {
    API.getAllSeasonPeriod()
    .then(
      (response)=>{
        setTablePeriod(response.data[0].period)
        if(response.data[0].period){
          getSeasonTable(response.data[0].period)
        } else {
          errorMessage("Problem with period")
        }
      }
    ).catch(error =>{
      errorMessage(error)
    })
  }, []);

  const getSeasonTable = (period) => {
    API.getDetailsAboutSeason(period)
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
  
  
  return (
      <Container>
        <header className="jumbotron">
        {tablePeriod && (
            <div className={classes.center}>
            <h3>Tabela Premier League {tablePeriod} </h3>
            </div>
        )}
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

export default SeasonTable;
import React, { useState, useEffect } from "react";
import API from "../services/API.js";
import Container from '@material-ui/core/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import LeagueMAtchesTable from '../components/LeagueMatchesTable';

const useStyles = makeStyles((theme) => ({
    center: {
      margin: 'auto',
      width: '20%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
  }));

const LeagueMatches = () => {
    const [content, setContent] = useState("");
    const [leagueMatches, setLeagueMatches] = useState(null);
    const period = '2020/2021';
    const classes = useStyles();

    useEffect(() => {
        if(leagueMatches === null){
            API.getLeagueMatches(period).then(
                (response)=>{
                    setLeagueMatches(response.data)
                }
            ).catch(
                (error)=>{
                    errorMessage(error)
                }
                
            )
        }
    }, []);

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
            <div className={classes.center}>
                <h3>Terminarz Premier League</h3>
            </div>
        </header>
        <LeagueMAtchesTable table={leagueMatches}/> 
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

export default LeagueMatches;
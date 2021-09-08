import React, { useState, useEffect } from "react";
import API from "../services/API.js";
import Container from '@material-ui/core/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ModalPost from '../components/ModalPost';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "450px",
    height: "275px",
    margin:"5px",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  typ: {
    height:"50px"
  }
  
}));

const Home = () => {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [post,setPost] = useState(null)
  useEffect(() => {
    if(post === null){
      API.getPosts().then(
          (response)=>{
            setPost(response.data)
          }
      ).catch(
          (error)=>{
              errorMessage(error)
          }
          
      )
    }
    console.log(post)
  }, [post]);

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
    <div className="container">
      <header className="jumbotron">
        <h3>Przeglad Premier League</h3>
      </header>
      <div>
      
      <Grid container>
            
        {post && post.map((row,i)=>{
          return (
            <Grid item xs={4}>
              
                <Card className={classes.root}>
                <CardContent>
                  <Typography>
                    <div className={classes.typ}>
                    <h4>
                    {row.title.slice(0,75)}
                    </h4>
                    </div>
                  </Typography>
                  <Typography variant="body2" component="p">
                    {row.text.slice(0,200)}
                  </Typography>
                  
                  <CardActions>
                    {<ModalPost post={row}/> }
                  </CardActions>
                  
                </CardContent>
                </Card>
            
          </Grid>
          )
        })}
        </Grid>
        
        </div>
      
      
    </div>
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

export default Home;
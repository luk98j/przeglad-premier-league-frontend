import React, { useState, useEffect } from "react";
import API from "../services/API.js";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Post from "../components/Post"

const useStyles = makeStyles((theme) => ({
  block:{
    margin: "15px" ,
  },
  titleField:{
    width:"100%",
  },
  textField:{
    width:"100%",
  },
  buttonStyle:{
    margin:"10px",
  },
  leftSide:{
    width:"60%",
    float:"left"
  },
  rightSide:{
    width:"40%",
    float:"left"
  },
  view:{
    width:"100%",
    margin:"5px"
  }
}));

const Blog = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [disable, setDisable] = useState("true")
  const [post,setPost] = useState("")
  const classes = useStyles();
  useEffect(() => {
    if(title !== undefined || text !== undefined){
      const post = {
        title:title,
        text:text,
      }
      setPost(post)
      if(title === "" || text === ""){
        setDisable(true)
      } else {
        setDisable(false)
      }
    }

  }, [title, text]);

  const handleText = (event)=>{
    if(text!=undefined){
        setText(event.target.value)
    }
  }

  const handleTitle = (event)=>{
    if(title!=undefined){
        setTitle(event.target.value)
    }
  }

  const sendPost = ()=>{
    if(title.length < 20)
    {
      errorMessage("Too short title")
    } else if(text.length < 50){
      errorMessage("Too short text")
    } else {
      const post = {
        "title": title,
        "text": text,
        "date": Date.now(),
      }
     
      var result = API.sendPost(post)
      if(result != undefined){
        succesMessage("Post Saved")
      }
    }
  }
  

  const clear = () =>{
    setTitle("")
    setText("")
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

  const succesMessage = (text) =>{
    toast.success(text, {
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
      <div className={classes.leftSide}>
        <header className="jumbotron">
            <h3>Dodaj post</h3>
        </header>
          <b>Tytuł</b>
          <div className={classes.block}>
            <TextField 
                required
                label="Required" 
                onChange={handleTitle}
                value={title}
                size={100}
                className={classes.titleField}
                />
          </div>
          <b>Tekst</b>
          <div className={classes.block}>
            <TextField
                label="Multiline"
                multiline
                maxRows={20}
                value={text}
                onChange={handleText}
                variant="outlined"
                className={classes.textField}
                rows={30}
            />
          </div>
          <div className={classes.block}>
            <Button
            variant="contained"
            color="primary"
            className={classes.buttonStyle}
            onClick={sendPost}
            disabled={disable}
            >
              Wyślij
            </Button>
            <Button
            variant="contained"
            className={classes.buttonStyle}
            onClick={clear}>
              Wyczyść wszystko
            </Button>
          </div>
        </div>
        <div className={classes.rightSide}>
        <header className="jumbotron">
            <h3>Podglad</h3>
            <div>
              <Post post={post}/>
            </div>
        </header>
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

export default Blog;
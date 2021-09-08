import React, { useState, useEffect } from "react";
import API from "../services/API.js";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  imageView:{
    height: "100%",
    width: "100%"
  },
  textView:{
    flex: 1,
    flexDirection: 'column',
    whiteSpace: "pre-line",
    width:"100%",
    wordWrap: "break-word"
  },
  containerView:{
    width:"100%"
  },
  
}));

const Post = (props) => {
  const [title, setTitle] = useState(undefined);
  const [text, setText] = useState("");
  const classes = useStyles();
  useEffect(() => {
    if(props.post != undefined){
      if(props.post.title !== undefined){
        setTitle(props.post.title)
      }
      if(props.post.text !==undefined){
        setText(props.post.text)
      }
      if(props.post.fileId != undefined){
        console.log("XD" + props.post.fileId)
        
      }
      
    }
  }, [props.post]);

  const readFile = (temp)=> {
    const file = temp;
    return URL.createObjectURL(temp)
}

  return (
    <Container>
    <div className={classes.containerView}>
      <div className={classes.textView}>
      <h3>{title}</h3>
      </div>
      <div>
        <div className={classes.textView}>
        <Box component="div" whiteSpace="normal">
          {text}
        </Box>
        </div>
      </div>
    </div>
    </Container>
  );
};

export default Post;
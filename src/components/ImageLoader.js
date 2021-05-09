import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles  = makeStyles((theme) =>({
    imageSize:{
        padding:"1px",
        width:"24px",
        height:"24px",
    }
})
)



const ImageLoader=(props)=>{
    const classes = useStyles();

    const loadImage = (teamName) =>{
        if(teamName !== undefined){
            return (
                <div>
                    <img src={"/image/"+props.logo+".png"} className={classes.imageSize}/>
                </div>
            )
        }
    }

    return (
        <div>
            {loadImage(props.logo)}
        </div>
    )
}

export default ImageLoader
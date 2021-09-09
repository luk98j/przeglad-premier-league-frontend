import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles  = makeStyles((theme) =>({
    imageSize:{
        padding:"1px",
        width:"24px",
        height:"24px",
    },
    imageBigSize:{
        padding:"20px",
        width:"80px",
        height:"80px",
    },
    imageMiddleSize:{
        padding:"10px",
        width:"70px",
        height:"70px",
    },
})
)



const ImageLoader=(props)=>{
    const classes = useStyles();

    const loadImage = (teamName) =>{
        if(teamName !== undefined){
            if(props.type=="big"){
                return (
                    <div>
                        <img src={"/image/"+props.logo+".png"} className={classes.imageBigSize}/>
                    </div>
                )
            } else if(props.type=="league"){
                var logo = props.logo;
                logo.toLowerCase();
                const nameCleaned = logo.replace(/\s/g, '-')
                return(
                    <div>
                        <img src={"/image/"+nameCleaned+".png"} className={classes.imageMiddleSize}/>
                    </div>
                )
            } else{
                return (
                    <div>
                        <img src={"/image/"+props.logo+".png"} className={classes.imageSize}/>
                    </div>
                )
            }
        }
    }

    return (
        <div>
            {loadImage(props.logo)}
        </div>
    )
}

export default ImageLoader
import { Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import API from "../services/API.js";

const Table = () => {
  
  useEffect(() => {
    API.getAllSeasonPeriod()
    .then(
      (response)=>{
        console.log(response.data)
      }
    )
  }, []);

  return (
    <Container>
      <header className="jumbotron">
        <h3>Table</h3>
      </header>
    </Container>
  );
};

export default Table;
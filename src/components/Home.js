import React, { useState, useEffect } from "react";
import API from "../services/API.js";
import Container from '@material-ui/core/Container';

const Home = () => {
  const [content, setContent] = useState("");
  
  useEffect(() => {
  }, []);

  return (
    <Container>
    <div className="container">
      <header className="jumbotron">
        <h3>Przeglad Premier League</h3>
      </header>
    </div>
    </Container>
  );
};

export default Home;
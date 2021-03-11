import React, { useState, useEffect } from "react";
import {temp} from "../services/API.js";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log(temp())
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Wilkomen</h3>
      </header>
    </div>
  );
};

export default Home;
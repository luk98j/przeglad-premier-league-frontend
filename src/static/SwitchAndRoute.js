import { useEffect } from "react";
import Login from "../components/Login";
import Home from "../components/Home";
import Table from "../components/Table"
import { Switch, Route } from "react-router-dom";

const SwitchAndRoute = () =>{
    useEffect(() => {
      
    }, []);

   return(
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Table}/>
    </Switch>
   )
}

export default SwitchAndRoute;
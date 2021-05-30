import { useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import Table from "../components/Table"
import Confirm from "../components/Confirm"
import { Switch, Route } from "react-router-dom";

const SwitchAndRoute = () =>{
   
   return(
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Home}/>
        <Route exact path="/seasons-table" component={Table}/>
        <Route path="/confirm/:id" component={Confirm}/>
    </Switch>
   )
}

export default SwitchAndRoute;
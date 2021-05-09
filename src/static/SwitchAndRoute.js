import { useEffect } from "react";
import Login from "../components/Login";
import Home from "../components/Home";
import SeasonTable from "../components/SeasonTable"
import { Switch, Route } from "react-router-dom";
import ArchiveSeason from "../components/ArchiveSeason"

const SwitchAndRoute = () =>{
   
   return(
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Home}/>
        <Route exact path="/seasons-table" component={SeasonTable}/>
        <Route exact path="/archive-seasons-table" component={ArchiveSeason}/>
    </Switch>
   )
}

export default SwitchAndRoute;
import { useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import SeasonTable from "../components/SeasonTable"
import Confirm from "../components/Confirm"
import { Switch, Route } from "react-router-dom";
import ArchiveSeason from "../components/ArchiveSeason"
import LeagueMatches from "../components/LeagueMatches"
import Blog from "../components/Blog"

const SwitchAndRoute = () =>{
   
   return(
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Home}/>
        <Route exact path="/seasons-table" component={SeasonTable}/>
        <Route exact path="/archive-seasons-table" component={ArchiveSeason}/>
        <Route exact path="/seasons-matches" component={LeagueMatches}/>
        <Route exact path="/add-post" component={Blog}/>
        <Route path="/confirm/:id" component={Confirm}/>
    </Switch>
   )
}

export default SwitchAndRoute;
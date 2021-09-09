import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import AuthService from "../services/auth.service";

class Confirm extends Component{
    render()
    {

        AuthService.confirm(this.props.match.params.id).then(
            (response) => {
                console.log(response.data.message);

                this.props.history.push("/login");

            },
            (error) => {
                this.props.history.push("/");
            }
        );

        return (
            <Container>
            <div className="container">
            <header className="jumbotron">
                <h3>Confirmed</h3>
            </header>
            </div>
            </Container>
        );
    }

}
export default withRouter(Confirm);
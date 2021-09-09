import React from "react";
import { InputAdornment, Container, MenuItem } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { RemoveRedEye } from '@material-ui/icons';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import AuthService from "../services/auth.service";
import Grid from '@material-ui/core/Grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Countries } from './Countries'

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        margin: 'auto',
        width: '60%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    eye: {
        cursor: 'pointer',
    },
})

class Register extends React.Component {


    state = {
        user: {
            username: '',
            password: '',
            repeatPassword: '',
            email: '',
            name: '',
            lastName: '',
            country: '',
            birthdate: '',
            human_validator: '',
        },
        captcha: {
            first: Math.floor(Math.random() * 21),
            second: Math.floor(Math.random() * 21),
        },
        passwordIsMasked: true,
    }

    togglePasswordMask = () => {
        this.setState(prevState => ({
            passwordIsMasked: !prevState.passwordIsMasked,
        }));
    };


    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.user.password) {
                return false;
            }
            return true;
        });
    }

    componentWillUnmount() {
        // remove rule when it is not needed
        ValidatorForm.removeValidationRule('isPasswordMatch');
        ValidatorForm.removeValidationRule('isCaptchaCorrect');
    }

    handleChange = (event) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    handleSubmit = () => {

        const { user, captcha } = this.state;
        if (captcha["first"]+captcha["second"] !== parseInt(user["human_validator"])) {
            toast.error("Podany wynik jest nieprawidłowy! Spróbuj ponownie.", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
              captcha["first"] =  Math.floor(Math.random() * 21);
              captcha["second"] = Math.floor(Math.random() * 21);
              this.setState({ captcha });
              return;
        }

        AuthService.register(this.state.user.username, this.state.user.email, this.state.user.password, this.state.user.name, this.state.user.last_name, this.state.user.country, this.state.user.birth_date, this.state.user.human_validator).then(
            (response) => {
                toast.success(response.data.message, {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  })
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                    toast.error(error.response.data.message, {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      })
            }
        );
    }

    render() {
        const { user, captcha } = this.state;
        const { classes } = this.props;
        const { passwordIsMasked } = this.state;

        let text = "Podaj wynik działania   " + captcha["first"] + " + " + captcha["second"];

        return (

            <Container>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Zarejestruj się
                    </Typography>
                </div>
                <ValidatorForm onSubmit={this.handleSubmit} className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Login"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={user.username}
                                onChange={this.handleChange}
                                errorMessages={['this field is required']}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="E-mail"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={user.email}
                                onChange={this.handleChange}
                                errorMessages={['this field is required', 'Podano nieprawidłowy adres e-mail']}
                                validators={['required', 'isEmail']}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                label="Hasło"
                                required
                                fullWidth
                                variant="outlined"
                                type={passwordIsMasked ? 'password' : 'text'}
                                {...this.props}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <RemoveRedEye
                                                className={classes.eye}
                                                onClick={this.togglePasswordMask}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                name="password"
                                value={user.password}
                                onChange={this.handleChange}
                                errorMessages={['this field is required']}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Powtórz hasło"
                                variant="outlined"
                                name="repeatPassword"
                                value={user.repeatPassword}
                                type={passwordIsMasked ? 'password' : 'text'}
                                {...this.props}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <RemoveRedEye
                                                className={classes.eye}
                                                onClick={this.togglePasswordMask}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={this.handleChange}
                                errorMessages={['Podane hasła są różne', 'this field is required']}
                                validators={['isPasswordMatch', 'required']}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Imię"
                                name="name"
                                autoComplete="given-name"
                                value={user.name}
                                onChange={this.handleChange}
                                errorMessages={['this field is required']}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Nazwisko"
                                name="last_name"
                                autoComplete="family-name"
                                value={user.last_name}
                                onChange={this.handleChange}
                                errorMessages={['this field is required']}
                                validators={['required']}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <SelectValidator
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Kraj"
                                name="country"
                                autoComplete="country-name"
                                value={user.country}
                                onChange={this.handleChange}
                                errorMessages={['this field is required']}
                                validators={['required']}
                                >
                                {
                                    Countries && Countries.map(country => {
                                        return <MenuItem key={country.name_pl} value={country.name_pl}>
                                            {country.name_pl}</MenuItem>
                                    })
                                }
                            </SelectValidator>
                        </Grid>
                        <Grid item xs>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="birth_date"
                                label="Data urodzenia"
                                type="date"
                                id="date"
                                autoComplete="bday"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.handleChange}
                                validators={['required']}
                                value={user.birth_date}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs></Grid>
                        <Grid item xs={6}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="human_validator"
                                label={text}
                                onChange={this.handleChange}
                                validators={['required']}
                                errorMessages={['Podany wynik jest nieprawidłowy! Spróbuj ponownie', 'this field is required']}
                                value={user.human_validator}
                            />
                        </Grid>
                        <Grid item xs></Grid>
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Zarejestruj się</Button>

                </ValidatorForm>
                <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
            </Container>
        );
    }
}

export default withStyles(useStyles)(Register)
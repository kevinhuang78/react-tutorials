import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { tryLogin } from "../../actions/auth";
import AppLayout from '../../layouts/AppLayout';
import LogInForm from "../../components/Credentials/LogInForm";
import {withRouter} from "react-router";

class LoginScreen extends Component {

    constructor(props)
    {
        super(props);
        document.title = "Moongano - Log in";
    }

    render() {
        return(
            <AppLayout>
                { // If I'm connected as a user, I don't want to see signUp Screen
                    this.props.auth.user
                        ? <Redirect to={{
                            pathname: this.props.location.afterAuthPath ? this.props.location.afterAuthPath : '/',
                            state: {from: this.props.location}
                          }}/>
                        : <div className="wrapper">
                            <div className="inner">
                                <div className="register__domainLogo">
                                    Image
                                </div>
                                <LogInForm
                                    enabledUserEmail={this.props.auth.confirmUserSuccess}
                                    submit={(form) => this.props.tryLogin(form)}
                                    error={this.props.auth.loginError}
                                  />
                            </div>
                          </div>

                }
            </AppLayout>
        );
    }
}

const mapStateToProps = (state) => ({
    auth : state.auth
});

const mapDispatchToProps = {
    tryLogin
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginScreen));
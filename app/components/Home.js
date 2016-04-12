import React from 'react'
import { Link, hashHistory } from 'react-router'
import Rebase from 're-base'
import Info from './Info'
import ErrorCode from './Register/ErrorCode'
import UserForm from './Register/UserForm'

const base = Rebase.createClass('https://30day.firebaseio.com');

export default class Home extends React.Component {
    constructor( props ){
        super(props)
        this.state = {
            errorText: ""
        }
    }
    componentWillMount() {
        base.onAuth( this.authCallback.bind( this ) )
    }
    authCallback( authData ) {
        if ( authData && authData.auth ) {
            const path = "/challenge/" + authData.uid + "?token="+authData.token;
            hashHistory.replace(path);
        }
    }
    userLogin( username, password ){
        base.authWithPassword({
          email    : username,
          password : password
        }, this.authHandler.bind(this));
    }
    errorHandler ( error ) {
        switch (error.code) {
          case "EMAIL_TAKEN":
            this.setState({ errorText: "This email is already in use." });
            break;
          case "INVALID_EMAIL":
            this.setState({ errorText: "The specified email is not a valid email." });
            break;
          case "INVALID_USER":
            this.setState({ errorText: "Account with supplied email not found"});
            break;
        }
    }
    authHandler( error, authData ) {
        if ( error ) {
            this.errorHandler(error);
        }
    }
    render() {
        return (
            <div className="home">
                <div className="home-section">
                    <div className="container">
                        <div className="col-sm-12">
                        <div className="col-sm-6">
                            { this.state.errorText  && <ErrorCode errorCode={ this.state.errorText } /> }
                            <UserForm handleUserForm={this.userLogin.bind( this )} buttonText="Login"/>
                             <p style={{paddingTop: 10}}>
                                <Link to="/register">Not a user? Sign up and start the challenge today!</Link>
                            </p>
                            <p style={{paddingTop: 10}}>
                                <Link to="/reset">Forgot Password!</Link>
                            </p>
                        </div>
                        <div className="col-sm-6">
                            <h2 className="text-center">Track your challenge's progress</h2>
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/94518/pushups.jpg" className="center-block img-responsive"/>
                        </div>
                        </div>
                    </div>
                    
                </div>
                <Info />
            </div>
        )
    }
}

Home.propTypes = {
    history: React.PropTypes.object.isRequired
}
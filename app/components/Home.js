import React from 'react'
import { Link, hashHistory } from 'react-router'
import Rebase from 're-base'
import ErrorCode from './Form/ErrorCode'
import UserForm from './Form/UserForm'

const base = Rebase.createClass('https://30day.firebaseio.com');

class Home extends React.Component {
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
                            <h2 className="text-center">Login to continue tracking your progress</h2>
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/94518/pushups.jpg" className="center-block img-responsive"/>
                        </div>
                        </div>
                    </div>
                    
                </div>
                <div className="info-section">
                 <div className="container">
                 <div className="col-sm-12" style={{marginTop: 30, paddingBottom: 100}}>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                     </div>
                </div>
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    history: React.PropTypes.object.isRequired
}

export default Home
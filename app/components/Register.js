import React from 'react'
import Router from 'react-router'
import Rebase from 're-base'
import UserForm from './UserForm'
import userData from './../utils/helpers'

const base = Rebase.createClass('https://githob.firebaseio.com/');

class Register extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                error: false
            }
        }

        errorHandler(error) {
            switch (error.code) {
                case "EMAIL_TAKEN":
                    this.setState({ error: "This email is already in use." });
                    break;
                case "INVALID_EMAIL":
                    this.setState({ error: "The specified email is not a valid email." });
                    break;
                default:
                    this.setState({ error: "Error creating user:" + error });
                    break;
            }
        }
        userHandler(err, userdata) {

        }
        handleSubmit(email, password) {
            base.createUser({
                email: email,
                password: password
            }, function ( error, userData ) {
                if (error) {
                    this.errorHandler(error)
                } else {
                    // user creation successfull, create initial user data fields 
                    // navigate to challenge once posted
                    const emptyEntries = userData();
                    base.post(`${userData.uid}`, {
                        data: challengeData,
                        then() {
                            const path = `challenge/${userData.uid}`;
                            Router.browserHistory.push(path);
                        }
                    });
                }
            }.bind( this ));
        }
        render() {
            return ( 
                <div className = "register">
                    <div className = "col-sm-12 text-center"> 
                    {this.state.error && <label className = "text-danger" style={{ paddingLeft: 10 }}> {this.state.error} </label> } 
                    <UserForm handleUserForm = { this.handleSubmit.bind(this) } buttonText="Register" />
                    </div> 
                </div>
            )
        }
    }

    Register.propTypes = {
        history: React.PropTypes.object.isRequired
    }

export default Register

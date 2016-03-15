import React from 'react'
import { Link, Router, hashHistory } from 'react-router'
import Rebase from 're-base'
import UserForm from './UserForm'
import userEntries from './../../utils/helpers'


const base = Rebase.createClass('https://30day.firebaseio.com/');

class Register extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                error: false,
                uid: "",
                name: "",
                token: ""
            }
        }

        getName (nameRef) {
            this.setState({ name: name.value });
        }

        errorHandler(error) {
            switch (error.code) {
                case "EMAIL_TAKEN":
                    this.setState({ error: "Email address is already registered." });
                    break;
                case "INVALID_EMAIL":
                    this.setState({ error: "The specified email is not a valid email." });
                    break;
                default:
                    this.setState({ error: "Error creating user:" + error });
                    break;
            }
        }
        responseHandler ( error, userData ){
            var selfie = this;
            if (error) {
                    this.errorHandler(error)
                } else {
                // user creation successfull, create initial user data fields 
                // navigate to challenge once posted
                // const challengeData = getChallengeData();
                const initialData = userEntries();
                this.getName();
                if (this.state.name) {
                    Object.assign(initialData, {"name": this.state.name});
                }
                base.post(`${userData.uid}`, {
                    data: initialData,
                    then() {
                        selfie.successHandler()
                    }
                });
            }
        }
        successHandler () {
            const userAuth = base.getAuth();
            const el = document.getElementById("register");
            this.setState({ uid: userAuth.uid, token: userAuth.token });
            el.className += " closed";
        }
        navigateChallenge (e) {
            e.preventDefault();
            e.stopPropagation();
            const path = "challenge/" + this.state.uid + "?token="+ this.state.token;
            hashHistory.replace(path);
        }
        handleSubmit(email, password) {
            base.createUser({
                email: email,
                password: password
            }, this.responseHandler.bind( this ) );
        }
        render() {
            return ( 
                <div className="register">
                    <div id="register" className="login">
                        <div className="col-md-3 col-sm-3"></div>
                        <div className="col-md-6 col-sm-6 registration-box" style={{ padding:30}}>
                            {this.state.error && <label className = "text-danger" style={{ paddingLeft: 10 }}> {this.state.error} </label> }
                            <div className="form-group">
                                <label>Name <span className="optional-field">**optional</span></label>
                            <input type="text" placeholder="Username" className="form-control" nameRef={(name) => this.getName(name)} />
                            </div>
                            <UserForm handleUserForm={this.handleSubmit.bind( this )} buttonText="Register" className="text-center" />
                            <p style={{paddingTop: 10}}>Have an account already? <Link to="/">Log in?</Link></p>
                        </div>
                        <div className="col-md-3 col-sm-3"></div>
                    </div> 
                    <p className="login-under">Account Creation Successfull!!<br /> <a onClickCapture={this.navigateChallenge.bind( this )} href="#">Get Started</a></p>
                </div>
            )
        }
    }

    Register.propTypes = {
        history: React.PropTypes.object.isRequired
    }

export default Register

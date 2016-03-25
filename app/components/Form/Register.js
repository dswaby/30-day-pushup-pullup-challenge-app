import React from 'react'
import { Link, Router, hashHistory } from 'react-router'
import Rebase from 're-base'
import UserForm from './UserForm'
import userEntries from './../../utils/helpers'
import Loader from './../Challenge/Loader'
import ExerciseSelector from './ExerciseSelector'

const base = Rebase.createClass('https://30day.firebaseio.com/');

class Register extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                loading: false,
                error: false,
                uid: "",
                name: "",
                token: ""
            }
            // base.onAuth( this.authDataCallback.bind(this) );
            this.exercises = {};
        }

        getName(nameRef){
            this.name = nameRef;

        }

        authDataCallback(authData){
            if (authData) {
                this.uid = authData.uid;
                this.token = authData.token;
            }
            else {
                console.log( "user is not  logged in ")
            }
        }

        errorHandler(error) {
            switch (error.code) {
                case "EMAIL_TAKEN":
                    this.setState({ loading: false, error: "Email address is already registered." });
                    break;
                case "INVALID_EMAIL":
                    this.setState({ loading: false, error: "The specified email is not a valid email." });
                    break;
                default:
                    this.setState({ loading: false, error: "Error creating user:" + error });
                    break;
            }
        }
        responseHandler ( error, userData ){
            const selfie = this;
            const name = this.name.value;
            const data = userData;
            if ( error ) {
                this.setState({ loading: false })
                this.errorHandler( error )
            } else {
                // user creation successfull, create initial user data fields 
                // navigate to challenge once posted
                const opts = Object.assign( {} ,this.exercises );


                const initialData = userEntries( opts );

                if (name) {
                    initialData.name = name;
                }

                base.post(`challenge/${userData.uid}`, {
                    data: initialData,
                    then() {
                        selfie.successHandler( data )
                    }
                });
            }
        }
        successHandler ( signupData ) {
            const userAuth = base.getAuth();
            const el = document.getElementById("register");
            this.uid = signupData.uid;
            // this.token = userAuth.token;
            el.className += " closed";
        }
        navigateChallenge (e) {
            e.preventDefault();
            e.stopPropagation();
            const path = "/";
            hashHistory.replace(path);
        }
        handleSubmit(email, password) {
            var name = this.name.value;
            this.setState({ loading: true })
            base.createUser({
                email: email,
                password: password
            }, this.responseHandler.bind( this ));
        }
        updateExercises(exerciseId, enabled, count) {
            this.exercises[exerciseId] = {
                enabled: enabled,
                count: count
            }
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
                                <input type="text" placeholder="Username" className="form-control" ref={(nameRef) => this.getName( nameRef )} />
                            </div>
                            <ExerciseSelector exerciseName="Push Ups" defaultNumber="300" updateExercise={this.updateExercises.bind( this ) } />
                            <ExerciseSelector exerciseName="Pull Ups" defaultNumber="200" updateExercise={this.updateExercises.bind( this ) } />
                            {this.state.loading && !this.state.error && <Loader /> }
                            {!this.state.loading && <UserForm handleUserForm={this.handleSubmit.bind( this )} buttonText="Register" className="text-center" />}
                            <p style={{paddingTop: 10}}>Have an account already? <Link to="/">Log in?</Link></p>
                        </div>
                        <div className="col-md-3 col-sm-3"></div>
                    </div> 
                    <p className="login-under">Account Creation Successfull!!<br /> <a onClickCapture={this.navigateChallenge.bind( this )} href="#">Log in and Get Started</a></p>
                </div>
            )
        }
    }

    Register.propTypes = {
        history: React.PropTypes.object.isRequired
    }

export default Register

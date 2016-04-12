import React from 'react'
import { Link, Router, hashHistory } from 'react-router'
import Rebase from 're-base'
import UserForm from './UserForm'
import userEntries from './../../utils/helpers'
import Loader from './../Common/Loader'
import ExerciseSelector from './ExerciseSelector'
import RegistrationSummary from './RegistrationSummary'

const base = Rebase.createClass('https://30day.firebaseio.com/');

class Register extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                loading: false,
                error: false,
                uid: "",
                name: "",
                token: "",
                squats: {
                    enabled: false,
                    count:0,
                    frequency: "daily",
                    startDayOf: true
                },
                pushups: {
                    enabled: false,
                    count:0,
                    frequency: "daily",
                    startDayOf: true
                },
                pullups: {
                    enabled: false,
                    count:0,
                    frequency: "daily",
                    startDayOf: true
                },
                empty: true
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
                const opts = Object.assign( {} , {
                    pullups: this.state.pullups,
                    pushups: this.state.pushups,
                    squats: this.state.squats
                } );

                const initialData = userEntries( opts );

                if (name) {
                    initialData.options.name = name;
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
            const el = document.getElementById("form-wrap");
            this.uid = signupData.uid;
            el.className += " closed";
        }
        navigateChallenge ( e ) {
            e.preventDefault();
            e.stopPropagation();
            const path = "/";
            hashHistory.replace(path);
        }
        handleSubmit( email, password ) {
            var name = this.name.value;
            this.setState({ loading: true })
            base.createUser({
                email: email,
                password: password
            }, this.responseHandler.bind( this ));
        }
        updateExercises( exercise ) {
            if ( this.state.empty ) {
                this.setState({ empty: false })
            }
            this.exercises[exercise.id] = {
                enabled: exercise.enabled,
                count: exercise.count,
                frequency: exercise.frequency
            }

            var exerciseOpts = {
                enabled: exercise.enabled, 
                count: exercise.count,
                frequency: exercise.frequency,
                startDayOf: exercise.startDayOf
            };

            switch ( exercise.id ) {
                case "pushups":
                    if ( this.state.pushups !== exerciseOpts )  {
                        this.setState({ pushups: exerciseOpts });
                    }
                    break;
                case "pullups":
                    if ( this.state.pullups !== exerciseOpts )  {
                        this.setState({ pullups: exerciseOpts });
                    }
                    break;
                case "squats":
                    if ( this.state.squats.enabled !== exerciseOpts )  {
                        this.setState({ squats: exerciseOpts })
                    }
                    break;
                default: 
                    // this should not be called without exercise information
                    // break shit if it is
                    throw new Error("updateExercises being called unecessarily")
                    break;
            }
        }
        render() {
            return (
                <div className="registration">
                    <div id="form-wrap" className="reg-wrap">
                        <h1 className="white-text">Create your 30-Day-Challenge Account</h1>
                        <div className="register">
                            <div id="register" className="login">
                                <div className="registration-box" >
                                    {this.state.error && <label className = "text-danger" style={{ paddingLeft: '10px' }}> {this.state.error} </label> }
                                    <div className="form-group">
                                        <label>Name <span className="optional-field">**optional</span></label>
                                        <input type="text" placeholder="Username" className="form-control" ref={(nameRef) => this.getName( nameRef )} />
                                    </div>
                                    <h3> Choose Exercises </h3>
                                    <ExerciseSelector 
                                        img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/94518/pushup.jpg" 
                                        exerciseName="Push Ups" 
                                        defaultNumber="300" 
                                        updateExercise={this.updateExercises.bind( this ) }
                                        checked={ false }
                                        frequency="daily"
                                    />
                                    <ExerciseSelector 
                                        img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/94518/pullup.jpg" 
                                        exerciseName="Pull Ups" 
                                        defaultNumber="200" 
                                        updateExercise={this.updateExercises.bind( this ) } 
                                        checked={ false }
                                        frequency="daily"
                                    />
                                    <ExerciseSelector 
                                        img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/94518/squats.jpg" 
                                        exerciseName="Squats" 
                                        defaultNumber="200" 
                                        updateExercise={this.updateExercises.bind( this ) } 
                                        checked={ false }
                                        frequency="daily"
                                    />
                                    <div className="challenge-summary">
                                        <h3>Challenge Summary</h3>
                                        <RegistrationSummary />

                                         { /* this is gross, TODO: find a more eloquent way to intergrate this logic*/
                                            this.state.empty && 
                                            <em>Please select some exercises for your challenge</em> 
                                        }
                                        {
                                            !this.state.empty &&
                                            <div className="helper-txt">Note: You can modify these later in settings</div>
                                        }

                                        { 
                                        this.state.pushups.enabled && 
                                            <p>{ this.state.pushups.count } pushups
                                                {this.state.pushups.frequency === "daily" && <span> daily </span> }
                                                {this.state.pushups.frequency === "everyOtherDay" && <span> every other day </span>
                                            }</p>}
                                        {   
                                        this.state.pullups.enabled && 
                                            <p>{ this.state.pullups.count } pullups 
                                                {this.state.pullups.frequency === "daily" && <span> daily </span> }
                                                {this.state.pullups.frequency === "everyOtherDay" && <span> every other day </span>
                                            }</p>
                                        }
                                        { 
                                        this.state.squats.enabled && 
                                            <p>{ this.state.squats.count } squats
                                            {this.state.squats.frequency === "daily" && <span> daily </span> }
                                            {this.state.squats.frequency === "everyOtherDay" && <span> every other day </span> 
                                            }</p>
                                        }
                                        {
                                            !this.state.empty &&
                                            <p>for the next 30 days. </p>
                                        }
                                    </div>
                                    {this.state.loading && !this.state.error && <Loader /> }
                                    {!this.state.loading && 
                                        <UserForm 
                                            handleUserForm={this.handleSubmit.bind( this )} 
                                            buttonText="Create Account" 
                                            className="text-center"
                                        />}
                                    <p style={{paddingTop: 10}}>
                                        Have an account already? 
                                        <Link to="/">Log in?</Link>
                                    </p>
                                </div>
                                <div className="col-md-3 col-sm-3"></div>

                            </div> 
                            <p className="login-under">Account Creation Successfull!!<br /> <a onClickCapture={this.navigateChallenge.bind( this )} href="#">Log in and Get Started</a></p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    Register.propTypes = {
        history: React.PropTypes.object.isRequired
    }

export default Register

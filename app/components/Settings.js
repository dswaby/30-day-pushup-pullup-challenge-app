import React from 'react'
import Rebase from 're-base'
import ExerciseSelector from './Register/ExerciseSelector'

const base = Rebase.createClass('https://30day.firebaseio.com');

class Settings extends React.Component {
	constructor( props ){
		super(props)
		this.state = {
            loggedIn: false,
            options: {
                name: "",
                challengeStart: 0,
                challengeEnd: 0,
                pushups: {
                    enabled: false,
                    count: 0
                },
                pullups: {
                    enabled: false,
                    count: 0
                },
                squats: {
                    enabled: false,
                    count: 0
                }
            }
        }
	}
	componentWillMount(){
		base.onAuth( this.authCallback.bind( this ) )
	}
	componentWillUnmount() {
        base.removeBinding(this.ref)
    }
	authCallback( authData ){
		if ( authData && authData.auth ) {
    		this.setState({ loggedIn: true })
            this.setState({ uid: authData.uid })
            this.init( this.state.uid )
    	}
        else {
            this.setState({ loggedIn: false })
        }
	}
	init( uid ) {
		const authData = base.getAuth();
        if (!authData) {
            const path = "/" ;
            hashHistory.replace(path);
        }
        this.ref = base.bindToState(`challenge/${uid}/options`, {
            context: this,
            asArray: false,
            state: 'options'
        });
	}

	updateExercises(exercise) {
            this.exercises[exercise.id] = {
                enabled: exercise.enabled,
                count: exercise.count,
                frequency: exercise.frequency
            }

            switch ( exercise.id ) {
                case "pushups":
                    if ( this.state.pushups !== exercise.enabled  || 
                        this.state.pushupsCount !== exercise.count ||
                        this.state.pushupsFrequency !== exercise.frequency )  {
                        this.setState({ 
                            pushups: exercise.enabled, 
                            pushupsCount: exercise.count, 
                            pushupsFrequency: exercise.frequency 
                        })
                    }
                    break;
                case "pullups":
                    if ( this.state.pullups !== exercise.enabled  ||
                        this.state.pullupsCount !== exercise.count ||
                        this.state.pullupsFrequency !== exercise.frequency )  {
                        this.setState({ 
                            pullups: exercise.enabled, 
                            pullupsCount: exercise.count,
                            pullupsFrequency: exercise.frequency
                        })
                    }
                    break;
                case "squats":
                    if ( this.state.squats !== exercise.enabled ||
                        this.state.squatsCount !== exercise.count ||
                        this.state.squatsFrequency !== exercise.frequency )  {
                        this.setState({ 
                            squats: exercise.enabled, 
                            squatsCount: exercise.count,
                            squatsFrequency: exercise.frequency
                        })
                    }
                    break;
                default: 
                    console.log("fall through")
                    break;
            }
        }
	render(){
    	return (
        	<div className="settings">
	           	<h1>Settings</h1>
	           	<div className="col-sm-12">
	           		 <ExerciseSelector 
	                    img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/94518/pushup.jpg" 
	                    exerciseName="Push Ups" 
	                    defaultNumber={this.state.options.pushups.count || 300}
	                    updateExercise={this.updateExercises.bind( this ) }
	                    checked={this.state.options.squats.enabled }
	                />
	                <ExerciseSelector 
	                    img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/94518/pushup.jpg" 
	                    exerciseName="Pull Ups" 
	                    defaultNumber={this.state.options.pullups.count || 200} 
	                    updateExercise={this.updateExercises.bind( this ) } 
	                    checked={this.state.options.pullups.enabled }
	                />
	                <ExerciseSelector 
	                    img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/94518/pushup.jpg" 
	                    exerciseName="Squats" 
	                    defaultNumber={this.state.options.pullups.count || 200} 
	                    updateExercise={this.updateExercises.bind( this ) } 
	                    checked={this.state.options.squats.enabled }
	                />
	           	</div>
        	</div>
    	)
	}
}

export default Settings

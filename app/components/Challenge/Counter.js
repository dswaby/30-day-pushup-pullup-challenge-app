import React from 'react'
import Button from './Button'
import { todaysIndex } from './../../utils/helpers'

class Counter extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
        	goalCompleted: false,
        	intensity: "icon-frustrated"
        }
    }
    calculateIntensity() {
    	var counterGoal;
    	var goalPercentage;

    	if (this.props.countType === "Push Ups") {
    		counterGoal = 300;
    	}
    	else if (this.props.countType === "Pull Ups") {
    		counterGoal = 200;
    	}

		goalPercentage = Math.ceil((this.props.count)/counterGoal * 100);

		if (goalPercentage <= 5) {
			this.setState( { intensity: "icon-neutral" } )
		}
		else if (goalPercentage > 6 && goalPercentage < 40) {
			this.setState( { intensity: "icon-wondering" } )
		}
		else if (goalPercentage > 40 && goalPercentage < 75) {
			this.setState( { intensity: "icon-frustrated" } )
		}
		else if (goalPercentage >= 75 ) {
			this.setState( { intensity: "icon-happy" } )
			if (goalPercentage >= 100) {
				this.setState( { goalCompleted: true } );
			}
		}
    }
    componentWillMount(){
    	this.calculateIntensity()
    }
    componentWillReceiveProps(){
    	this.calculateIntensity()
    }
	render() {
		return (
			<div className="counter">
				{this.state.goalCompleted && <h1 className="success">Todays {this.props.countType} Goal reached!</h1>}
				{this.props.image && <img src={this.props.img} />}
				<h2>{ this.props.count } {this.props.countType}<br /><p></p></h2>
				<Button incrementBy="5" countType={ this.props.countType } updateCount={ this.props.updateCount } count={ this.props.count }/>
				<p className="icomoon"> <span className={this.state.intensity}></span></p>
			</div>
		)
	}
}

Counter.propTypes = {
	count: React.PropTypes.number.isRequired,
	updateCount: React.PropTypes.func.isRequired,
	countType: React.PropTypes.string.isRequired
}

export default Counter
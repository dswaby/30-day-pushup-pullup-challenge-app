import React from 'react'
import Button from './Button'
import { todaysIndex } from './../../utils/helpers'
var css = require("!style!css!less!./../../styles/counter.less");

class Counter extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
        	goalCompleted: false,
        	intensity: "icon-frustrated"
        }
    }
    calculateIntensity() {
    	var counterGoal = this.props.goal;
		var goalPercentage = Math.ceil((this.props.count)/counterGoal * 100);
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
		this.setState({ diff: Math.abs(this.props.goal - this.props.count )});
    }
    componentWillMount(){
    	this.calculateIntensity()
    }
    
    componentWillReceiveProps( nextProps ){
    	if (nextProps.count >= this.props.goal) {
			this.setState( { goalCompleted: true } );
		}
    	this.calculateIntensity()
    }
	render() {
		return (
			<div className="counter">
				{this.props.img && 
				<div className="col-sm-12">
					<img className="img-responsive center-block" style={{maxHeight: 100}} src={this.props.img} />
				</div>}
				{this.state.goalCompleted && 
					<h1 className="success">
						Goal reached!
					</h1>}
				<h2>{ this.props.count } of {this.props.goal} {this.props.countType}</h2>
				<Button 
					incrementBy="5" 
					countType={ this.props.countType } 
					updateCount={ this.props.updateCount } 
					count={ this.props.count }
				/>
				<p className="icomoon"> <span className={this.state.intensity}></span>
				<br />
				<em> 
				{this.props.diff !== 0 && this.state.goalCompleted && <span>{this.props.diff} above goal, way to go!</span>} 
				{this.props.diff === 0 && this.state.goalCompleted &&  <span>goal reached, great job!!!</span>}
				{!this.state.goalCompleted && <span>{this.props.diff} to reach goal</span>}
				</em>
				</p>
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
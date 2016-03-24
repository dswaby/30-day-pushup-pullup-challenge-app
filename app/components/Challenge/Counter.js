import React from 'react'
import Button from './Button'
import { todaysIndex } from './../../utils/helpers'

class Counter extends React.Component {
	// constructor(props) {
 //        super(props)
 //    }
	render() {
		return (
			<div className="counter">
				{this.props.image && <img src={this.props.img} />}
				<h2>{ this.props.count } {this.props.countType}<br />completed today</h2>
				<Button incrementBy="5" countType={ this.props.countType } updateCount={ this.props.updateCount } count={ this.props.count }/>
				<p> TODO - add intensity level icon here </p>
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
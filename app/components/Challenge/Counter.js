import React from 'react'
import Button from './Button'
import { todaysIndex } from './../../utils/helpers'

class Counter extends React.Component {
	render() {
		return (
			<div>
				<Button incrementBy="5" countType={ this.props.countType } updateCount={ this.props.updateCount } count={ this.props.counts[this.props.index] }/>
				<h3>{ this.props.counts[this.props.index] } {this.props.countType}<br />completed today</h3>
				<p> TODO - add intensity level icon here </p>
			</div>
		)
	}
}

Counter.propTypes = {
	counts: React.PropTypes.array.isRequired,
	index: React.PropTypes.number.isRequired,
	updateCount: React.PropTypes.func.isRequired,
	countType: React.PropTypes.string.isRequired
}

export default Counter
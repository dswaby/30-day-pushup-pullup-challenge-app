import React from 'react'
import Button from './Button'

class Count extends React.Component {
	render() {
		return (
			<div className="count">
				<h3>{this.props.count}</h3>
				<Button
					updateCount={this.props.updateCount}
					countType={this.props.countType}
					count={this.props.count}
				/>
			</div>
		)
	}
}

// Count.propTypes = {
// 	count: React.PropTypes.string.isRequired
// }

export default Count
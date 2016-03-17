import React from 'react'

class Button extends React.Component {
	constructor( props ) {
		super( props )
		this.state = {
            count: 0
        }
	}
	handleSubmit( increment ) {
		var newCount = this.state.count + increment;
		// clear form
		this.props.updateCount(newCount, this.props.countType);
	}
	setRef(ref) {
		this.count = ref || 0;
	}
	render() {
		return (
			<div className="input-group-btn">
				<button className="btn btn-default" type="button" onClick={() => this.handleSubmit( 5 )}>
					Add 5 { this.props.countType }
				</button>
			</div>
		)
	}
}

Button.propTypes = {
	updateCount: React.PropTypes.func.isRequired,
	countType: React.PropTypes.string.isRequired
}

export default Button
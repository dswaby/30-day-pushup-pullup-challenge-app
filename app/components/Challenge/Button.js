import React from 'react'

class Button extends React.Component {
	constructor( props ) {
		super( props )
		this.state = {
            count: 0
        }
	}
	componentWillMount() {
		this.setState({ count: this.props.count });
	}
	handleSubmit( increment ) {
		var newCount = this.state.count + increment;
		this.setState({ count: newCount });
		// clear form
		this.props.updateCount(newCount, this.props.countType);
	}
	setRef(ref) {
		this.count = ref || 0;
	}
	shouldComponentUpdate() {
		return this.state.count === this.props.count
	}
	render() {
		return (
			<div className="input-group-btn">
				<button className="btn btn-default btn-lg btn-dig-blue" type="button" onClick={() => this.handleSubmit( 5 )}>
					Add 5 { this.props.countType }
				</button>
			</div>
		)
	}
}

Button.propTypes = {
	count: React.PropTypes.number.isRequired,
	updateCount: React.PropTypes.func.isRequired,
	countType: React.PropTypes.string.isRequired
}

export default Button
import React from 'react'

class Button extends React.Component {
	constructor() {
		super()
	}
	handleSubmit() {
		var newCount = this.count.value || count + 5;
		// clear form
		this.count.value = "";
		// calls the function that was defined in Profile.js and passed using props
		this.props.updateCount(newCount, this.props.countType);
	}
	setRef(ref) {
		this.count = ref || 0;
	}
	render() {
		return (
			<div className="input-group">
				<span className="input-group-btn">
					<button className="btn btn-default" type="button" onClick={() => this.handleSubmit(5)}>
						Add 5
					</button>
				</span>
				<input type="text" className="form-control" placeholder="Set Counter" ref={(ref) => this.setRef(ref)} />
				<span className="input-group-btn">
					<button className="btn btn-default" type="button" onClick={() => this.handleSubmit()}>
						Set Count
					</button>
				</span>
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
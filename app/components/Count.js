import React from 'react'


const Count = ({ count }) => {
	return (
		<div className="count">
			{count}
		</div>
	)
}

Count.propTypes = {
	count: React.PropTypes.string.isRequired
}

export default Count
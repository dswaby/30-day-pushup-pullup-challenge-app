import React from 'react'

const ErrorCode = ({errorCode}) => {
	return (
		<p><label className="text-danger" style={{paddingLeft:10}}>{errorCode}</label></p>
	)
}

ErrorCode.propTypes = {
	errorCode: React.PropTypes.string.isRequired
}
	
export default ErrorCode
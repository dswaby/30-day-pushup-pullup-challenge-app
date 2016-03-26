import React from 'react'
import Rebase from 're-base'
import C3 from 'c3'

var css = require("!style!css!less!./../styles/c3.less");
const base = Rebase.createClass('https://30day.firebaseio.com/');

class ProgressSummary extends React.Component {
	constructor(props) {
        super(props)
    }

    componentWillMount(){

    }
    
    createDates(){

    }

    componentWillReceiveProps( nextProps ){
    	
    }
	render() {
		return (
			<div className="progress-summary">
				
			</div>
		)
	}
}

export default ProgressSummary
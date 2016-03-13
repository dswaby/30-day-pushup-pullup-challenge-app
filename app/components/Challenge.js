import React from 'react'
import Counters from './Counters'
import {verifyUser} from '../utils/helpers'

class Challenge extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        console.log("will",this.props)
    }
    componentDidMount() {
		this.init("did",this.props.username);
	}
	init(username){
		
	}
    render() {
    	return (
    		<div className="text-center">
    			<h2>{this.props.params.username}'s progress</h2>
    			<Counters username={this.props.params.username} />
    		</div>
    	)
    }
}


export default Challenge

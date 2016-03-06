import React from 'react'
import verifyUser from './../utils/helpers'
import Counter from './Counter'

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
    			<h2>30 Day Push-Up/Pull-Up challenge for {this.props.params.username}</h2>
    			<Counter countType="pull-ups" username={this.props.params.username} />
    			<Counter countType="push-ups" username={this.props.params.username} />
    		</div>
    	)
    }
}


export default Challenge

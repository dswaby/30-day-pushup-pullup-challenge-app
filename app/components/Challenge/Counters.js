import React from 'react'
import Count from './Count'



const today = new Date();

class Counter extends React.Component {
	// use constructor to set state instead of getInitialState
	constructor( props ){
		super(props)
	}
	init( username ) {
		
        this.setState({ docLookup: today.getMonth() + "-" + today.getDate() + "-" + today.getFullYear() });
	}
	componentWillMount() {
		console.log("component will mount", this.props)
	}
	componentDidMount() {
		this.init(this.props.username);
	}
	componentWillReceiveProps( nextProps ) {
		base.removeBinding(this.ref)
		this.init(nextProps.username)
	}
	componentWillUnmount() {
		base.removeBinding(this.ref)
	}
	handleUpdateCount( newCount, countType ) {
		const data = Object.assign(this.props.counts[countType], { docLookup: newCount });
	}

	render() {
		return (
			<div className="row">
		        <div className="col-md-4">
		         	<Count
		         		username={this.props.username} 
		         		count="99"
		         		updateCount={this.handleUpdateCount}
		         		countType="push-ups"
		         	/>
		         	<Count
		         		username={this.props.username}
		         		count="99"
		         		updateCount={this.handleUpdateCount}
		         		countType="pull-ups"
		         	/>
		        </div>
		    </div>
		)
	}
}

export default Counter
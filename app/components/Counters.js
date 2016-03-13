import React from 'react'
import Rebase from 're-base'
import Count from './Count'


const base = Rebase.createClass('https://30day.firebaseio.com/');
const today = new Date();

class Counter extends React.Component {
	// use constructor to set state instead of getInitialState
	constructor( props ){
		super(props)
	}
	init( username ) {
		this.ref = base.bindToState(this.props.username, {
			context: this,
			asArray: false,
			state: this.props.countType
		})
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
		base.post( this.props.username + "/" + countType, {
			data: data
		})
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
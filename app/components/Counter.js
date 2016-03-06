import React from 'react'
import Rebase from 're-base'
import Count from './Count'

const base = Rebase.createClass('https://30day.firebaseio.com/')

class Counter extends React.Component {
	// use constructor to set state instead of getInitialState
	constructor( props ){
		super(props)
		console.log(props)
		this.state = {
			pullUps: []
		}
	}
	init( username ) {
		this.ref = base.bindToState(this.props.username, {
			context: this,
			asArray: false,
			state: this.props.countType
		})
	}

	updateCount( count ) {
		base.post(this.props.username, {
			data: this.state.count.concat([newCount])
		})
	}

	componentWillMount() {
		console.log(this.props)
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
	handleUpdateCount( newCount ) {
		// add new note to firebase
		base.post( this.props.username + "/" + this.props.countType, {
			data: this.state.count.concat([newCount])
		})
	}
	render() {
		return (
			<div className="row">
		        <div className="col-md-4">
		         	<Count
		         		username={this.props.username} 
		         		count="99"
		         		updateCount={(newCount) => this.handleUpdateCount(newCount)}/>
		        </div>
		      </div>
		);
	}
}

export default Counter
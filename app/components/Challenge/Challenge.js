import React from 'react'
import Counters from './Counters'
import Rebase from 're-base'
import { todaysIndex } from './../../utils/helpers'

const base = Rebase.createClass('https://30day.firebaseio.com/');

class Challenge extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ""
        }
    }

    componentDidMount() {
    }

    componentWillMount() {
        this.uid = this.props.params.uid;
        console.log(this.uid)
        this.ref = base.bindToState(this.uid, {
            context: this,
            asArray: false,
            state: this.props.countType
        })
	}

    updateCount ( newCount ){

    }
	init (){
		
	}
    render() {
    	return (
    		<div className="text-center">
    			{this.state.name && <h2>{this.props.name}'s progress</h2>}
    			<Counters username={this.props.params.username} />
    		</div>
    	)
    }
}


export default Challenge

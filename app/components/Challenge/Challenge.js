import React from 'react'
import Counter from './Counter'
import Rebase from 're-base'
import Loader from './Loader'
import { hashHistory } from 'react-router'
import { todaysIndex } from './../../utils/helpers'

const base = Rebase.createClass('https://30day.firebaseio.com/');

class Challenge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            challengeDay: 0,
            loading: true,
            dateString: "",
            counts: {
                challengeStart: 0,
                name: "",
                pushups: [],
                pullups: []
            }
        }
    }

    componentDidMount() {
        const today = new Date();
        this.setState({ dateString: today.toDateString() });
        const query = this.props.location.query;
        this.UID = this.props.params.uid;
        if (query.token) {
            this.AUTH_TOKEN = query.token;
        }
        base.fetch( `challenge/${this.UID}`, {
            context: this,
            asArray: false,
            then( data ){
                var index = todaysIndex( data.challengeStart );
                if ( data.name ) { this.setState({ name: data.name })}
                this.setState({ index: index, loading: false, challengeDay: index + 1 });
                this.init( this.UID );
            }
          });
        
    }

	init ( uid ) {
        const authData = base.getAuth();
        if (!authData) {
            const path = "/" ;
            hashHistory.replace(path);
        }
        base.bindToState(`challenge/${uid}`, {
            context: this,
            asArray: false,
            state: 'counts'
        });
	}



    updateCount ( newCount, counterFor ) {
        const i = this.state.index;
        const key = counterFor.replace(" ","").toLowerCase();
        const countsCpy = this.state.counts;
        countsCpy[key][i] = newCount;
        this.setState({ counts: countsCpy })
        base.post(`challenge/${this.UID}/${key}`, {
            data: countsCpy[key],
            then(){
               console.log("firebase updated")
            }
        });
    }

    render() {
    	return (
    		<div className="text-center">
                {this.state.loading && <Loader />}
                {this.state.error && <h1> {this.state.error} </h1>}
                {this.state.challengeDay && <h1>Day {this.state.challengeDay} of 30</h1>}
    			{this.state.name && <h2>{this.state.name}'s progress for { this.state.dateString }</h2>}
    			<div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-12 col-md-6 center-block">
                        { this.state.counts.pushups.length && <Counter
                            img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/94518/Untitled_3.jpg"
                            count={ this.state.counts.pushups[this.state.index] }
                            goal={ this.state.counts.options.pushups.count }
                            diff={this.state.counts.options.pushups.count - this.state.counts.pushups[this.state.index]}
                            countType="Push Ups" 
                            updateCount={this.updateCount.bind( this )} />}
                        </div>
                        <div className="col-sm-12 col-md-6 center-block">

                        { this.state.counts.pushups.length && <Counter
                            count={ this.state.counts.pullups[this.state.index] }
                            goal={ this.state.counts.options.pullups.count }
                            diff={this.state.counts.options.pullups.count - this.state.counts.pullups[this.state.index] }
                            countType="Pull Ups" 
                            updateCount={this.updateCount.bind( this )} /> }
                        </div>
                    </div>
                </div>
    		</div>
    	)
    }
}

export default Challenge

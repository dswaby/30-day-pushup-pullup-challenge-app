import React from 'react'
import Counter from './Counter'
import Rebase from 're-base'
import { hashHistory } from 'react-router'
import { todaysIndex } from './../../utils/helpers'

const base = Rebase.createClass('https://30day.firebaseio.com/');

class Challenge extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            index: 0,
            counts:{
                challengeStart:0, 
                pushups: [],
                pullups: []
            }
        }
    }

    componentDidMount() {
        const query = this.props.location.query;
        this.UID = this.props.params.uid;
        if (query.token) {
            this.AUTH_TOKEN = query.token;
        }
        this.init( this.UID );
    }

	init ( uid ) {
        const authData = base.getAuth();
        if (!authData) {
            const path = "/" ;
            hashHistory.replace(path);
        }
        this.ref = base.bindToState(uid, {
            context: this,
            asArray: false,
            state: 'counts',
            then() {
                var i = todaysIndex(this.state.counts.challengeStart);
                this.setState({ index: i });
            }
        });
	}

    updateCount ( newCount, counterFor ) {
        const i = this.state.index;
        const key = counterFor.replace(" ","").toLowerCase();
        const counts = this.state.counts[key].slice();
        counts[i] = newCount;

        base.post(`${this.UID}/${key}`, {
            data: counts,
            then(){
                console.log("count updated, state should be bound to firebase and dom should reflect updated state")
            }
        });
    }

    render() {
    	return (
    		<div className="text-center">
                {this.state.error && <h1> {this.state.error} </h1>}
    			{this.state.name && <h2>{this.props.name}'s progress</h2>}
    			<div className="row">
                    <div className="col-md-12">
                        <div className="col-md-3">
                        </div>
                            <div className="counter col-md-6">
                                <Counter
                                    counts={this.state.counts.pushups}
                                    countType="Push Ups" 
                                    index={ this.state.index } 
                                    updateCount={this.updateCount.bind( this )} />
                                <Counter
                                    counts={this.state.counts.pullups}
                                    countType="Pull Ups" 
                                    index={ this.state.index } 
                                    updateCount={this.updateCount.bind( this )} />
                            </div>
                        <div className="col-md-3">
                        </div>
                    </div>
                </div>
    		</div>
    	)
    }
}

export default Challenge

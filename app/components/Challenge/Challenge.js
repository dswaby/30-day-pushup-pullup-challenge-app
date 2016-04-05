import React from 'react'
import Counter from './Counter'
import Rebase from 're-base'
import Loader from './../Common/Loader'
import { hashHistory } from 'react-router'
import { todaysIndex } from './../../utils/helpers'
import Dropzone from 'react-dropzone'
import request from 'superagent'


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
                pushups: [],
                pullups: [],
                options: {
                    name: "",
                    challengeStart: 0,
                    challengeEnd: 0,
                    pushups: {
                        enabled: false
                    },
                    pullups: {
                        enabled: false
                    },
                    squats: {
                        enabled: false
                    }
                }
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
                var index = todaysIndex( data.options.challengeStart );
                if ( data.options.name ) { this.setState({ name: data.options.name })}
                this.setState({ index: index, loading: false, challengeDay: index + 1 });
                this.init( this.UID );
            }
          });
    }
    componentWillUnmount() {
        base.removeBinding(this.ref)
    }
	init ( uid ) {
        const authData = base.getAuth();
        if (!authData) {
            const path = "/" ;
            hashHistory.replace(path);
        }
        this.ref = base.bindToState(`challenge/${uid}`, {
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
    onDrop (files) {
      var req = request.post('http://localhost:3000/upload');
        files.forEach((file)=> {
            req.attach(file.name, file);
        });
        req.end(this.uploadCompleted);
    }
    uploadCompleted () {
        console.log("awwwww shit")
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
                        { this.state.counts.options.pushups.enabled && this.state.counts.pushups.length && 
                        <Counter
                            img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/94518/Untitled_3.jpg"
                            count={ this.state.counts.pushups[this.state.index] }
                            goal={ this.state.counts.options.pushups.count }
                            diff={Math.abs(this.state.counts.options.pushups.count - this.state.counts.pushups[this.state.index])}
                            countType="Push Ups" 
                            updateCount={this.updateCount.bind( this )} />
                        }
                        </div>
                        <div className="col-sm-12 col-md-6 center-block">
                            { this.state.counts.options.pullups.enabled && this.state.counts.pullups.length && 
                                <Counter
                                    img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/94518/Untitled_3.jpg"
                                    count={ this.state.counts.pullups[this.state.index] }
                                    goal={ this.state.counts.options.pullups.count }
                                    diff={Math.abs(this.state.counts.options.pullups.count - this.state.counts.pullups[this.state.index]) }
                                    countType="Pull Ups" 
                                    updateCount={this.updateCount.bind( this )} /> 
                            }
                        </div>
                    </div>
                    {this.state.photoFeatureEnabled && 
                    <div className="col-sm-12">
                        <h4>Upload Comparison Photo</h4>
                        <div className="center-block" style={{height:200, width:200}}>
                        <Dropzone onDrop={this.onDrop}>
                            <div>Try dropping some files here, or click to select files to upload.</div>
                        </Dropzone>
                        </div>
                    </div>}
                </div>
    		</div>
    	)
    }
}

export default Challenge

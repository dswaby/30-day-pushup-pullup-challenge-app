import React from 'react'
import { Link, hashHistory } from 'react-router'
import Rebase from 're-base'

const base = Rebase.createClass('https://30day.firebaseio.com');

class Menu extends React.Component {
    constructor( props ){
        super(props)
        this.state = {
            loggedIn: false
        }
    }
    componentWillMount() {
        base.onAuth( this.authCallback.bind( this ) )
    }
    authCallback( authData ) {
    	if ( authData && authData.auth ) {
    		this.setState({ loggedIn: true })
    	}
    }
    unAuth() {
    	this.setState({ loggedIn: false })
    	base.unauth();
    	hashHistory.replace("/");
    }
    render () {
    	return (
    		<div className="menu pull-right">
    			{this.state.loggedIn && <span> <a href="#" onClick={this.unAuth.bind( this )}>Log-Out</a></span>}
    		</div>
    	)
    }
}
export default Menu
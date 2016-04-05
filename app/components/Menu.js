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
    componentDidMount() {
      this.menuEl = document.getElementById("toggle-icon")
    }
    authCallback( authData ) {
    	if ( authData && authData.auth ) {
    		this.setState({ loggedIn: true })
            this.setState({ uid: authData.uid })
    	}
        else {
            this.setState({ loggedIn: false })
        }
    }
    toggleMenu(){

    }
    unAuth() {
    	this.setState({ loggedIn: false })
    	base.unauth();
    	hashHistory.replace("/");
    }
    render () {
    	return (
    		<div className="menu pull-right">
                <div id="toggle-icon" onClick={ this.toggleMenu }></div>
    			{this.state.loggedIn && 
                    <ul>
                        <li><Link to={"challenge/" + this.state.uid}>Home</Link></li>
                        <li><Link to="overview">Settings</Link></li>
                        <li><Link to="overview">View Progress</Link></li>
                        <li><a href="#" onClick={ this.unAuth.bind( this ) }>Log-Out</a></li>
                    </ul>
                }
    		</div>
    	)
    }
}
export default Menu
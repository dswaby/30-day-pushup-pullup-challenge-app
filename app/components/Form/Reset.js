import React from 'react'
import { hashHistory } from 'react-router'
import Rebase from 're-base'

const base = Rebase.createClass('https://30day.firebaseio.com/');

class Reset extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
            	email: ""
            }
        }

        getName (emailRef) {
        	const email = emailRef.value;
        	emailRef.value = '';
        	if ( email ) {
        		//do your thing
        	}
        }

        render() {
            return ( 
                
	            <div className="form-group">
	            	<label>Enter Account Email</label>
	            	<input type="text" placeholder="Username" className="form-control" emailRef={(email) => this.getName(email)} />
	            </div>
                           
            )
        }
    }

export default Reset

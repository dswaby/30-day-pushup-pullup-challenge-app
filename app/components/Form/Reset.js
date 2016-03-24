import React from 'react'
import { hashHistory } from 'react-router'
import Rebase from 're-base'

const base = Rebase.createClass('https://30day.firebaseio.com/');

class Reset extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
            	email: "",
                emailReset: false
            }
        }

        getEmail (emailRef) {
        	const email = emailRef.value;
            this.setState({ email: email });
        	emailRef.value = '';
        }
        errorHandler(error) {
            // debugger
        }
        handleSubmit(e) {
            e.preventDefault();

            this.setState({emailReset: true})
            base.resetPassword({
                email: this.state.email
            }, this.errorHandler.bind(this) )
            
        }

        render() {
            return ( 
                <form onSubmit={(e) => this.handleSubmit(e)} className="col-sm-12">
                    <div className="col-sm-3"></div>
    	            <div className="form-group col-sm-6 center-block">
    	            	<div className="form-group"> 
                        <label>Enter Account Email</label>
    	            	<input type="text" placeholder="Username" className="form-control" emailRef={(email) => this.getEmail(email)} />
                        </div>
                        <div className="form-group"> 
                            <button type="submit" className="btn btn-block btn-primary">Submmit</button>
                        </div>
                    </div>

                    <div className="col-sm-3"></div>

                    {this.state.emailReset && <p>Request to reset email address {this.state.email} has been sent, please check your email </p>}
                </form>
            )
        }
    }

export default Reset

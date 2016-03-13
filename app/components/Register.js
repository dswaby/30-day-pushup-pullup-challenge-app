import React from 'react'
import Router from 'react-router'
import Rebase from 're-base'
import UserForm from './UserForm'

// not using classes since there is no support for mixins with ES6 classes
class Register extends React.Component {
    handleSubmit(){
        const username = this.usernameRef.value;
        const password = this.passwordRef.value;
        this.usernameRef.value = '';
        this.passwordRef.value = '';
        this.props.history.pushState(null, "/user/" + username)
    }
    render() {
        return (
            <div className="register">
                <div className="col-sm-12 text-center">
                    <UserForm handleUserForm={this.userLogin} buttonText="Register"/>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    history: React.PropTypes.object.isRequired
}

export default Register
import React from 'react'
import ErrorCode from './ErrorCode'
// not using classes since there is no support for mixins with ES6 classes
class UserForm extends React.Component {
    constructor( props ){
        super(props)
        this.state = {
            validEmail: true,
            validPassword: true
        }
    }

    validateEmail ( email ) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid = re.test(email);
        return valid;
    }

    validatePassword ( password ){
        return password.length >= 6;
    }
    validate( email, password ) {
        const emailValid = this.validateEmail( email );  
        const passwordValid = this.validatePassword( password );
        
        // checking conditions to avoid unecessary re-render
        if ( passwordValid !== this.state.validPassword ) {
            this.setState({ validPassword: passwordValid })
        }
        if ( emailValid !== this.state.validEmail ) {
            this.setState({ validEmail: emailValid })
        }
        return emailValid && passwordValid;
    }
    getEmail(emailRef){
        this.email = emailRef;
    }
    getPassword(passwordRef){
        this.password = passwordRef;
    }
    handleSubmit(e){
        e.preventDefault();
        var email = this.email.value;
        var password = this.password.value;
        if (this.validate( email, password )) {
            this.props.handleUserForm( email, password )
        } 
    }
    render() {
        return (
        <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="form-group">
                {!this.state.validEmail && <ErrorCode errorCode="Not a valid email address" />}
                <label>Email</label>  
                <input type="text" placeholder="Username" className="form-control" ref={(emailRef) => this.getEmail(emailRef)} />
                <br />
                {!this.state.validPassword && <ErrorCode errorCode="Passwords must be at least 6 characters" />}
                <label >Password</label>
                <input type="password" placeholder="Password" className="form-control" ref={(passwordRef) => this.getPassword(passwordRef)} />
                <br />
                <button type="submit" className="btn btn-block btn-primary">{this.props.buttonText}</button>
            </div>
        </form>
        )
    }
}

UserForm.propTypes = {
    handleUserForm: React.PropTypes.func.isRequired,
    buttonText: React.PropTypes.string.isRequired
}

export default UserForm;
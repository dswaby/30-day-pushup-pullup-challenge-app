import React from 'react'

// not using classes since there is no support for mixins with ES6 classes
class UserForm extends React.Component {
    constructor( props ){
        super(props)
        this.state = {
            invalidEmail: false,
            invalidPassword: false
        }
    }

    validateEmail () {
        // checking conditions to avoid unecessary re-render
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid = re.test(this.email.value);
        if (this.state.invalidEmail && valid) {
            this.setState({invalidEmail: false})
        }
        if (!valid) {
            this.setState({invalidEmail: true})
        }
    }

    validatePassword (){
        // checking conditions to avoid unecessary re-render
        var valid = this.password.value.length >= 6;
        if (this.state.invalidPassword && valid) {
            this.setState({invalidPassword: false})
        }
        if (!valid) {
            this.setState({invalidPassword: true})
        }
    }
        
    getEmail(emailRef){
        this.email = emailRef;
    }
    getPassword(passwordRef){
        this.password = passwordRef;
    }
    handleSubmit(){
        var email = this.email.value;
        var password = this.password.value;
        this.validatePassword();
        this.validateEmail();
        if (this.state.invalidEmail || this.state.invalidPassword) {
            return false
        } else {
            this.props.handleUserForm( email, password )
        }
    }
    render() {
        return (
        <form onSubmit={() => this.handleSubmit()}>
            <div className="form-group">
                <label>Email</label>  <span>{this.state.invalidEmail && <label className="text-danger" style={{paddingLeft:10}}>Not a valid email </label>}</span>
                <input type="text" placeholder="Username" className="form-control" ref={(emailRef) => this.getEmail(emailRef)} />
                <br />
                <span>{this.state.invalidPassword && <label className="text-danger">Password Minimum is 6 Characters</label>}</span>
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
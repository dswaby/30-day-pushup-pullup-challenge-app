import React from 'react'
import Router from 'react-router'
import Rebase from 're-base'
import UserForm from './UserForm'


// not using classes since there is no support for mixins with ES6 classes
class Home extends React.Component {
    constructor( props ){
        super(props)
        this.state = {
            invalid: false
        }
    }
    componentWillMount(){
        this.setState({invalid: true})
    }
    
    userLogin(username, password){
        console.log(username, password)
    }
    navigateRegister(){
        this.props.history.pushState(null, "/register/")
    }
    render() {
        return (
            <div className="home">
                <div className="col-sm-12">
                    <div className="col-sm-6">
                        {this.state.invalid && <label className="text-danger" style={{paddingLeft:10}}>Not a valid email</label>}
                        <UserForm handleUserForm={this.userLogin} buttonText="Register"/>
                         <p style={{paddingTop: 10}}><a href="#" onClick={this.navigateRegister}>Not a user? Sign up and start the challenge today!</a></p>
                        }
                    </div>
                    <div className="col-sm-6">
                        <h2 className="text-center">Login to continue tracking your progress</h2>
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/94518/pushups.jpg" className="center-block img-responsive"/>
                    </div>
                </div>
                 <div className="col-sm-12">
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                 </div>
            </div>
        )
    }
}

Home.propTypes = {
    history: React.PropTypes.object.isRequired
}

export default Home
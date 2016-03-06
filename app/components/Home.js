import React from 'react'
import Router from 'react-router'

// not using classes since there is no support for mixins with ES6 classes
class Home extends React.Component {
    getRef(ref){
        this.usernameRef = ref;
    }
    handleSubmit(){
        const username = this.usernameRef.value;
        this.usernameRef.value = '';
        this.props.history.pushState(null, "/user/" + username)
    }
    render() {
        return (
            <div className="col-sm-12">
                <form onSubmit={() => this.handleSubmit()}>
                    <div className="form-group col-sm-7">
                        <input type="text" placeholder="Enter Username for tracking 30 day challenge" className="form-control" ref={(ref) => this.getRef(ref)} />
                    </div>
                    <div className="form-group col-sm-5">
                        <button type="submit" className="btn btn-block btn-primary">Submit</button>
                    </div>
                    <div className="form-group col-sm-5">
                        <a href="#">New User, Get Started?</a>
                    </div> 
                </form>
            </div>
        )
    }
}

Home.propTypes = {
    history: React.PropTypes.object.isRequired
}

export default Home
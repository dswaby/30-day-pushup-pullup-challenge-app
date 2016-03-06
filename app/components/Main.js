import React from 'react'

const Main = ({history, children}) => {
    return (
        <div className="main-container">

            <nav className="navbar navbar-default" role="navigation">
           
                <div className="col-sm-7 col-sm-offset-2" style={{marginTop: 15, marginLeft: 15}}>
                    <h1>30 day challenge <small>track your progress here</small></h1>
                </div>
            </nav>
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default Main

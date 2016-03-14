import React from 'react'
import Menu from './Menu'

const Main = ({history, children}) => {
    return (
        <div className="main-container">
            <nav className="navbar navbar-default" role="navigation">
                <div className="col-sm-9 col-sm-offset-2" style={{marginTop: 15, marginLeft: 15}}>
                    <h1 className="title">30 day Push-up Pull-up Challenge <small></small></h1>
                </div>
            </nav>
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default Main

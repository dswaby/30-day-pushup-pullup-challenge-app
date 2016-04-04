import React from 'react'
import Menu from './Menu'

const Main = ({history, children}) => {
    return (
        <div className="main-container">
            <nav className="navbar navbar-default" role="navigation">
                <div className="col-sm-9 col-sm-offset-2" style={{marginTop: '15px', marginLeft: '15px'}}>
                    <h1><a className="main-title" href="/">30 day Push-up/Pull-up Challenge </a><small> <Menu /></small></h1>
                </div>
            </nav>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Main

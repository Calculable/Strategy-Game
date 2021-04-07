import React, {Component} from 'react'

class Layout extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                {this.props.children}
            </div>
        );
    }
}

function Navbar() {
    return (
        <div className="Introduction">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                <div className="container">
                    <a className="navbar-brand" href="/">Strategy Game</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">


                            <li className="nav-item">
                                <a className="nav-link" href="/about">About</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Layout;
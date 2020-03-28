import React from "react";

import { Link } from "react-router-dom";

import { withAuth } from "../../utils/withAuth";

class Header extends React.Component<any, any> {
    render () {
        const {user} = this.props;

        return (
            <header className="masthead mb-auto">
                <div className="inner">
                <h3 className="masthead-brand">Dodi Home</h3>
                <nav className="nav nav-masthead justify-content-center">
                    <Link className="nav-link active" to="/">Home</Link>
                    <Link className="nav-link" to="/playground">Playground</Link>
                    {
                        user?
                        <React.Fragment>
                            <Link className="nav-link" to="/user/projects">My Projects</Link>
                            <Link className="nav-link" to="/user/profile">Profile</Link>
                        </React.Fragment>
                        :
                        <Link className="nav-link" to="/user/login">Login</Link>
                    }
                </nav>
                </div>
            </header>
        )
    }
}
export default withAuth(Header);

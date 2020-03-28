import React from "react";
import Header from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { withAuth } from "../../utils/withAuth";
import { Button } from "react-bootstrap";
import Accounts from "../../lib/accounts/client";
import './accounts.css';

class UserProfilePage extends React.Component<any, any> {

    onLogout (ev: any) {
        ev.preventDefault();
        const history = this.props.history;
        Accounts.logout((error: any) => {
            if (!error) {
                history.push('/');
            }
        })
    }

    render () {
        const user = this.props.user;
        if (!user) return null;
        
        return (
            <div className="account-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <Header />

                <main role="main" className="inner cover">
                    <h3>{user.displayName}</h3>
                    <Button className='btn btn-secondary' onClick={this.onLogout.bind(this)}>Logout</Button>
                </main>

                <Footer />
            </div>
        )
    }
}

export default withAuth(UserProfilePage);
import React from "react";
import { withAuth } from "../../utils/withAuth";
import { Button } from "react-bootstrap";
import Accounts from "../../lib/accounts/client";
import './accounts.css';
import DefaultLayout from "../../components/layout/default";

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
            <DefaultLayout>
                <h3>{user.displayName}</h3>
                <Button className='btn btn-secondary' onClick={this.onLogout.bind(this)}>Logout</Button>
            </DefaultLayout>
        )
    }
}

export default withAuth(UserProfilePage);
import React from "react";
import { withAuth } from "../../utils/withAuth";
import './accounts.css';
import DefaultLayout from "../../components/layout/default";

class UserProfilePage extends React.Component<any, any> {

    render () {
        const user = this.props.user;
        if (!user) return null;
        
        return (
            <DefaultLayout>
                <h3>{user.displayName}</h3>
            </DefaultLayout>
        )
    }
}

export default withAuth(UserProfilePage);
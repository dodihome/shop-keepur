import React from "react";
import Logout from "../../components/accounts/Logout";
import './accounts.css';
import DefaultLayout from "../../components/layout/default";

export class LogoutPage extends React.Component<any, any> {
    render () {
        return (
            <DefaultLayout>
                <Logout {...this.props} />
            </DefaultLayout>
        )
    }
}
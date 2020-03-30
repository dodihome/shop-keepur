import React from "react";
import Login from "../../components/accounts/Login";
import './accounts.css';
import DefaultLayout from "../../components/layout/default";

export class LoginPage extends React.Component<any, any> {
    render () {
        return (
            <DefaultLayout>
                <Login {...this.props} />
            </DefaultLayout>
        )
    }
}
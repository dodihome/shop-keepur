import React from "react";
import Login from "../../components/accounts/Login";
import './accounts.css';
import DefaultLayout from "../../components/layout/default";

export class LoginPage extends React.Component<any, any> {

    onSuccess (user) {
        this.props.history.push('/user/profile');
    }

    render () {
        return (
            <DefaultLayout>
                <Login {...this.props} onSuccess={this.onSuccess.bind(this)} />
            </DefaultLayout>
        )
    }
}
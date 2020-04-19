import React from "react";
import SignUp from "../../components/accounts/SignUp";
import './accounts.css';
import DefaultLayout from "../../components/layout/default";

export class SignUpPage extends React.Component<any, any> {
    onSuccess (token, userProfile) {
        this.props.history.push ('/user/profile');
    }

    goLogin () {
        this.props.history.push('/user/login');
    }

    render () {
        return (
            <DefaultLayout>
                <SignUp onSuccess={this.onSuccess.bind(this)} 
                    goLogin={this.goLogin.bind(this)}
                    {...this.props} />
            </DefaultLayout>
        )
    }
}
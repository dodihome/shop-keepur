import React from "react";
import SignUp from "../../components/accounts/SignUp";
import './accounts.css';
import DefaultLayout from "../../components/layout/default";

export class SignUpPage extends React.Component<any, any> {
    render () {
        return (
            <DefaultLayout>
                <SignUp {...this.props} />
            </DefaultLayout>
        )
    }
}
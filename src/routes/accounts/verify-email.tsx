import React from "react";
import VerifyEmail from "../../components/accounts/VerifyEmail";
import './accounts.css';
import DefaultLayout from "../../components/layout/default";

export class VerifyEmailPage extends React.Component<any, any> {
    render () {
        return (
            <DefaultLayout>
                <VerifyEmail {...this.props} />
            </DefaultLayout>
        )
    }
}
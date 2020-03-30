import React from "react";
import './accounts.css';
import RequestReset from "../../components/accounts/RequestReset";
import DefaultLayout from "../../components/layout/default";

export class ForgotPasswordPage extends React.Component<any, any> {
    render () {
        return (
            <DefaultLayout>
                <RequestReset {...this.props} />
            </DefaultLayout>
        )
    }
}
import React from "react";
import './accounts.css';
import ResetPassword from "../../components/accounts/ResetPassword";
import DefaultLayout from "../../components/layout/default";

export class ResetPasswordPage extends React.Component<any, any> {
    render () {
        return (
            <DefaultLayout>
                <ResetPassword {...this.props} />
            </DefaultLayout>
        )
    }
}
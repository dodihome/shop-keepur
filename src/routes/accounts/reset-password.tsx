import React from "react";
import Header from "../../components/layout/Header";
import { Footer } from "../../components/layout/footer";
import './accounts.css';
import ResetPassword from "../../components/accounts/ResetPassword";

export class ResetPasswordPage extends React.Component<any, any> {
    render () {
        return (
            <div className="account-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <Header />

                <main role="main" className="inner cover">
                    <ResetPassword {...this.props} />
                </main>

                <Footer />
            </div>
        )
    }
}
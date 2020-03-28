import React from "react";
import Header from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import './accounts.css';
import RequestReset from "../../components/accounts/RequestReset";

export class ForgotPasswordPage extends React.Component<any, any> {
    render () {
        return (
            <div className="account-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <Header />

                <main role="main" className="inner cover">
                    <RequestReset {...this.props} />
                </main>

                <Footer />
            </div>
        )
    }
}
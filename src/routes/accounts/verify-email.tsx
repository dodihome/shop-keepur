import React from "react";
import Header from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import VerifyEmail from "../../components/accounts/VerifyEmail";
import './accounts.css';

export class VerifyEmailPage extends React.Component<any, any> {
    render () {
        return (
            <div className="account-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <Header />

                <main role="main" className="inner cover">
                    <VerifyEmail {...this.props} />
                </main>

                <Footer />
            </div>
        )
    }
}
import React from "react";
import Login from "../../components/accounts/Login";
import Header from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import './accounts.css';

export class LoginPage extends React.Component<any, any> {
    render () {
        return (
            <div className="account-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <Header />

                <main role="main" className="inner cover">
                    <Login {...this.props} />
                </main>

                <Footer />
            </div>
        )
    }
}
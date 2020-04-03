import React from "react";

import Nav from './nav';
import Footer from './footer';
import MainContent from "./main";

import './layout.scss';

class DefaultLayout extends React.Component <any, any> {

    render () {
        return (
            <React.Fragment>
                <Nav {...this.props} />
                <MainContent {...this.props} />
                <Footer {...this.props} />
            </React.Fragment>
        )
    }
}

export default DefaultLayout;
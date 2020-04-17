import React, { useState } from "react";

import Nav from './nav';
import Footer from './footer';
import MainContent from "./main";

import './layout.scss';
import { Toast } from "react-bootstrap";

const SystemMessages = () => {
    const [show, setShow] = useState(true);
    const dismiss = () => {
        setShow(false);
    }

    return (
        <div className='system-messages'>
            <Toast show={show} onClose={dismiss}>
                <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                />
                <strong className="mr-auto">Bootstrap</strong>
                <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
            </Toast>
        </div>
    );
}

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
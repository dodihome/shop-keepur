import React from "react";
import { isMobile } from 'react-device-detect';

class Footer extends React.Component<any, any> {
    render () {
        let className = 'footer py-3 ' + (isMobile? 'mobile' : 'mt-auto web');
        return (
            <footer className={className}>
                <div className="container">
                    <span>&copy; Dodi Home 2020</span>
                </div>
            </footer>
        )
    }
}

export default Footer;
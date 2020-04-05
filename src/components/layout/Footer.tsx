import React from "react";
import { isMobile } from 'react-device-detect';

class Footer extends React.Component<any, any> {
    render () {
        let className = 'footer mt-auto py-3 ' + (isMobile? 'mobile' : 'web');
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
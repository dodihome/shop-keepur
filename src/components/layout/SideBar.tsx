import React from "react";
import './SideBar.css';

class SideBar extends React.Component <any, any> {

    render () {

        let className = 'sidebar ' + (this.props.className ? this.props.className : '');
        if (this.props.right) {
           className = className + ' right'; 
        } else {
            className = className + ' left';
        }
        return (
            <div className={className}>
                {this.props.children}
            </div>
        )
    }
}

export default SideBar;
import React from 'react';

class MainContent extends React.Component <any, any> {
    render () {
        return (
            <div className="main content container">
                {this.props.children}
            </div>
        )
    }
}
export default MainContent;
import React from 'react';

class MainContent extends React.Component <any, any> {
    render () {
        return (
            <main role="main">
                <div className="container">
                    {this.props.children}
                </div>
            </main>
        )
    }
}
export default MainContent;
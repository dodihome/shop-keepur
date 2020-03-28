import React from 'react';

class MainContent extends React.Component <any, any> {
    render () {
        return (
            <main role="main">
                {this.props.children}
            </main>
        )
    }
}
export default MainContent;
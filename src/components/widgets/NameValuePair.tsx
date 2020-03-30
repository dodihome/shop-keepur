import React, { Component } from 'react';

export class NameValuePairView extends Component<any, any> {
    render () {
        const {name, value} = this.props;
        return (
            <div className="name-value-pair">
                <span className="name">{name}:</span>
                <span className="value">{value}</span>
            </div>
        );
    }
} 
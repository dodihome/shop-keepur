import React from 'react';
import Dodi from './Dodi';

export function withLocation(WrappedComponent: any) {
    return class extends React.Component<any, any> {
        state : any = {} as any;

        fetchLocation () {
            const userLocation = Dodi.location();
            this.setState({userLocation});
        }

        componentDidMount() {
            this.fetchLocation();
            setInterval(this.fetchLocation.bind(this), 1000);
        }

        render () {
            return <WrappedComponent userLocation={this.state.userLocation} {...this.props} />;
        }
    }
}
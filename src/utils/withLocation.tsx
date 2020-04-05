import React from 'react';
import Dodi from './Dodi';

export function withLocation(WrappedComponent: any) {
    return class extends React.Component<any, any> {
        state : any = {} as any;

        componentDidMount() {
            const userLocation = Dodi.location();
            if (!userLocation) {
                this.props.history.push('/set-location');
            }
        }

        render () {
            return <WrappedComponent {...this.props} />;
        }
    }
}
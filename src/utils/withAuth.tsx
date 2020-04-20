import React from 'react';
import Cookies from 'js-cookie';
import Accounts from '../lib/accounts/client';
import Dodi from './Dodi';

export function withAuth(WrappedComponent: any) {
    return class extends React.Component<any, any> {
        state = {} as any;

        componentDidMount() {
            const user = Dodi.user();
            if (!user) {

                const session = Cookies.get('session');            
                if (session) {
                    const resume = async ()=> {
                        const res = await Accounts.resume(session);
                        if (res.user) {
                            Dodi.getInstance().setUser(res.user);
                            this.setState ({user: res.user});
                        }
                    }
                    resume();
                }
    
            } else {
                this.setState({user});
            }
        }

        render () {
            return <WrappedComponent user={this.state.user} {...this.props} />;
        }
    }
}
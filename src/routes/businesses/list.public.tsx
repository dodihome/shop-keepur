import React from 'react';
import Bizz from '../../lib/business/client';
import DefaultLayout from '../../components/layout/default';
import { withAuth } from '../../utils/withAuth';
import { BizzList } from '../../components/bizz/BizzList';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Dodi from '../../utils/Dodi';
import { withLocation } from '../../utils/withLocation';
import { ChangeLocationPopover } from '../../components/widgets';

class ConsumerList extends React.Component<any, any> {
    state : any = {bizz: []} as any;

    async componentDidMount () {
        const {error, bizz} = await Bizz.list();

        if (error) {
            this.setState({error});
        } else {
            console.log({bizz});
            this.setState ({
                bizz
            });    
        }
    }

    render () {
        const { user, history } = this.props;
        const userLocation = Dodi.location();
        return (
            <DefaultLayout>
                <div className='biz list'>
                    <div className='search-bar'>
                        <h1>{userLocation} <ChangeLocationPopover /></h1>
                        {user ?
                        <Link to='/bizz/new'><Button variant='outline-primary'>+ Add Store</Button></Link>
                        : null
                        }
                    </div>

                    <BizzList bizz={this.state.bizz} user={user} history={history} />
                </div>
            </DefaultLayout>
        )
    }
}

export default withLocation(withAuth(ConsumerList));
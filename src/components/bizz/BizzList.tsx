import React from 'react';
import { IBizLite } from '../../lib/business/business.interface';
import { CardGroup, Card, Button, Badge, CardDeck } from 'react-bootstrap';
import { PhoneView } from '../../components/widgets/Phone';
import { Link } from 'react-router-dom';
import { AddressView } from '../widgets/Address';

class BizCard extends React.Component<any, any> {

    onClick (e : any) {
        e.preventDefault();
        this.props.history.push('/bizz/' + this.props.biz.id);
    }

    render () {
        const {biz, user} = this.props;
        const showClaimButton = (user && !biz.isClaimed);
        const claimLink = '/bizz/claim/' + biz.id;

        const viewLink = '/bizz/' + biz.id;

        return <Card key={biz.id}>
            <Card.Header>
                <span className='title'><Link to={viewLink}>{biz.name}</Link></span> 
                {
                    showClaimButton? 
                    <Link to={claimLink}><Button size="sm" variant='link'>(Claim Business)</Button></Link>
                    : null
                }
                {
                    biz.isClaimed ?
                    <Badge variant='primary'>Claimed</Badge> : null
                }
            </Card.Header>

            <Card.Body>
                <Card.Text><i className="fas fa-map-marker-alt"></i><AddressView address={biz.address} /></Card.Text>
                {
                    biz.phone?
                    <Card.Text><i className="fas fa-phone"></i><PhoneView phone={biz.phone} /></Card.Text>
                    : null
                }
            </Card.Body>
        </Card>
    }
}

export class BizzList extends React.Component<any, any> {
    render () {
        const { user, bizz } = this.props;
        return (
            <div className='biz list'>
                <div className='heading'>
                    <h1>Stores</h1>
                    {user ?
                    <Link to='/bizz/new'><Button variant='outline-primary'>+ Add Store</Button></Link>
                    : null
                    }
                </div>
                <CardDeck>
                {
                    bizz.map((biz: IBizLite) => {
                        return <BizCard key={biz.id} biz={biz} history={this.props.history} user={this.props.user} />
                    })
                }
                </CardDeck>
            </div>
        )
    }
}

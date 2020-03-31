import React from 'react';
import { IBizLite } from '../../lib/business/business.interface';
import { CardGroup, Card, Button, Badge } from 'react-bootstrap';
import { PhoneView } from '../../components/widgets/Phone';
import { Link } from 'react-router-dom';

class BizCard extends React.Component<any, any> {

    render () {
        const {biz, user} = this.props;
        const showClaimButton = (user && !biz.isClaimed);
        const claimLink = '/biz/claim/' + biz.id;

        return <Card key={biz.id}>
            <Card.Body>
                <Card.Title>
                    <span>{biz.name}</span> 
                    {
                        showClaimButton? 
                        <Link to={claimLink}><Button size="sm" variant='link'>(Claim Business)</Button></Link>
                        : null
                    }
                    {
                        biz.isClaimed ?
                        <Badge variant='primary'>Claimed</Badge> : null
                    }
                </Card.Title>
                <Card.Text><i className="fas fa-map-marker-alt"></i>{biz.address.inputText}</Card.Text>
                <Card.Text><i className="fas fa-phone"></i><PhoneView phone={biz.phone} /></Card.Text>
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
                    <Link to='/biz/new'><Button variant='outline-primary'>+ Add Store</Button></Link>
                    : null
                    }
                </div>
                <CardGroup>
                {
                    bizz.map((biz: IBizLite) => {
                        return <BizCard key={biz.id} biz={biz} history={this.props.history} user={this.props.user} />
                    })
                }
                </CardGroup>
            </div>
        )
    }
}

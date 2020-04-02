import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { newPhoneNumber, newAddress } from '../../helpers/contacts'
import { PhoneEdit } from '../../components/widgets/Phone';
import DefaultLayout from '../../components/layout/default';

import './biz.scss';
import { WebsiteEdit } from '../../components/widgets/Website';
import { withAuth } from '../../utils/withAuth';
import Bizz from '../../lib/business/client';
import { AddressEdit } from '../../components/widgets/Address';

class BizNew extends React.Component<any, any> {
    state : any = {
        phone : newPhoneNumber('business'),
        address: newAddress()
    } as any;

    onChangeName ( e : any) {
        e.preventDefault();

        this.setState ({
            name: e.target.value
        });
    }

    onUpdateAddress (address : any) {
        this.setState ({
            address
        })
    }

    onUpdateWebsite (website : string ) {
        this.setState ({
            website
        })
    }

    onUpdatePhone (phone : any) {
        this.setState ({
            phone
        })
    }

    onCancel (e : any) {
        e.preventDefault();
        this.props.history.push('/bizz');
    }

    async onSubmit (e: any) {
        e.preventDefault();
        const { user } = this.props;
        const createDto = {
            name: this.state.name,
            address: this.state.address,
            createdBy: user.id
        } as any;

        if (this.state.phone.number) {
            createDto.phone = this.state.phone;
        }
        if (this.state.website) {
            createDto.website = this.state.website;
        }

        const {error, bizId}  = await Bizz.addBiz(createDto);
        if (error) {
            this.setState({error});
        } else {
            this.props.history.push('/bizz/claim/' + bizId);
        }
    }

    render () {
        const { user } = this.props;
        const canSubmit = (this.state.name && this.state.address.city && this.state.address.state) ? true: false;

        return (
            <DefaultLayout>
                <div className='biz edit'>
                    {
                        user? 
                        <React.Fragment>
                            <h1>Add a Store</h1>
                            {
                                this.state.error ?
                                <Alert variant='danger'>{this.state.error}</Alert> : null
                            }
                            <Form>
                                <Form.Group>
                                    <Form.Label>Name (Required)</Form.Label>
                                    <Form.Control value={this.state.name} onChange={this.onChangeName.bind(this)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Address (Required)</Form.Label>
                                    <AddressEdit address={this.state.address} onUpdate={this.onUpdateAddress.bind(this)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Phone Number</Form.Label>
                                    <PhoneEdit phone={this.state.phone} idx={0} onUpdate={this.onUpdatePhone.bind(this)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Website</Form.Label>
                                    <WebsiteEdit website={this.state.website} idx={0} onUpdate={this.onUpdateWebsite.bind(this)} />
                                </Form.Group>
                                <div className="control-buttons">
                                    <Button type="submit" disabled={!canSubmit} onClick={this.onSubmit.bind(this)}>Add</Button>
                                    <Button variant="outline-secondary" onClick={this.onCancel.bind(this)}>Cancel</Button>
                                </div>
                            </Form>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <h1>Add a Store</h1>
                            <p>Please <a href='/user/login'>login</a> to add and manager stores.</p>
                        </React.Fragment>
                    }
                </div>                
            </DefaultLayout>

        )
    }
}

export default withAuth(BizNew);
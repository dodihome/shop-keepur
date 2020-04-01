import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { newPhoneNumber } from '../../helpers/contacts'
import { PhoneEdit } from '../../components/widgets/Phone';
import DefaultLayout from '../../components/layout/default';

import './biz.scss';
import { WebsiteEdit } from '../../components/widgets/Website';
import { withAuth } from '../../utils/withAuth';
import Bizz from '../../lib/business/client';

class BizEdit extends React.Component<any, any> {
    state : any = {
        phone : newPhoneNumber('business')
    } as any;

    onChangeName ( e : any) {
        e.preventDefault();

        this.setState ({
            name: e.target.value
        });
    }

    onChangeAddress (e : any) {
        e.preventDefault();

        this.setState ({
            address: e.target.value
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
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control value={this.state.name} onChange={this.onChangeName.bind(this)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control value={this.state.address} onChange={this.onChangeAddress.bind(this)} />
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
                                    <Button type="submit" onClick={this.onSubmit.bind(this)}>Add</Button>
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

export default withAuth(BizEdit);
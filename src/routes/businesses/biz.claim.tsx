import React from 'react';
import DefaultLayout from '../../components/layout/default';
import { Form, Button, Alert } from 'react-bootstrap';
import { withAuth } from '../../utils/withAuth';
import Bizz from '../../lib/business/client';
import { Link } from 'react-router-dom';

class BizClaim extends React.Component<any, any> {
    state : any = {} as any;

    async componentDidMount() {
        const bizId = this.props.match.params.id;
        const {error, biz} = await Bizz.consumerView(bizId);
        if (error) {
            this.setState({error});
        } else {
            this.setState ({biz});
        }
    }

    onChangeRole( e : any) {
        e.preventDefault ();
        this.setState({
            role: e.target.value
        })
    }

    onCancel (e : any) {
        e.preventDefault();
        this.props.history.push('/bizz');
    }

    async onSubmit (e : any) {
        e.preventDefault();
        const { user } = this.props;
        const bizId = this.props.match.params.id;

        const {error, data } = await Bizz.claimBiz (bizId, user.id, this.state.role);
        if (error) {
            this.setState ({error});
        } else {
            this.setState ({isSubmitted: true})
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
                            <h1>Claim My Business</h1>
                            {
                                this.state.biz?
                                <Alert variant='info'>
                                    <h3>{this.state.biz.name}</h3>
                                    <p>{this.state.biz.address.inputText}</p>
                                </Alert>
                                : null
                            }
                            {
                                this.state.isSubmitted?
                                <div>
                                    <p>Thank you!  Your request has been submitted.</p>
                                    <p>Next, we will do a streamlined verification.</p>
                                    <p>One way or another, you should be hearing from us within a day (or two).</p>
                                    <Link to='/'>Back To Homepage</Link>
                                </div>
                                :
                                <React.Fragment>
                                {
                                    this.state.error ?
                                    <Alert variant='danger'>{this.state.error}</Alert> : null
                                }
                                <p>Are you the owner, manager, or a team member?</p>
                                <Form>
                                    <Form.Check type='radio' value='Owner' checked={this.state.role === 'Owner'} label='Owner' onChange={this.onChangeRole.bind(this)} />
                                    <Form.Check type='radio' value='Manager' checked={this.state.role === 'Manager'} label='Manager' onChange={this.onChangeRole.bind(this)} />
                                    <Form.Check type='radio' value='Member' checked={this.state.role === 'Member'} label='Team Member' onChange={this.onChangeRole.bind(this)} />
    
                                    <div className="control-buttons">
                                        <Button type="submit" disabled={!this.state.role} onClick={this.onSubmit.bind(this)}>Yes - Claim My Business</Button>
                                        <Button variant="outline-secondary" onClick={this.onCancel.bind(this)}>Nope - Not Affiliated</Button>
                                    </div>
                                </Form>    
                                </React.Fragment>
                            }
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <h1>Claim My Business</h1>
                            <p>Please <a href='/user/login'>login</a> to add, claim, or manager businesses.</p>
                        </React.Fragment>
                    }
                </div>
            </DefaultLayout>
        )
    }
}

export default withAuth(BizClaim);
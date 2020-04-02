import React from "react";
import { withAuth } from "../../utils/withAuth";
import Bizz from "../../lib/business/client";
import DefaultLayout from "../../components/layout/default";
import { Alert, Badge, Button } from "react-bootstrap";
import { AddressView } from "../../components/widgets/Address";
import { PhoneView } from "../../components/widgets/Phone";
import { Link } from "react-router-dom";
import TagsEdit, { TagsView } from "../../components/widgets/TagsEdit";

class BizView extends React.Component<any, any> {
    state : any = {} as any;

    async componentDidMount () {
        const bizId = this.props.match.params.id;
        const user = this.props.user;
        const {error, biz} = await Bizz.consumerView(bizId);
        if (error) {
            this.setState({error});
        } else {
            this.setState ({biz});
        }
    }

    async onDoneTagsEdit (e : any) {
        e.preventDefault();
        this.setState({
            isEditTags: false
        })
        const {error} = await Bizz.updateTags(this.state.biz._id, this.state.biz.tags, this.props.user.id);
        if (error) {
            this.setState({error});
        }
    }

    onEditTags (e: any) {
        e.preventDefault();
        this.setState({
            isEditTags: true
        })
    }

    onUpdateTags (tags: string[]) {
        const { biz } = this.state;
        biz.tags = tags;
        this.setState({biz});
    }

    render () {
        const { user } = this.props;
        const { biz } = this.state;
        if (!biz) {
            return <DefaultLayout />;
        }

        const showClaimButton = Bizz.canClaim(biz, user);
        const claimLink = '/bizz/claim/' + biz.id;
        const editLink = '/bizz/edit/' + biz.id;

        const showEditButton = Bizz.canEdit(biz, user);

        return (
            <DefaultLayout>
                <div className='biz view'>
                    <div className='contact-info'>
                        <div>
                            <h1>
                                {biz.name} 
                                {
                                    showClaimButton? 
                                    <Link to={claimLink}><Button size="sm" variant='link'>(Claim Business)</Button></Link>
                                    : null
                                }
                                {
                                    biz.isClaimed ?
                                    <Badge variant='primary'>Claimed</Badge> : null
                                }
                            </h1>
                            <span className='info'><i className="fas fa-map-marker-alt"></i><AddressView address={biz.address} /></span>
                            {
                                biz.phone?
                                <span><i className="fas fa-phone"></i><PhoneView phone={biz.phone} /></span>
                                : null
                            }
                        </div>
                        {
                        showEditButton?
                        <div className='actions'>
                            <Link to={editLink}><Button variant='outline-primary'>Edit Info</Button></Link>
                        </div>
                        : null
                    }
                    </div>
                    <div className='biz-tags'>
                        <span className="heading">Tags</span>
                        {
                            this.state.isEditTags?
                            <React.Fragment>
                                <TagsEdit tags={biz.tags} onUpdate={this.onUpdateTags.bind(this)} />
                                <Button variant='link' onClick={this.onDoneTagsEdit.bind(this)}>Done</Button>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <TagsView tags={biz.tags} />
                                { showEditButton?
                                    <Button variant='link' onClick={this.onEditTags.bind(this)}>Edit</Button>
                                    : null
                                }
                            </React.Fragment>
                        }
                    </div>
                    <div className='inventory'>

                    </div>
                </div>
            </DefaultLayout>
        )
    }
}

export default withAuth(BizView);
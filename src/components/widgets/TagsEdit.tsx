import React, { Component } from 'react';
import * as _ from 'lodash';
import { Container, Form, FormControl, InputGroup, Badge} from 'react-bootstrap';

class TagLabel extends Component<any, any> {
    onDelete (e : any) {
        e.preventDefault();

        const {tag} = this.props;
        this.props.onDelete(tag);
    }

    render () {
        const {tag} = this.props;

        return (
            <Badge>{tag} <i className='fa fa-delete' onClick={this.onDelete.bind(this)} /></Badge>
        )
    }
}

export class TagsView extends Component<any, any> {
    render () {
        const {tags} = this.props;
        if (!tags) return;

        return (<Container className="tags view">
            {tags.map((t : any)=> {
                return <Badge>{t}</Badge>
            })}
        </Container>)
    }
}

export default class TagsEdit extends Component<any, any> {
    constructor (props : any) {
        super(props);

        if (props.tags) {
            this.state = {
                tags: props.tags,
                newTag: ''
            }
        } else {
            this.state = {
                tags: [],
                newTag: ''
            }
        }
    }

    componentWillReceiveProps (newProps : any) {
        if (newProps.tags) {
            this.setState ({tags: newProps.tags, newTag: ''});
        } else {
            this.setState ({tags: [], newTag: ''});
        }
    }

    onSubmitNewTag (e : any) {
        e.preventDefault();

        let tags = this.state.tags;
        tags.push(this.state.newTag.trim().toLowerCase());
        this.setState ({
            tags,
            newTag: ''
        })
        
        const self = this;
        setTimeout(() => {
            self.props.onUpdate(this.state.tags);
        }, 300);
    }

    onChangeNewTag (e : any) {
        e.preventDefault();
        this.setState ({
            newTag: e.target.value
        })
    }

    onDeleteTag (tag : any) {
        let tags = this.state.tags;
        _.remove(tags, (t) => {
            return t == tag;
        })
        this.setState({
            tags
        });
        const self = this;
        setTimeout(() => {
            self.props.onUpdate(this.state.tags);
        }, 300);
    }

    render () {
        const {label, labelClass, FormControlClass, tagsClass} = this.props;

        return (
            <Container className="tags edit">
                <Form onSubmit={this.onSubmitNewTag.bind(this)}>
                    <div>
                        <label className={labelClass}>Tags</label>

                        <FormControl className={FormControlClass} value={this.state.newTag} onChange={this.onChangeNewTag.bind(this)} />
                        <span className={tagsClass}>
                        {
                            this.state.tags.map((t : any, idx : any) => {
                                return (<TagLabel key={idx} tag={t} onDelete={this.onDeleteTag.bind(this)} />)
                            })
                        }
                        </span>

                        <div className='clear' />
                    </div>
                </Form>
            </Container>
        )
    }
}
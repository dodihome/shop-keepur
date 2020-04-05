import { FormControl, InputGroup, Form, Button } from "react-bootstrap";
import React, { useRef } from "react";

import 'react-bootstrap-typeahead/css/Typeahead.css';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Products from "../../lib/product/client";

export class ProductSearch extends React.Component<any, any> {
    state : any  = {
        allowNew: true,
        isLoading: false,
        multiple: false,
        options: [],
        isSearching: false
    } as any;

    ref : any = React.createRef();

    _clearState () {
        this.setState ({
            selected: null,
            options: []
        })
        const instance = this.ref.current.getInstance();
        instance.clear();
    }

    componentDidUpdate (oldProps : any, oldState: any) {
        if (oldState.isSearching !== this.props.isSearching) {
            this.setState({
                isSearching: this.props.isSearching
            })
        }
    }

    onChange ( selected: any) {
        console.log(selected);
        this.setState({selected, isSearching: true});
        setTimeout(this.onSubmit.bind(this), 300);
    }

    onSubmit (e: any) {
        if (e)
            e.preventDefault();

        if (this.state.selected && this.state.selected[0]) {

            if (this.state.selected[0].id.startsWith('new-id')) {
                this.props.onAdd(this.state.selected[0]);
            } else {
                this.props.onSearch(this.state.selected[0]);
            }
            this._clearState()
        } else {
            this.setState({isSearching: false});
        }
    }

    async onSearch (searchTerm : string) {
        this.setState({ isLoading: true} );
        const { error, products } = await Products.autocomplete(searchTerm);
        if (products) {
            this.setState({
                isLoading: false,
                options: products
            })
        } else {
            this.setState({
                isLoading: false,
                options: []
            })
        }
    }

    render () {
        let { buttonLabel } = this.props;
        if (!buttonLabel) {
            buttonLabel = 'Go';
            if (this.state.selected && this.state.selected[0] && this.state.selected[0].id.startsWith('new-id')) {
                buttonLabel = 'Add';
            }    
        }

        const { hideLabel } = this.props;
        let { size, placeholder } = this.props;
        if (!size) size = 'lg';
        if (!placeholder) placeholder = 'ex. toilet paper';
        return (
            <Form onSubmit={this.onSubmit.bind(this)}>
                <InputGroup size='lg'>
                    {
                        hideLabel? null :
                        <InputGroup.Prepend>
                            <InputGroup.Text>Find</InputGroup.Text>
                        </InputGroup.Prepend>
                    }
                    <AsyncTypeahead {...this.state} size='lg'
                        id='product-search' onChange={this.onChange.bind(this)}
                        labelKey='name'
                        minLength={3}
                        onSearch={this.onSearch.bind(this)}
                        placeholder={placeholder}
                        selected={this.state.selected} 
                        ref={this.ref}
                        />
                    <InputGroup.Append>
                        <Button variant='secondary' type='submit' disabled={this.state.isSearching}>{buttonLabel}</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
        )
    }
}
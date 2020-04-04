import React from "react";
import { Form, InputGroup, Button, ListGroup, Card, CardDeck, Dropdown, DropdownButton, ButtonGroup, Alert } from "react-bootstrap";
import { fromNow } from "../../utils/formatter";
import { InventoryStatus, IInventoryItem } from "../../lib/business/business.interface";

const BasicItems = (props : any) => {
    const { items } = props;

    const names = items.map((ii)=> {
        return ii.product.name;
    });

    return (<span className='items'>{names.join(', ')}</span>)
}

export class InventoryView extends React.Component<any, any> {

    onUpvote (item : IInventoryItem, e : any) {
        e.preventDefault();
        this.props.onUpvote(item);
    }

    onDownvote (item: IInventoryItem, e : any) {
        e.preventDefault();
        this.props.onDownvote(item);        
    }


    renderBasicView (inStock : any[], outOfStock : any[]) {
        return (
            <div className='inventory'>
                <Alert variant='success' className='in-stock'>
                    <span className='heading'>In Stock: </span>           
                    <BasicItems items={inStock} />
                </Alert>
                <Alert variant='secondary' className='out-of-stock'>
                    <span className='heading'>Out Of Stock: </span>           
                    <BasicItems items={outOfStock} />         
                </Alert>
            </div>
        )
    }

    renderStandardView (inStock : any [], outOfStock : any [], unknown: any[]) {
        return (
            <CardDeck className='inventory'>
                <Card className='in-stock'>
                    <Card.Header>In Stock <i className='fa fa-check-circle' /></Card.Header>
                    <ListGroup className='items' variant='flush'>
                    {
                        inStock.map((item, idx)=> {
                            return <ListGroup.Item key={idx} action className='item'>
                                <div>
                                    <div className='name'>{item.product.name}</div>
                                    <div className='when'>{fromNow(item.timestamp)}</div>
                                </div>
                            </ListGroup.Item>
                        })
                    }
                    </ListGroup>
                </Card>
                <Card className='out-of-stock'>
                    <Card.Header>Out Of Stock <i className='fa fa-minus-circle' /></Card.Header>
                    <ListGroup className='items' variant='flush'>
                    {
                        outOfStock.map((item, idx)=> {
                            return <ListGroup.Item key={idx} action className='item'>
                                <div>
                                    <div className='name'>{item.product.name}</div>
                                    <div className='when'>{fromNow(item.timestamp)}</div>
                                </div>
                            </ListGroup.Item>
                        })
                    }
                    </ListGroup>
                </Card>
                <Card className='unknown'>
                    <Card.Header>Wish To Know <i className='fa fa-question-circle' /></Card.Header>
                    <ListGroup className='items' variant='flush'>
                    {
                        unknown.map((item, idx)=> {
                            return <ListGroup.Item key={idx} action className='item'>
                                <div>
                                    <div className='name'>{item.product.name}</div>
                                    <div className='when'>{fromNow(item.timestamp)}</div>
                                </div>
                                <ButtonGroup>
                                    <Button variant='outline-primary' onClick={this.onUpvote.bind(this, item)}><i className='fa fa-thumbs-up' /></Button>
                                    <Button variant='outline-primary' disabled>{item.votes? item.votes : 0}</Button>
                                    <Button variant='outline-primary' onClick={this.onDownvote.bind(this, item)}><i className='fa fa-thumbs-down' /></Button>
                                </ButtonGroup>
                            </ListGroup.Item>
                        })
                    }
                    </ListGroup>
                </Card>
            </CardDeck>
        )
    }

    render () {
        const { items, basic } = this.props;
        console.log({items});

        const inStock = [];
        const outOfStock = [];
        const unknown = [];
        items.forEach((item)=> {
            if (item.status === InventoryStatus.IN_STOCK) 
                inStock.push(item);
            else if (item.status === InventoryStatus.OUT_OF_STOCK)
                outOfStock.push(item);
            else 
                unknown.push(item);
        })

        if (basic) {
            return this.renderBasicView (inStock, outOfStock);
        } else {
            return this.renderStandardView(inStock, outOfStock, unknown);
        }

    }
}

export class InventoryEdit extends React.Component<any, any> {
    state : any = {} as any;

    onChange (e : any) {
        e.preventDefault();

        const newState = {} as any;
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    onAddInStock ( e: any) {
        e.preventDefault();
        const inStockItem = this.state.inStock.toLowerCase();
        const {items} = this.props;

        let found;
        items.forEach ((item) => {
            if (inStockItem === item.product.name.toLowerCase()) {
                found = item;
            }
        })

        if (!found) {
            found = {product: {name: this.state.inStock}};
        }
        found.status = InventoryStatus.IN_STOCK;
        this.props.onUpdate(found);        
    }

    onAddOutOfStock (e : any) {
        e.preventDefault();
        const outOfStockItem = this.state.outOfStock.toLowerCase();
        const {items} = this.props;

        let found;
        items.forEach ((item) => {
            if (outOfStockItem === item.product.name.toLowerCase()) {
                found = item;
            }
        })

        if (!found) {
            found = {product: {name: this.state.outOfStock}};
        }
        found.status = InventoryStatus.OUT_OF_STOCK;
        this.props.onUpdate(found);        
    }

    onAddUnknown (e: any) {
        e.preventDefault();
        const unknownItem = this.state.unknown.toLowerCase();
        const {items} = this.props;

        let found;
        items.forEach ((item) => {
            if (unknownItem === item.product.name.toLowerCase()) {
                found = item;
            }
        })

        if (!found) {
            found = {product: {name: this.state.unknown}};
        }
        found.status = InventoryStatus.UNKNOWN;
        this.props.onUpdate(found);        
    }

    onRemove ( item: any, e: any) {
        e.preventDefault();
        if (item.status === InventoryStatus.UNKNOWN) {
            this.props.onDelete(item);
        } else if (item.status === InventoryStatus.IN_STOCK) {
            item.status = InventoryStatus.OUT_OF_STOCK;
            this.props.onUpdate(item);        
        } else {
            item.status = InventoryStatus.IN_STOCK;
            this.props.onUpdate(item);        
        }
    }

    onMarkItem (item: any, status: InventoryStatus, e: any) {
        e.preventDefault();
        item.status = status;

        console.log({item});

        this.props.onUpdate(item);
    }

    onDeleteWishlistItem (item: any, e: any) {
        e.preventDefault();
        this.props.onDelete(item);
    }

    onUpvote (item : IInventoryItem, e : any) {
        e.preventDefault();
        this.props.onUpvote(item);
    }

    onDownvote (item: IInventoryItem, e : any) {
        e.preventDefault();
        this.props.onDownvote(item);        
    }

    render () {
        const { items } = this.props;

        console.log({items});

        const inStock = [];
        const outOfStock = [];
        const unknown = [];
        items.forEach((item)=> {
            if (item.status === InventoryStatus.IN_STOCK) 
                inStock.push(item);
            else if (item.status === InventoryStatus.OUT_OF_STOCK)
                outOfStock.push(item);
            else 
                unknown.push(item);
        })

        console.log({inStock, outOfStock});

        return (
            <CardDeck className='inventory'>
                <Card className='in-stock'>
                    <Card.Header>In Stock <i className='fa fa-check-circle' /></Card.Header>
                    <Card.Body>
                        <ListGroup className='items'>
                        {
                            inStock.map((item, idx)=> {
                                return <ListGroup.Item key={idx} action className='item'>
                                    <div>
                                        <div className='name'>{item.product.name}</div>
                                        <div className='when'>{fromNow(item.timestamp)}</div>
                                    </div>
                                    <Button variant='outline-secondary' onClick={this.onRemove.bind(this, item)}>Ran Out</Button>
                                </ListGroup.Item>
                            })
                        }
                        </ListGroup>
                    </Card.Body>
                </Card>
                <Card className='out-of-stock'>
                    <Card.Header>Out Of Stock <i className='fa fa-minus-circle' /></Card.Header>
                    <Card.Body>
                        <ListGroup className='items'>
                        {
                            outOfStock.map((item, idx)=> {
                                return <ListGroup.Item key={idx} action className='item'>
                                    <div>
                                        <div className='name'>{item.product.name}</div>
                                        <div className='when'>{fromNow(item.timestamp)}</div>
                                    </div>
                                    <Button variant='outline-secondary' onClick={this.onRemove.bind(this, item)}>Re-Stocked</Button>
                                </ListGroup.Item>
                            })
                        }
                        </ListGroup>
                    </Card.Body>
                </Card>
                <Card className='unknown'>
                    <Card.Header>Wish To Know <i className='fa fa-question-circle' /></Card.Header>
                    <Card.Body>
                        <ListGroup className='items'>
                        {
                            unknown.map((item, idx)=> {
                                return <ListGroup.Item key={idx} action className='item'>
                                    <div>
                                        <div className='name'>{item.product.name}</div>
                                        <ButtonGroup className='votes'>
                                            <Button variant='outline-primary' onClick={this.onUpvote.bind(this, item)}><i className='fa fa-thumbs-up' /></Button>
                                            <Button variant='outline-primary' disabled>{item.votes? item.votes : 0}</Button>
                                            <Button variant='outline-primary' onClick={this.onDownvote.bind(this, item)}><i className='fa fa-thumbs-down' /></Button>
                                        </ButtonGroup>
                                    </div>
                                    <DropdownButton id='updateUnknownItem' title='Mark As' variant='outline-secondary'>
                                        <Dropdown.Item onClick={this.onMarkItem.bind(this, item, InventoryStatus.IN_STOCK)}>In Stock</Dropdown.Item>
                                        <Dropdown.Item onClick={this.onMarkItem.bind(this, item, InventoryStatus.OUT_OF_STOCK)}>Out Of Stock</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={this.onDeleteWishlistItem.bind(this, item)}>Delete</Dropdown.Item>
                                    </DropdownButton>
                                </ListGroup.Item>
                            })
                        }
                        </ListGroup>
                    </Card.Body>
                    <Card.Footer>
                        <Form onSubmit={this.onAddUnknown.bind(this)}>
                            <InputGroup>
                                <Form.Control name='unknown' value={this.state.unknown} onChange={this.onChange.bind(this)} />
                                <InputGroup.Append>
                                    <Button type='submit' variant='secondary'>Add</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>
                    </Card.Footer>
                </Card>
            </CardDeck>
        )
    }
}
import React from "react";
import { Button, ListGroup, Card, CardDeck, Dropdown, ButtonGroup, Alert, SplitButton } from "react-bootstrap";
import { fromNow } from "../../utils/formatter";
import { InventoryStatus, IInventoryItem } from "../../lib/business/business.interface";
import { ProductSearch } from "../products/ProductSearch";
import { titleCase } from "title-case";

const BasicItems = (props : any) => {
    const { items } = props;

    const names = items.map((ii)=> {
        return titleCase(ii.product.name);
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
                {
                    inStock.length > 0 ?
                    <div className='block'>
                        <span className='heading in-stock'>In Stock: </span>           
                        <BasicItems items={inStock} />
                    </div>
                    : null
                }
                {
                    outOfStock.length > 0 ?
                    <div className='block'>
                        <span className='heading out-of-stock'>Out Of Stock: </span>           
                        <BasicItems items={outOfStock} />         
                    </div>
                    : null
                }
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
            if (items.length > 0) {
                return this.renderBasicView (inStock, outOfStock);
            } else {
                return null;
            }
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

    _addToList (product: any, status: InventoryStatus) {
        const {items} = this.props;

        let found;
        items.forEach ((item) => {
            if (product.id === item.product.id) {
                found = item;
            }
        })

        if (!found) {
            found = {product: {name: product.name}};
            if (!product.id.startsWith('new-')) {
                found.product.id = product.id;
            }
        }
        found.status = status;
        this.props.onUpdate(found);    
    }

    onAddInStock (product: any) {
        this._addToList(product, InventoryStatus.IN_STOCK);
    }

    onAddOutOfStock (product: any) {
        this._addToList(product, InventoryStatus.OUT_OF_STOCK);
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
        const { items, user } = this.props;

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

        return (
            <CardDeck className='inventory'>
                <Card className='in-stock'>
                    <Card.Header>In Stock <i className='fa fa-check-circle' />
                        {user?
                        <ProductSearch size='md' hideLabel={true} placeholder='ex. toilet paper'
                            buttonLabel='Add'
                            isSearching={false}
                            onAdd={this.onAddInStock.bind(this)}
                            onSearch={this.onAddInStock.bind(this)} />
                            : null
                        }

                    </Card.Header>
                    <Card.Body>
                        <ListGroup className='items'>
                        {
                            inStock.map((item, idx)=> {
                                return <ListGroup.Item key={idx} action className='item'>
                                    <div>
                                        <div className='name'>{titleCase(item.product.name)}</div>
                                        <div className='when'>{fromNow(item.timestamp)}</div>
                                    </div>
                                    {
                                        user?
                                        <SplitButton id='btn-ran-out' title='Ran Out'
                                            variant='outline-primary' onClick={this.onRemove.bind(this, item)}>
                                            <Dropdown.Item onClick={this.onDeleteWishlistItem.bind(this, item)}>Delete</Dropdown.Item>
                                        </SplitButton>
                                        : null
                                    }
                                </ListGroup.Item>
                            })
                        }
                        </ListGroup>
                    </Card.Body>
                </Card>
                <Card className='out-of-stock'>
                    <Card.Header>
                        Out Of Stock <i className='fa fa-minus-circle' />
                        {user?
                        <ProductSearch size='md' hideLabel={true} placeholder='ex. toilet paper'
                            buttonLabel='Add'
                            isSearching={false}
                            onAdd={this.onAddOutOfStock.bind(this)}
                            onSearch={this.onAddOutOfStock.bind(this)} />
                            : null
                        }

                    </Card.Header>
                    <Card.Body>
                        <ListGroup className='items'>
                        {
                            outOfStock.map((item, idx)=> {
                                return <ListGroup.Item key={idx} action className='item'>
                                    <div>
                                        <div className='name'>{titleCase(item.product.name)}</div>
                                        <div className='when'>{fromNow(item.timestamp)}</div>
                                    </div>
                                    {
                                        user?
                                        <SplitButton id='btn-restocked' title='Re-Stocked'
                                            variant='outline-primary' onClick={this.onRemove.bind(this, item)} >
                                            <Dropdown.Item onClick={this.onDeleteWishlistItem.bind(this, item)}>Delete</Dropdown.Item>
                                        </SplitButton>
                                        : null
                                    }
                                </ListGroup.Item>
                            })
                        }
                        </ListGroup>
                    </Card.Body>
                </Card>
            </CardDeck>
        )
    }
}
import React from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { withAuth } from '../../utils/withAuth';
import Dodi from '../../utils/Dodi';
import { UserLocation } from '../widgets/UserLocation';

class Navigation extends React.Component<any, any>  {
    renderWithUser () {
        const { user } = this.props;
        const isSysAdmin = Dodi.isSysAdmin(user);

        return (
            <Nav>
                <Nav.Link href="/products">Products</Nav.Link>
                <Nav.Link href="/bizz">Businesses</Nav.Link>
                <NavDropdown title={user.displayName} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/user/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    {
                    isSysAdmin ?
                    <React.Fragment>
                        <NavDropdown.Item href="/admin/products">Products</NavDropdown.Item>
                        <NavDropdown.Item href="/admin/people">People</NavDropdown.Item>
                        <NavDropdown.Item href="/admin/bizz">Businesses</NavDropdown.Item>
                        <NavDropdown.Divider />
                    </React.Fragment>
                    : null
                }
                    <NavDropdown.Item href="/user/logout">Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        )
    }

    renderWithoutUser () {
        return (
            <Nav>
                <Nav.Link href="/products">Products</Nav.Link>
                <Nav.Link href="/bizz">Businesses</Nav.Link>
                <Nav.Link href='/user/login'>Login</Nav.Link>
            </Nav>
        )
    }

    render () {
        const { homepage } = this.props;

        return (
            <Navbar bg="dark" variant="dark" fixed='top' expand='md'>
                <Navbar.Brand href="/">Shop Keepur</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className='headline'>
                        <Navbar.Text>
                            { homepage? null : <UserLocation /> }
                        </Navbar.Text>
                    </div>
                    {
                        this.props.user? 
                        this.renderWithUser () : this.renderWithoutUser()
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withAuth(Navigation);
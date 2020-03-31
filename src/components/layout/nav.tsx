import React from 'react';
import './nav.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { withAuth } from '../../utils/withAuth';

class Navigation extends React.Component<any, any>  {

    renderWithUser () {
        const { user } = this.props;

        return (
            <Nav>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title={user.displayName} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/user/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/user/logout">Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        )
    }

    renderWithoutUser () {
        return (
            <Nav>
                <Nav.Link href='/user/login'>Login</Nav.Link>
            </Nav>
        )
    }

    render () {
        return (
            <Navbar bg="dark" variant="dark" fixed='top' expand='md'>
                <Navbar.Brand href="/">Shop Keepur</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className='headline'>
                        <Navbar.Text>Top level message</Navbar.Text>
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
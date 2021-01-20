import React from 'react'
import {
    Nav,
    Navbar,
    Dropdown
} from 'react-bootstrap'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { logout } from '../action'

class Navigation extends React.Component {
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to='/'>Home</Nav.Link>
                            <Nav.Link as={Link} to='/product'>Product</Nav.Link>
                        </Nav>
                        <Dropdown style={{ margin: '0 40px' }}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.props.user || 'USERNAME'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {this.props.user
                                    ?
                                    <Dropdown.Item onClick={this.props.logout}>Logout</Dropdown.Item>
                                    :
                                    <>
                                    <Dropdown.Item as={Link} to='/login'>Login</Dropdown.Item>
                                    <Dropdown.Item as={Link} to='/register'>Register</Dropdown.Item>
                                    </>
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.username
    }
}

export default connect(mapStateToProps, { logout })(Navigation)
// NOTE connect (kiri, kanan) kiri data, kanan action
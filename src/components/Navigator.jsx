import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../img/logo-black.png';

const linkStyle = {
  color: 'grey',
  textDecoration: 'none',
  paddingRight: '20px',
};

export default function Navigator(prop) {
  const logout = () => {
    localStorage.removeItem('token');
    prop.setLogin(false);
  };

  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
    >
      <Container style={{ padding: 0 }}>
        <Link to="/">
          <img
            src={logo}
            style={{ height: '40px', paddingRight: '35px' }}
            alt="Logo"
          />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link style={linkStyle} to="/">
              Home
            </Link>
            <Link style={linkStyle} to="/rooms">
              Room
            </Link>
            <Link style={linkStyle} to="/book">
              Book
            </Link>
          </Nav>
          <Nav className="ml-auto">
            {prop.isLogin ? (
              <>
                <Link style={linkStyle} to="/profile">
                  Profile
                </Link>
                <Link style={linkStyle} to="/orders">
                  Orders
                </Link>
                <Link style={linkStyle} onClick={logout}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link style={linkStyle} to="/register">
                  Join us
                </Link>
                <Link style={linkStyle} to="/login">
                  Login
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

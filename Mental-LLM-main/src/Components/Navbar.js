import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase'; 

function Navbar1() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
      setAuthChecked(true); 
    });

    return () => unsubscribe(); 
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false); 
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!authChecked) {
  
    return null; 
  }

  return (
    <div>
      <Navbar className='custom-navbar' variant="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/" className='logo-nav'>UNWIRE</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link className='nav-links' href="about">About Us</Nav.Link>
              <Nav.Link href="more-info" className='nav-links'>More Info</Nav.Link>
              <Nav.Link href="faqs" className='nav-links'>FAQs</Nav.Link>
              {isLoggedIn ? (
                <Dropdown align="end">
                  <Dropdown.Toggle as={Nav.Link} className='nav-links' id="dropdown-profile">
                    <FaUserCircle size={24} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.ItemText>
                      <strong>{user.displayName}</strong><br />
                      {user.email}
                    </Dropdown.ItemText>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link href="login" className='nav-links'>SignUp/Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbar1;

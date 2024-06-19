import React, { useEffect } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import logo from '../assets/logo.png'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { handleLogout } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { orderItems } = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.auth.userInfo); // Access userInfo directly from state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();


  const logoutHandler = async () => {
    try {
      const response = await logoutApiCall(); // Call the logout API
      if (response.error) {
        throw new Error(response.error.message || 'Logout failed');
      }

      dispatch(handleLogout()); // Dispatch the logout action
      navigate('/login'); // Navigate to the login page after successful logout
    } catch (err) {
      console.error('Logout error:', err);
      // Handle error logging out, such as displaying an error message to the user
    }
  };


  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt='ProShop' />
              ProShop
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {orderItems.length > 0 && (
                    <span className='badge bg-light text-dark'>
                      {orderItems.reduce((a, c) => a + Number(c.qty), 0)}
                    </span>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username' >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/categorylist'>
                    <NavDropdown.Item>Categories</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/reviewlist'>
                    <NavDropdown.Item>Reviews</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/shippinglist'>
                    <NavDropdown.Item>Shipping</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

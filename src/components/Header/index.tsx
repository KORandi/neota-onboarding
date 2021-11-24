import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
} from 'reactstrap';

const Navigator: React.FunctionComponent = function () {
  return (
    <div>
      <Navbar
        color="light"
        expand="md"
        light
      >
        <NavbarBrand href="/">
          Neota Weather Watcher
        </NavbarBrand>
        <NavbarToggler />
        <Collapse navbar>
          <Nav
            className="me-auto"
            navbar
          >
            <NavItem>
              <Link to="/" className="nav-link">List</Link>
            </NavItem>
            <NavItem>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigator;

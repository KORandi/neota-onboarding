import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

interface INavigatorProps {
  menuItemList?: string[]
}

const Navigator: React.FunctionComponent<INavigatorProps> = function () {
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
              <NavLink href="/">
                List
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/dashboard">
                Dashboard
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigator;

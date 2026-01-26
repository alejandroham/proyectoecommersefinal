import { Navbar, Nav, Container } from "react-bootstrap";
import { MENUS } from "../data/menus";
import { Link } from "react-router-dom";

const CategoryMenu = ({ role }) => {
  const menuItems = MENUS[role] || [];

  return (
    <Navbar className="category-menu navbar-expand-md navbar-light">
      <Container fluid>
        <Nav className="w-100 justify-content-around text-center">
          {menuItems.map((item, index) => (
            <Nav.Link
              key={index}
              as={Link}
              to={item.path}
              className="category-item"
            >
              {item.icon}{" "}
              <span className="d-none d-md-inline">{item.label}</span>
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CategoryMenu;

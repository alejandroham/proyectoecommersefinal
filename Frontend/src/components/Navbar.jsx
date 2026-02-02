import { Navbar, Nav, Container } from "react-bootstrap";
import { MENUS } from "../data/menus";
import { Link } from "react-router-dom";

const CategoryMenu = ({ role }) => {
  const menuItems = MENUS[role] || [];

  return (
    <Navbar className="category-menu" expand="md">
      <Container className="category-container">
        <Nav className="category-nav">
          {menuItems.map((item, index) => (
            <Nav.Link
              key={index}
              as={Link}
              to={item.path}
              className="category-item"
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CategoryMenu;

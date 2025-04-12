import "./NavbarComp.css"
import {Navbar, Nav, Button} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

const NavbarComp = () => {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <Navbar className="h-10 fixed-top" bg="transparent" variant="dark" expand="lg">

            <Navbar.Brand id="logo" onClick={() => handleNavigation("/")}>LOGO</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link className="navButtons" onClick={() => handleNavigation("/")}>Home</Nav.Link>
                    <Nav.Link className="navButtons" onClick={() => handleNavigation("/")}>Ticket</Nav.Link>
                    <Nav.Link className="navButtons"
                              onClick={() => handleNavigation("/trainer/default")}>Trainer</Nav.Link>
                    <Nav.Link className="navButtons" href="#diet">Diet</Nav.Link>
                    <Nav.Link className="navButtons" href="#contact">Contact</Nav.Link>
                    <Nav.Link className="navButtons" onClick={() => handleNavigation("/admin")}>Admin</Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    <Button className={"mainAppButton border-0 me-4 rounded-5 logInButton"}
                            onClick={() => handleNavigation("/login")}>Log in</Button>
                </Nav>

            </Navbar.Collapse>
        </Navbar>

    )
}

export default NavbarComp
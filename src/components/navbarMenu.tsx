import { Link } from 'react-router-dom';

import { Nav, Navbar } from 'react-bootstrap';

export default function NavbarMenu() {
    return (
        <Navbar bg="light" variant="light" className="justify-content-center">
            <Nav>
                <Nav.Item as="li">
                    <Link className="nav-link" to="/">Cadastrar Pauta</Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Link className="nav-link" to="/pauta/list">Votar Pauta</Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Link className="nav-link" to="/voto/list">Votos</Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    );
}
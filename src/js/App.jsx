import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import {Container, Navbar, Nav, Row} from 'react-bootstrap';

import Home from './components/Home';
import Lists from './components/Lists';
import NotFound from './components/NotFound';

import '../css/App.css';

class App extends Component {
    render() {
        return (
            <Container>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">React Master - Todo App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <li>
                                <Link to="/">
                                    <span className="nav-link">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/list">
                                    <span className="nav-link">Lists</span>
                                </Link>
                            </li>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Switch>
                    <Route exact path="/" component={Home} />

                    {/*Not exact, will match both /lists and /lists/:type*/}
                    <Route path="/list" component={Lists} />

                    {/*Fallback*/}
                    <Route component={NotFound} />
                </Switch>
            </Container>
        );
    }
}

export default App;

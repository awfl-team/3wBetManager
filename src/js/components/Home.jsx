import React, { Component } from 'react';
import logo                 from '../../images/logo.png';
import Button from '@material-ui/core/Button';

class Home extends Component {
    render() {
        return (
            <section>
                <img src={logo} alt="logo" />
                <p>
                    <Button variant="contained" color="primary">
                        Hello World
                    </Button>
                    React Master starter app.
                </p>
            </section>
        );
    }
}

export default Home;

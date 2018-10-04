import React, { Component } from 'react';
import logo                 from '../../images/logo.png';

class Home extends Component {
    render() {
        return (
            <section>
                <img src={logo} alt="logo" />
                <p>
                    React Master starter app.
                </p>
            </section>
        );
    }
}

export default Home;

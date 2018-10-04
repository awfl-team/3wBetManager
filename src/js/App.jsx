import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';

import Home from './components/Home';
import Lists from './components/Lists';
import NotFound from './components/NotFound';


class App extends Component {
    render() {
        return (


                <Switch>
                    <Route exact path="/" component={Home} />

                    {/*Not exact, will match both /lists and /lists/:type*/}
                    <Route path="/list" component={Lists} />

                    {/*Fallback*/}
                    <Route component={NotFound} />
                </Switch>
        );
    }
}

export default App;

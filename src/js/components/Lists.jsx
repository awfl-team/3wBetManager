import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import List from './List';

class Lists extends Component {
    render() {
        let prefix = this.props.match.url;

        return (
            <div>
                <h1>Lists</h1>
                <ul>
                    <li>
                        <Link to={`${prefix}/movies`}>Movies</Link>
                    </li>
                    <li>
                        <Link to={`${prefix}/musics`}>Musics</Link>
                    </li>
                </ul>

                <Switch>
                    <Route exact path={prefix} render={() => <h3>Please select a list.</h3>}/>
                    <Route path={`${prefix}/:type`} component={List} />
                </Switch>
            </div>
        );
    }
}

export default Lists;

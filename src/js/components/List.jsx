import React, {Component} from 'react';

class List extends Component {
    render() {
        return (
            <div>
                <h2>List {this.props.match.params.type}</h2>

            </div>
        );
    }
}

export default List;

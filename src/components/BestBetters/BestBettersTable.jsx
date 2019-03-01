import React from 'react';
import {
  Icon, Label, Rating, Table,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserService from '../../service/UserService';

class BestBettersTable extends React.Component {
  state = {
    top50: [],
  };

  componentDidMount() {
    UserService.getTop50Betters().then((response) => {
      this.setState({ top50: response.data });
    });
  }

  render() {
    const { top50 } = this.state;
    return (
      <div id="bestBettersTable">
        <Table celled structured compact inverted unstackable>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell rowSpan="2">#</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">Username</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">Score</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">Lives</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">Nb bets</Table.HeaderCell>
              <Table.HeaderCell colSpan="3">Nb bets per type</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">Actions</Table.HeaderCell>
            </Table.Row>
            <Table.Row textAlign="center">
              <Table.HeaderCell>
                <Label color="red">
                  Wrong
                </Label>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Label color="orange">
                  Ok
                </Label>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Label color="green">
                  Perfect
                </Label>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {top50.map((user, index) => (
              <Table.Row key={user.Id} textAlign="center">
                <Table.Cell>
                  {index + 1 === 1
                  && <Icon name="fire" color="red" size="big" />
                  }
                  {index + 1 === 2
                  && <Icon name="fire" color="yellow" size="big" />
                  }
                  {index + 1 === 3
                  && <Icon name="fire" size="big" />
                  }
                  {index + 1 > 3
                  && index + 1
                  }
                </Table.Cell>
                <Table.Cell>{user.Username}</Table.Cell>
                <Table.Cell>
                  <Icon color="yellow" name="copyright" size="big" />
                  <label color="yellow">{user.Point}</label>
                </Table.Cell>
                <Table.Cell>
                  <Rating icon="heart" rating={user.Life} maxRating={3} disabled size="huge" />
                </Table.Cell>
                <Table.Cell>{user.NbBets}</Table.Cell>
                <Table.Cell>{user.NbWrongBets}</Table.Cell>
                <Table.Cell>{user.NbOkBets}</Table.Cell>
                <Table.Cell>{user.NbPerfectBets}</Table.Cell>
                <Table.Cell>
                  {!user.IsPrivate
                  && (
                  <Link to={`/user/${user.Id}`} className="button ui blue small icon">
                    <Icon name="eye" />
                  </Link>
                  )
                  }
                </Table.Cell>
              </Table.Row>

            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default BestBettersTable;

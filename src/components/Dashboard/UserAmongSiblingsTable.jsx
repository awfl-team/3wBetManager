import React from 'react';
import {
  Icon, Label, Rating, Table,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserService from '../../service/UserService';

class UserAmongSiblingsTable extends React.Component {
  state = {
    userAmongSiblings: [],
  };

  componentDidMount() {
    UserService.getCurrentUserAmongSiblings().then(((response) => {
      this.setState({ userAmongSiblings: response.data });
    }));
  }

  render() {
    const { userAmongSiblings } = this.state;
    return (
      <Table celled structured inverted compact unstackable className="primary-bg">
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell rowSpan="2">Username</Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">Score</Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">Lives</Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">Nb bets</Table.HeaderCell>
            <Table.HeaderCell colSpan="3">Nb bets per type</Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">Actions</Table.HeaderCell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.HeaderCell>
              <Label className="redLabel">
                Wrong
              </Label>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Label className="orangeLabel">
                Ok
              </Label>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Label className="greenLabel">
                Perfect
              </Label>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userAmongSiblings.length > 0
            && userAmongSiblings.map(user => (
              <Table.Row key={user.Id} textAlign="center" active={user.IsCurrent}>
                <Table.Cell>{user.Username}</Table.Cell>
                <Table.Cell>
                  <Icon color="yellow" name="copyright" size="big" />
                  <span color="yellow">{user.Point}</span>
                </Table.Cell>
                <Table.Cell>
                  <Rating icon="heart" rating={user.Life} maxRating={3} disabled size="huge" />
                </Table.Cell>
                <Table.Cell>{user.NbBets}</Table.Cell>
                <Table.Cell>{user.NbWrongBets}</Table.Cell>
                <Table.Cell>{user.NbOkBets}</Table.Cell>
                <Table.Cell>{user.NbPerfectBets}</Table.Cell>
                <Table.Cell>
                  {!user.IsPrivate && !user.IsCurrent
                && (
                  <Link to={`/user/${user.Id}`} className="button ui blue small icon">
                    <Icon name="eye" className="whiteColor" />
                  </Link>
                )
                }
                </Table.Cell>
              </Table.Row>
            ))}

        </Table.Body>
      </Table>
    );
  }
}

export default UserAmongSiblingsTable;

import React from 'react';
import { Icon, Label, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserService from '../../service/UserService';
import TableSkeleton from '../SkeletonLoaders/TableSkeleton';

class UserAmongSiblingsTable extends React.Component {
  state = {
    userAmongSiblings: [],
    isLoading: true,
  };

  componentDidMount() {
    UserService.getCurrentUserAmongSiblings().then(((response) => {
      this.setState({
        userAmongSiblings: response.data,
        isLoading: false,
      });
    }));
  }

  render() {
    const { userAmongSiblings, isLoading } = this.state;
    return (
      <div>
        { isLoading ? (
          <TableSkeleton width={1700} height={300} />
        ) : (
          <Table celled structured inverted compact unstackable className="primary-bg">
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell rowSpan="2">Rank</Table.HeaderCell>
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
                  <Table.Cell>
                    {user.Rank === 1
                    && <Icon name="fire" color="red" size="big" />
                    }
                    {user.Rank === 2
                    && <Icon name="fire" color="yellow" size="big" />
                    }
                    {user.Rank === 3
                    && <Icon name="fire" size="big" />
                    }
                    {user.Rank > 3
                    && `# ${user.Rank}`
                    }
                  </Table.Cell>
                  <Table.Cell>{user.Username}</Table.Cell>
                  <Table.Cell>
                    <span>{user.Point}</span>
                    {' '}
                    <Icon color="yellow" name="copyright" size="large" />
                  </Table.Cell>
                  <Table.Cell>
                    <div>
                      <span>{user.Life}</span>
                      {' '}
                      <Icon color="red" name="heart" size="large" />
                    </div>
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
        )
        }
      </div>
    );
  }
}

export default UserAmongSiblingsTable;

import React from 'react';
import {
  Button, Container, Header, Icon, Image, Label, Table,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import UserService from '../../service/UserService';
import ItemService from '../../service/ItemService';
import { addSnackBar } from '../../actions/SnackBarActions';

function mapDispatchToProps(dispatch) {
  return {
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
  };
}

class Bomb extends React.Component {
  state = {
    userAmongSiblings: [],
  };

  componentDidMount() {
    UserService.getCurrentUserAmongSiblings().then(((response) => {
      this.setState({ userAmongSiblings: response.data });
    }));
  }

  handleClick = (userId) => {
    ItemService.useBomb(userId).then(() => {
      this.props.addSnackbar({
        message: 'Bomb used',
        type: 'success',
      });
    });
  };

  render() {
    const { userAmongSiblings } = this.state;
    const { currentUser } = this.props;

    return (
      <div id="bomb">
        <Header as="h1" icon textAlign="center">
          <div className="header-custom-image-container">
            <Image src="assets/images/bomb-x1.svg" className="image-icon-header" />
          </div>
          <Header.Content>
                Bomb
          </Header.Content>
        </Header>
        <Container textAlign="center" fluid>
          <div className="scrollable-table-container">
            <Table celled structured inverted compact unstackable className="primary-bg">
              <Table.Header>
                <Table.Row textAlign="center">
                  <Table.HeaderCell rowSpan="2">Username</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">Score</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">Lives</Table.HeaderCell>
                  <Table.HeaderCell colSpan="3">Nb bets per type</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">Actions</Table.HeaderCell>
                </Table.Row>
                <Table.Row textAlign="center">
                  <Table.HeaderCell>
                    <Label className="redLabel">Wrong</Label>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Label className="orangeLabel">Ok</Label>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Label className="greenLabel">Perfect</Label>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {userAmongSiblings.length > 0
                  && userAmongSiblings.map(user => (
                    <Table.Row key={user.Id} textAlign="center" active={user.IsCurrent}>
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
                      <Table.Cell>{user.NbWrongBets}</Table.Cell>
                      <Table.Cell>{user.NbOkBets}</Table.Cell>
                      <Table.Cell>{user.NbPerfectBets}</Table.Cell>
                      <Table.Cell textAlign="center">
                        {user.Username !== currentUser.unique_name
                        && (
                          <Button.Group>
                            <Button
                              onClick={() => this.handleClick(user.Id)}
                              inverted
                              className="green"
                              fluid
                            >
                              <div className="custom-button-image-container">
                                <Image src="assets/images/bomb-x1.svg" className="image-icon-button" />
                              </div>
                            </Button>
                          </Button.Group>
                        )
                        }
                      </Table.Cell>
                    </Table.Row>
                  ))}

              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>
    );
  }
}

const bomb = connect(null, mapDispatchToProps)(Bomb);
export default bomb;

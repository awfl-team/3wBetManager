import React from 'react';
import {
  Button, Container, Header, Icon, Image, Menu, Pagination, Table,
} from 'semantic-ui-react';
import moment from 'moment';
import connect from 'react-redux/es/connect/connect';
import { NavLink } from 'react-router-dom';
import BetService from '../../service/BetService';
import ItemService from '../../service/ItemService';
import Item from '../../model/Item';
import { addSnackBar } from '../../actions/SnackBarActions';
import UserService from '../../service/UserService';
import AudioHandlerService from '../../service/AudioHandlerService';

function mapDispatchToProps(dispatch) {
  return {
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
  };
}

class MultiplierByTen extends React.Component {
  state = {
    bets: [],
    totalPages: 1,
    nbMultiplierByTen: 0,
    activeItem: 'items',
    currentPage: 1,
  };

  componentDidMount() {
    BetService.getUserFinishedBetsPaginated()
      .then((response) => {
        this.setState({
          bets: response.data.Items,
          totalPages: response.data.TotalPages,
        });
      });
    UserService.getFromToken().then((res) => {
      this.setState({
        nbMultiplierByTen: res.data.Items.filter(
          item => item.Type === Item.TYPE_MULTIPLY_BY_TEN,
        ).length,
      });
    });
  }

  getNextBets(event) {
    this.setState({ currentPage: event.target.getAttribute('value') });
    BetService.getUserFinishedBetsPaginated(event.target.getAttribute('value'))
      .then((response) => {
        this.setState({
          bets: response.data.Items,
          totalPages: response.data.TotalPages,
        });
      });
  }

  handleClick = (betId, multiplierValue) => {
    ItemService.useMultiplier(betId, multiplierValue).then(() => {
      this.props.addSnackbar({
        message: 'Multiplier used',
        type: 'success',
      });
      BetService.getUserFinishedBetsPaginated(this.state.currentPage)
        .then((response) => {
          this.setState({
            bets: response.data.Items,
            totalPages: response.data.TotalPages,
          });
        });
      AudioHandlerService.useMultiplier();
      this.setState(prevState => ({ nbMultiplierByTen: prevState.nbMultiplierByTen - 1 }));
    });
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const {
      bets, totalPages, nbMultiplierByTen, activeItem,
    } = this.state;

    return (
      <div id="multiplicator">
        <Container fluid>
          <div id="inlineMenu">
            <Menu>
              <Menu.Item
                as={NavLink}
                name="shop"
                onClick={this.handleItemClick}
                active={activeItem === 'shop'}
                to="/shop"
              >
                Shop
              </Menu.Item>
              <Menu.Item
                as={NavLink}
                name="items"
                onClick={this.handleItemClick}
                active={activeItem === 'items'}
                to="/items"
              >
                My items
              </Menu.Item>
            </Menu>
          </div>
        </Container>
        <Header as="h1" icon textAlign="center">
          <div className="header-custom-image-container">
            <Image src="assets/images/multiplier-x10.svg" className="image-icon-header" />
          </div>
          <Header.Content>
            Multiplier (
            { nbMultiplierByTen }
            )
          </Header.Content>
        </Header>
        {bets.length > 0
        && (
        <Container textAlign="center" fluid>
          <div className="scrollable-table-container">
            <Table celled striped unstackable structured inverted className="primary-bg">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Competition</Table.HeaderCell>
                  <Table.HeaderCell>Match date</Table.HeaderCell>
                  <Table.HeaderCell>Home team</Table.HeaderCell>
                  <Table.HeaderCell>Away team</Table.HeaderCell>
                  <Table.HeaderCell>Bet</Table.HeaderCell>
                  <Table.HeaderCell>Home team odds</Table.HeaderCell>
                  <Table.HeaderCell>Draw odds</Table.HeaderCell>
                  <Table.HeaderCell>Away team odds</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {bets.map(bet => (
                  <Table.Row key={bet.Id} className={bet.Multiply !== 0 ? 'bet buffed' : ''}>
                    <Table.Cell>{bet.Match.Competition.Name}</Table.Cell>
                    <Table.Cell>{moment(bet.Match.UtcDate).format('MM-DD-YYYY')}</Table.Cell>
                    <Table.Cell>{bet.Match.HomeTeam.Name}</Table.Cell>
                    <Table.Cell>{bet.Match.AwayTeam.Name}</Table.Cell>
                    <Table.Cell>
                      {bet.HomeTeamScore}
                      -
                      {bet.AwayTeamScore}
                    </Table.Cell>
                    <Table.Cell>{bet.Match.HomeTeamRating}</Table.Cell>
                    <Table.Cell>{bet.Match.DrawRating}</Table.Cell>
                    <Table.Cell>{bet.Match.AwayTeamRating}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button.Group>
                        <Button
                          inverted
                          className="green"
                          fluid
                          onClick={() => this.handleClick(bet.Id, Item.MULTIPLIER_BY_10)}
                          disabled={!!(nbMultiplierByTen !== 0 && bet.Multiply !== 0)}
                        >
                          <div className="custom-button-image-container">
                            <Image src="assets/images/multiplier-x10.svg" className="image-icon-button" />
                          </div>
                        </Button>
                      </Button.Group>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          {totalPages > 1
          && (
            <Pagination
              ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
              firstItem={null}
              lastItem={null}
              defaultActivePage={1}
              prevItem={{ content: <Icon name="angle left" />, icon: true }}
              nextItem={{ content: <Icon name="angle right" />, icon: true }}
              totalPages={totalPages}
              onPageChange={event => this.getNextBets(event)}
            />
          )
          }
        </Container>
        )
        }
        {bets.length === 0
        && (
        <h2>You have no bets</h2>
        )
        }
      </div>
    );
  }
}

const multiplierByTen = connect(null, mapDispatchToProps)(MultiplierByTen);
export default multiplierByTen;

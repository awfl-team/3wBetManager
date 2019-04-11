import React from 'react';
import {
  Button, Header, Icon, Image, Modal, Pagination, Table,
} from 'semantic-ui-react';
import moment from 'moment';
import connect from 'react-redux/es/connect/connect';
import BetService from '../../service/BetService';
import ItemService from '../../service/ItemService';
import Item from '../../model/Item';
import { addSnackBar } from '../../actions/SnackBarActions';

function mapDispatchToProps(dispatch) {
  return {
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
  };
}

class MultiplierByTen extends React.Component {
  state = {
    bets: [],
    totalPages: 1,
  };

  componentDidMount() {
    BetService.getUserFinishedBetsPaginated()
      .then((response) => {
        this.setState({
          bets: response.data.Items,
          totalPages: response.data.TotalPages,
        });
      });
  }

  getNextBets(event) {
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
    });
  };

  render() {
    const {
      bets, totalPages,
    } = this.state;

    return (
      <div id="multiplicator">
        <Modal.Content scrolling>
          <Modal.Description>
            <Header as="h1" icon textAlign="center">
              <div className="header-custom-image-container">
                <Image src="assets/images/multiplier-x10.svg" className="image-icon-header" />
              </div>
              <Header.Content>
                Multiplier
              </Header.Content>
            </Header>
            <div className="scrollable-table-container">
              <Table celled striped unstackable inverted className="primary-bg">
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
                    <Table.Row key={bet.Id}>
                      <Table.Cell>{bet.Match.Competition.Name}</Table.Cell>
                      <Table.Cell>{moment(bet.Match.UtcDate).format('MM/DD/YYYY')}</Table.Cell>
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
                      <Table.Cell>
                        <Button
                          inverted
                          className="green"
                          fluid
                          onClick={() => this.handleClick(bet.Id, Item.MULTIPLIER_BY_10)}
                        >
                          <div className="custom-button-image-container">
                            <Image src="assets/images/multiplier-x10.svg" className="image-icon-button" />
                          </div>
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
            {bets.length >= 10
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
          </Modal.Description>
        </Modal.Content>
      </div>
    );
  }
}

const multiplierByTen = connect(null, mapDispatchToProps)(MultiplierByTen);
export default multiplierByTen;

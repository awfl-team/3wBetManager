import React from 'react';
import {
  Button, Header, Icon, Table,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import ItemHttpService from '../../httpServices/ItemHttpService';
import { addSnackBar } from '../../actions/SnackBarActions';

function mapDispatchToProps(dispatch) {
  return {
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
  };
}

class AdminItemsManager extends React.Component {
  state = {
    items: [],
  };

  componentDidMount() {
    ItemHttpService.getAllItems().then((res) => {
      this.setState({ items: res.data });
    });
  }

  handleCostChange = (event, itemId) => {
    const { items } = this.state;
    const index = items.findIndex(item => item.Id === itemId);
    items[index].Cost = event.target.value;
    this.setState({ items });
  };

  handleRarityChange = (event, itemId) => {
    const { items } = this.state;
    const index = items.findIndex(item => item.Id === itemId);
    items[index].Rarity = event.target.value;
    this.setState({ items });
  };

  submitCost = (item) => {
    ItemHttpService.updateCost(item).then(() => {
      this.props.addSnackbar({
        message: 'Item update',
        type: 'success',
      });
    });
  };


  render() {
    const { items } = this.state;
    return (
      <div id="adminItemsManager">
        <Header as="h1" icon textAlign="center">
          <Icon name="shop" circular />
          <Header.Content>
            Items (
            {items.length}
            )
          </Header.Content>
        </Header>
        <div className="items-table">
          <Table celled structured compact inverted unstackable className="primary-bg">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Cost</Table.HeaderCell>
                <Table.HeaderCell>Rarity</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items.map(item => (
                <Table.Row key={item.Id}>
                  <Table.Cell>{item.Name}</Table.Cell>
                  <Table.Cell>
                    <div className="ui form">
                      <div className="field">
                        <input
                          className="fluid"
                          type="text"
                          name="cost"
                          placeholder="Cost"
                          defaultValue={item.Cost}
                          onChange={event => this.handleCostChange(event, item.Id)}
                        />
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="ui form">
                      <div className="field">
                        <select
                          className="ui fluid search dropdown"
                          defaultValue={item.Rarity}
                          name="rarity"
                          onChange={event => this.handleRarityChange(event, item.Id)}
                        >
                          <option>Common</option>
                          <option>Rare</option>
                          <option>Epic</option>
                          <option>Legendary</option>
                        </select>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => this.submitCost(item)} type="button" circular color="green" size="large">Submit</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

const adminItemsManager = connect(null, mapDispatchToProps)(AdminItemsManager);
export default adminItemsManager;

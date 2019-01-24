import React from 'react';
import { Icon, Label, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class BestBettersCurrentUserTable extends React.Component {
  render() {
    return (
      <div id="bestBettersCurrentUserTable">
        <Table celled structured compact inverted>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell rowSpan="2">#</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">Username</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">Score</Table.HeaderCell>
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
            <Table.Row textAlign="center">
              <Table.Cell>Alpha Team</Table.Cell>
              <Table.Cell>Project 1</Table.Cell>
              <Table.Cell>2</Table.Cell>
              <Table.Cell>2</Table.Cell>
              <Table.Cell>
                jpp
              </Table.Cell>
              <Table.Cell />
              <Table.Cell />
              <Table.Cell>
                <Link to="/xd" className="button ui blue small icon">
                  <Icon name="eye" />
                </Link>
              </Table.Cell>
            </Table.Row>
            <Table.Row textAlign="center">
              <Table.Cell>Alpha Team</Table.Cell>
              <Table.Cell>Project 1</Table.Cell>
              <Table.Cell>2</Table.Cell>
              <Table.Cell>2</Table.Cell>
              <Table.Cell>
                jpp
              </Table.Cell>
              <Table.Cell />
              <Table.Cell />
              <Table.Cell>
                <Link to="/xd" className="button ui blue small icon">
                  <Icon name="eye" />
                </Link>
              </Table.Cell>
            </Table.Row>
            <Table.Row textAlign="center">
              <Table.Cell>Alpha Team</Table.Cell>
              <Table.Cell>Project 1</Table.Cell>
              <Table.Cell>2</Table.Cell>
              <Table.Cell>2</Table.Cell>
              <Table.Cell>
                jpp
              </Table.Cell>
              <Table.Cell />
              <Table.Cell />
              <Table.Cell>
                <Link to="/xd" className="button ui blue small icon">
                  <Icon name="eye" />
                </Link>
              </Table.Cell>
            </Table.Row>
            <Table.Row textAlign="center">
              <Table.Cell>Alpha Team</Table.Cell>
              <Table.Cell>Project 1</Table.Cell>
              <Table.Cell>2</Table.Cell>
              <Table.Cell>2</Table.Cell>
              <Table.Cell>
                jpp
              </Table.Cell>
              <Table.Cell />
              <Table.Cell />
              <Table.Cell>
                <Link to="/xd" className="button ui blue small icon">
                  <Icon name="eye" />
                </Link>
              </Table.Cell>
            </Table.Row>
            <Table.Row textAlign="center">
              <Table.Cell>Alpha Team</Table.Cell>
              <Table.Cell>Project 1</Table.Cell>
              <Table.Cell>2</Table.Cell>
              <Table.Cell>2</Table.Cell>
              <Table.Cell>
                jpp
              </Table.Cell>
              <Table.Cell />
              <Table.Cell />
              <Table.Cell>
                <Link to="/xd" className="button ui blue small icon">
                  <Icon name="eye" />
                </Link>
              </Table.Cell>
            </Table.Row>
            <Table.Row textAlign="center">
              <Table.Cell>Alpha Team</Table.Cell>
              <Table.Cell>Project 1</Table.Cell>
              <Table.Cell>2</Table.Cell>
              <Table.Cell>2</Table.Cell>
              <Table.Cell>
                jpp
              </Table.Cell>
              <Table.Cell />
              <Table.Cell />
              <Table.Cell>
                <Link to="/xd" className="button ui blue small icon">
                  <Icon name="eye" />
                </Link>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default BestBettersCurrentUserTable;

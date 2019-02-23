import React from 'react';
import { Icon, Label, Rating, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class UserAmongSiblingsTable extends React.Component {
  render() {
    {/* @todo get currentUser position and -10 users and +10 users around currentUser */}
    {/* @todo if more users than 21 -> max(+10) | currentUser | max(-10)   */}
    {/* @todo If user is public then add a link to it   */}
    return (
      <Table celled structured inverted compact unstackable>
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
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center" active>
            <Table.Cell>46</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>45</Table.Cell>
            <Table.Cell>UserName</Table.Cell>
            <Table.Cell><Icon color="yellow" name="copyright" size="big" />
              <label color="yellow">500</label></Table.Cell>
            <Table.Cell>
              <Rating icon="heart" rating={2} maxRating={3} disabled size="huge" />
            </Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Link to={`/user/1`} className="button ui blue small icon">
                <Icon name="eye" />
              </Link>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default UserAmongSiblingsTable;

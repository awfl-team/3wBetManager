import React from 'react';
import { Button, Icon, List, Rating } from 'semantic-ui-react';
import UserService from "../../service/UserService";

class Top3 extends React.Component {
  state = {
    usersTop3: []
  };

  componentDidMount() {
    UserService.getTop3().then((response) => {
      this.setState({ usersTop3: response.data})
    });
  }

  render() {
    const { usersTop3 } = this.state;

    return (
      <List divided relaxed>
        {usersTop3.length > 0
        && usersTop3.map((user, index) => (
          <List.Item key={index}>
            {index === 0
              && <List.Icon name="fire" color="red" size="big" verticalAlign="middle" />
            }
            {index === 1
            &&  <List.Icon name="fire" color="yellow" size="big" verticalAlign="middle" />
            }
            {index === 2
            && <List.Icon name="fire" size="big" verticalAlign="middle" />
            }
            <List.Content>
              <List.Header as={user.IsPrivate === false ? 'a': ''}><h4>{user.Username}</h4></List.Header>
              <List.Description>
                <div><Rating icon="heart" rating={user.Life} maxRating={3} disabled /> | {user.Point} <Icon color="yellow" name="copyright" size="large" /> | {user.NbBets} <Icon name="ticket" size="large" /> </div>
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
        <List.Item>
          <List.Content>
            <List.Header>
              <Button>
                Top 50
                {' '}
                <Icon name="arrow right" />
              </Button>
            </List.Header>
          </List.Content>
        </List.Item>
      </List>
    );
  }
}

export default Top3;

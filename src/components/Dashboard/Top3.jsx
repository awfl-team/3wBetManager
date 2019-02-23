import React from 'react';
import { Button, Icon, List, Rating } from 'semantic-ui-react';

class Top3 extends React.Component {
  render() {
    {/* @todo get top 3 users */}
    {/* @todo link to user consult profil if public */}
    return (
      <List divided relaxed>
        <List.Item>
          <List.Icon name="fire" color="red" size="big" verticalAlign="middle" />
          <List.Content>
            <List.Header as="a">UserName 1</List.Header>
            <List.Description>
              <div><Rating icon="heart" rating={2} maxRating={3} disabled /> | {500} <Icon color="yellow" name="copyright" size="large" /> | 50 <Icon name="ticket" size="large" /> </div>
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="fire" color="yellow" size="big" verticalAlign="middle" />
          <List.Content>
            <List.Header as="a">UserName 1</List.Header>
            <List.Description>
              <div><Rating icon="heart" rating={2} maxRating={3} disabled /> | {500} <Icon color="yellow" name="copyright" size="large" /> | 50 <Icon name="ticket" size="large" /> </div>
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="fire" size="big" verticalAlign="middle" />
          <List.Content>
            <List.Header as="a">UserName 1</List.Header>
            <List.Description>
              <div><Rating icon="heart" rating={2} maxRating={3} disabled /> | {500} <Icon color="yellow" name="copyright" size="large" /> | 50 <Icon name="ticket" size="large" /> </div>
            </List.Description>
          </List.Content>
        </List.Item>
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

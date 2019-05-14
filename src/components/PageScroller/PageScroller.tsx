import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

class PageScroller extends React.Component {
  handleClick() {
    document.getElementById('scroll-anchor').scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return (
      <div id="PageScroller">
        <Button
          color="red"
          size="huge"
          circular={true}
          icon={true}
          onClick={this.handleClick}
        >
          <Icon name="arrow up" />
        </Button>
      </div>
    );
  }
}

export default PageScroller;

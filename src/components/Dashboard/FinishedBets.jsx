import React from 'react';
import { Icon, Label, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import BetService from "../../service/BetService";
import {Table} from "semantic-ui-react/dist/commonjs/collections/Table/Table";
import moment from "moment";

class FinishedBets extends React.Component {

  state = {
    finishedBets: [],
  };

  componentDidMount() {
    BetService.getFinishBetLimited().then((response) => {
       this.setState({finishedBets: response.data});
    });
  }

  render() {
    const { finishedBets } = this.state;
    return (
      <List divided relaxed>
        {finishedBets.length > 0
          && finishedBets.map((finishedBet, index) => (
            <List.Item key={index}>
              <List.Content>
                <List.Header><h4>{finishedBet.Match.HomeTeam.Name} VS {finishedBet.Match.AwayTeam.Name}</h4></List.Header>
                <List.Description><p>{finishedBet.Match.Competition.Name} | {moment(finishedBet.Match.UtcDate).format('MM-DD-YYYY')}</p></List.Description>
                <List.Description>
                  <Label color="blue">Result : {finishedBet.Match.Score.FullTime.HomeTeam} - {finishedBet.Match.Score.FullTime.AwayTeam}</Label> | <Label>Bet : {finishedBet.HomeTeamScore} - {finishedBet.AwayTeamScore}</Label> | <Label color="green">{finishedBet.Status}</Label> | <Icon name="copyright" color="yellow" size="large" /> {finishedBet.PointsWon}
                </List.Description>
              </List.Content>
            </List.Item>
        ))}
        {finishedBets.length > 0
          && <List.Item>
            <List.Content>
              <List.Header>
                <Link to={`/bet/mybets`} className="button ui icon"> My results <Icon name="arrow right" />
                </Link>
              </List.Header>
            </List.Content>
          </List.Item>
        }
        {finishedBets.length === 0
        && <List.Item>
          <List.Content>
            <List.Header><h4>You have no finished bets</h4></List.Header>
          </List.Content>
        </List.Item>
        }
      </List>
    );
  }
}

export default FinishedBets;

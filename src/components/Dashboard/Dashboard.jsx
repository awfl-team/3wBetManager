import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import StatsBuilderService from '../../service/StatsBuilderService';
import {Button, Card, Container, Feed, Grid, Header, Icon, Image, Label, List, Rating, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";
import GraphService from '../../service/GraphService';

let dataBuild;

class Dashboard extends React.Component {
  state = {
    datasetPieGraph: [],
    isDatasetBetsActive: true,
    isDatasetCoinsActive: false,
  };

  componentWillMount() {
    this.loadBetsPerTypeDataset();
  }

  loadBetsPerTypeDataset = () => {
    GraphService.getBetsByTypeData().then((response) => {
      const datas = response.data;

      if (Object.entries(response.data).length > 0 && (response.data.wrongBets !== 0 && response.data.okBets !== 0 && response.data.perfectBets !== 0)) {
        let labels = ['Wrong', 'Ok', 'Perfect'];
        let nbBets = Object.values(datas);
        let colors = ['#DB2828', '#F2711C', '#21BA45'];
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(nbBets, labels, colors);
      } else {
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(['100'], ['NaN'], ['']);
      }
      this.setState({datasetPieGraph: dataBuild,
        isDatasetBetsActive: true,
        isDatasetCoinsActive: false,
      });
    });
  };

  loadCoinsUsageDataset = () => {
    GraphService.getCoinsStats().then((response) => {
      const datas = response.data;

      if (Object.entries(response.data).length > 0) {
        let labels = ['Coins used to bet', 'Bets earnings'];
        let nbBets = Object.values(datas);
        let colors = ['#3949ab', '#d81b60', '#ffa000'];
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(nbBets, labels, colors);
      } else {
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(['100'], ['NaN'], ['']);
      }
      this.setState({datasetPieGraph: dataBuild,
        isDatasetBetsActive: false,
        isDatasetCoinsActive: true,
      });
    });
  }



  render() {
    const { datasetPieGraph, isDatasetBetsActive, isDatasetCoinsActive } = this.state;
    return (
      <div id="dashboard">
        <Header as="h1" icon textAlign="center">
          <Icon name="dashboard" circular />
          <Header.Content>Dashboard</Header.Content>
        </Header>
        <Container textAlign="center" fluid>
          <Grid>
            <Grid.Row columns={16}>
              <Grid.Column textAlign="center" computer={8} mobile={16}>
                <Card fluid>
                  {/* @todo get 4 most recent finished bets */}
                  <Card.Content>
                    <Card.Header>Finished bets</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <List divided relaxed>
                      <List.Item>
                        <List.Content>
                          <List.Header><h4>HomeTeam VS AwayTeam</h4></List.Header>
                          <List.Description><p>RocketLeague | Match Date</p></List.Description>
                          <List.Description>
                            <Label color="blue">Result : 4 - 1</Label> | <Label>Bet : 4 - 1</Label> | <Label color="green"> Perfect </Label> | <Icon name="copyright" color="yellow" size="large" /> 500
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header><h4>HomeTeam VS AwayTeam</h4></List.Header>
                          <List.Description><p>RocketLeague | Match Date</p></List.Description>
                          <List.Description>
                            <Label color="blue">Result : 4 - 1</Label> | <Label>Bet : 4 - 1</Label> | <Label color="green"> Perfect </Label> | <Icon name="copyright" color="yellow" size="large" /> 500
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header><h4>HomeTeam VS AwayTeam</h4></List.Header>
                          <List.Description><p>RocketLeague | Match Date</p></List.Description>
                          <List.Description>
                            <Label color="blue">Result : 4 - 1</Label> | <Label>Bet : 4 - 1</Label> | <Label color="green"> Perfect </Label> | <Icon name="copyright" color="yellow" size="large" /> 500
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header><h4>HomeTeam VS AwayTeam</h4></List.Header>
                          <List.Description><p>RocketLeague | Match Date</p></List.Description>
                          <List.Description>
                            <Label color="blue">Result : 4 - 1</Label> | <Label>Bet : 4 - 1</Label> | <Label color="green"> Perfect </Label> | <Icon name="copyright" color="yellow" size="large" /> 500
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header>
                            <Link to={`/bet/myBets`} className="button ui icon">
                              See more <Icon name="arrow right"/>
                            </Link>
                          </List.Header>
                        </List.Content>
                      </List.Item>
                    </List>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column textAlign="center" computer={8} mobile={16}>
                <Card fluid>
                  <Card.Content>
                    {/* @todo get 4 most recent unfinished bets */}
                    <Card.Header>Available bets</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <List divided relaxed>
                      <List.Item>
                        <List.Content>
                          <List.Header><h4>HomeTeam VS AwayTeam</h4></List.Header>
                          <List.Description><p>RocketLeague | Match Date</p></List.Description>
                          <List.Description>
                            <Label>Bet : 4 - 1</Label>
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header><h4>HomeTeam VS AwayTeam</h4></List.Header>
                          <List.Description><p>RocketLeague | Match Date</p></List.Description>
                          <List.Description>
                            <Label>Bet : 4 - 1</Label>
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header><h4>HomeTeam VS AwayTeam</h4></List.Header>
                          <List.Description><p>RocketLeague  | Match Date </p></List.Description>
                          <List.Description>
                            <Label>Bet : 4 - 1</Label>
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header><h4>HomeTeam VS AwayTeam</h4></List.Header>
                          <List.Description><p>RocketLeague | Match Date</p></List.Description>
                          <List.Description>
                            <Label>Bet : 4 - 1</Label>
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header>
                            <Link to={`/bet/submitBets`} className="button ui icon">
                              See more <Icon name="arrow right"/>
                            </Link>
                          </List.Header>
                        </List.Content>
                      </List.Item>
                    </List>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={16}>
              <Grid.Column textAlign="center" computer={16} mobile={16}>
                <Card fluid className="betters-table-card">
                  <Card.Content>
                    {/* @todo get currentUser position and -10 users and +10 users around currentUser */}
                    {/* @todo if more users than 21 -> max(+10) | currentUser | max(-10)   */}
                    <Card.Header>Your position</Card.Header>
                  </Card.Content>
                  <Card.Content extra className="betters-table" id="userPositionAmongSiblings">
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                          <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                            <label color="yellow">500</label></Table.Cell>
                          <Table.Cell>
                            <Rating icon='heart' rating={2} maxRating={3} disabled size="huge" />
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
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={16}>
              <Grid.Column textAlign="center" computer={8} mobile={16}>
                <Card fluid>
                  <Card.Content>
                    {/* @todo get top 3 users */}
                    <Card.Header>Top 3</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <List divided relaxed>
                      <List.Item>
                        <List.Icon name="fire" color="red" size="big" verticalAlign='middle' />
                        <List.Content>
                          <List.Header as='a'>UserName 1</List.Header>
                          <List.Description>
                            <div><Rating icon="heart" rating={2} maxRating={3} disabled /> | {500} <Icon color="yellow" name="copyright" size="large" /> | 50 <Icon name="ticket" size="large" /> </div>
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name="fire" color="yellow" size="big" verticalAlign='middle' />
                        <List.Content>
                          <List.Header as='a'>UserName 1</List.Header>
                          <List.Description>
                            <div><Rating icon="heart" rating={2} maxRating={3} disabled /> | {500} <Icon color="yellow" name="copyright" size="large" /> | 50 <Icon name="ticket" size="large" /> </div>
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name="fire" size="big" verticalAlign='middle' />
                        <List.Content>
                          <List.Header as='a'>UserName 1</List.Header>
                          <List.Description>
                            <div><Rating icon="heart" rating={2} maxRating={3} disabled /> | {500} <Icon color="yellow" name="copyright" size="large" /> | 50 <Icon name="ticket" size="large" /> </div>
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header><Button>Top 50 <Icon name="arrow right"/></Button></List.Header>
                        </List.Content>
                      </List.Item>
                    </List>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column textAlign="center" computer={8} mobile={16}>
                <Card fluid>
                  <Card.Content>
                    {/* @todo get currentUser nbBets per bet type - see StatsPie in db.json */}
                    <Card.Header>Stats</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <div className="doughnut-container-max-size">
                      <Doughnut data={datasetPieGraph} legend={{position: 'bottom'}}/>
                    </div>
                    {/* @todo buttons to switch between 2 datasets ?? betsPerType and ??? */}
                    <div className='ui two buttons'>
                      <Button.Group fluid>
                        <Button onClick={this.loadBetsPerTypeDataset} active={isDatasetBetsActive} primary={isDatasetBetsActive}>Bets</Button>
                        <Button.Or />
                        <Button onClick={this.loadCoinsUsageDataset} active={isDatasetCoinsActive} primary={isDatasetCoinsActive}>Coins</Button>
                      </Button.Group>
                    </div>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Dashboard;

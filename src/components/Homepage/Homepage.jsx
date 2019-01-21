import React from 'react';
import {Link} from 'react-router-dom';

function Homepage() {
  return (
    <div>
      <div className="pusher" id="homepage">
        <div className="ui inverted vertical masthead center aligned segment hp-Header">
          <div className="mask"/>
          <div className="ui container">
            <div className="ui large secondary  menu">
              <div className="right item">
                <Link to="/login" className="ui inverted button">Log in</Link>
                <Link to="/signup" className="ui inverted button">Sign up</Link>
              </div>
            </div>
          </div>

          <div className="ui text container">
            <h1 className="ui inverted header">
                  3wBet-Manager
            </h1>
            <h2>Manage your bets</h2>
            <Link to="/login" className="ui huge red button">
              Let's go !
              <i className="right arrow icon" />
            </Link>
          </div>

        </div>

        <div className="ui vertical stripe segment">
          <div className="ui middle aligned stackable grid container">
            <div className="row">
              <div className="eight wide column">
                <h3 className="ui header">What is it ?</h3>
                <p>
                    3wBet Manager invite you to manage your bets for free !<br/>
                    Earn points and spend them to submit new bets.<br/>
                    You can use our lovely app to store your real-life's football bet.<br/><br/>

                    In addition, you can compare your skills against many other people with some fancy statistics.

                </p>
              </div>
              <div className="six wide right floated column">
                <img
                  src="assets/images/first-section.jpg"
                  className="ui large bordered rounded image"
                />
              </div>
            </div>
            <div className="row">
              <div className="six wide left floated column">
                <img
                  src="assets/images/second-section.jpg"
                  className="ui large bordered rounded image"
                />
              </div>
              <div className="eight wide right column">
                <h3 className="ui header">Why use it ?</h3>
                <p>
                  First of all, it's free. <br/>
                  Second, you're able to store all your past, present and futur bets in one app, for every football cup !<br/><br/>
                  In addition, you will be notified in your web browser about what happened for each followed plays.

                  Finally, you can improve your skills thanks to the statistics panel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

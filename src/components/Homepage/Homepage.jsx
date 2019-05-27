import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div>
      <div className="pusher" id="homepage">
        <div className="ui inverted vertical masthead center aligned segment hp-Header" style={{ backgroundImage: 'url("assets/images/homeBanner.jpg")' }}>
          <div className="ui container">
            <div className="ui large secondary  menu">
              <div className="right item">
                <Link to="/login" className="ui inverted button">Log in</Link>
                <Link to="/signup" className="ui inverted button">Sign up</Link>
              </div>
            </div>
          </div>

          <div className="ui text container brand">
            <img src="assets/images/logo-brand.svg" alt="brand" />
            <h1>Manage your bets</h1>
          </div>
        </div>

        <div className="ui vertical stripe segment bg-vue homepage-dark">
          <div className="ui middle aligned stackable grid container">
            <div className="row">
              <div className="eight wide column">
                <h3 className="ui header">What is it ?</h3>
                <p>
                    3wBet Manager invite you to manage your bets for free !
                  <br />
                    Earn points and spend them to submit new bets.
                  <br />
                    You can use our lovely app to store your real-life's football bet.
                  <br />
                  <br />
                    In addition, you can compare your skills against many other people with some
                    fancy statistics.
                </p>
              </div>
              <div className="six wide right floated column">
                <img
                  src="assets/images/first-section.jpg"
                  className="ui large bordered rounded image"
                  alt="football"
                />
              </div>
            </div>
            <div className="row">
              <div className="six wide left floated column">
                <img
                  src="assets/images/second-section.jpg"
                  className="ui large bordered rounded image"
                  alt="football"
                />
              </div>
              <div className="eight wide right column">
                <h3 className="ui header">Why use it ?</h3>
                <p>
                  First of all, it's free.
                  <br />
                  Second, you're able to store all your past, present and futur bets in
                  one app, for every football cup !
                  <br />
                  <br />
                  In addition, you will be notified in your web browser about what happened
                  for each followed plays.
                  Finally, you can improve your skills thanks to the statistics panel.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="ui inverted vertical footer segment">
          <div className="ui container">
            <div className="ui stackable inverted divided equal height stackable grid">
              <div className="three wide column">
                <h4 className="ui inverted header">Shorcuts</h4>
                <div className="ui inverted link list">
                  <a href="/login" className="item">Sign in</a>
                  <a href="/signup" className="item">Sign up</a>
                </div>
              </div>
              <div className="three wide column">
                <h4 className="ui inverted header">Contact</h4>
                <div className="ui inverted link list">
                  <a href="mailto:awfl@adw.fr" className="item">awfl@adw.fr</a>
                </div>
              </div>
              <div className="seven wide column">
                <h4 className="ui inverted header">Details</h4>
                <p>Edited by ADW LTE, France</p>
                <p>All rights reserved, 2019</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

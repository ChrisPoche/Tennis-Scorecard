import React from 'react';
import SettingPage from './SettingPage';
import MainHeader from './MainHeader';

const points = ['0', '15', '30', '40', 'AD', '-'];

class App extends React.Component {
  state = {
    menuPage: false,
    settingPage: false,
    logging: false,
    score: [],
    tiebreaker: false,
    game: { P1S: 0, P2S: 0 },
    points: { P1: 0, P2: 0 },
    P1Name: 'Player 1',
    P2Name: 'Player 2'
  };
  componentDidUpdate(prevProps, prevState) {
    const sp = document.getElementById('settings-page');
    if (sp !== null) {
      sp.style.top = '0vh';
    }
    if (this.state.logging === true) {
      if (this.state.menuPage !== prevState.menuPage) {
        this.state.menuPage === true ? console.log('opening menu') : console.log('closing menu');
      }
      else if (this.state.settingPage !== prevState.settingPage) {
        this.state.settingPage === true ? console.log('opening settings') : console.log('closing settings');
      }
      console.log('State', this.state);
    }
  };
  componentDidMount() {
    window.addEventListener('keypress', (e) => {
      e.key === 'l' && this.state.logging === false ? this.setState({ logging: true }) : this.setState({ logging: false });
    });
  };
  toggleMenu = () => {
    this.state.menuPage === true ? this.setState({ menuPage: false }) : this.setState({ menuPage: true });
    return
  };
  toggleSettings = () => {
    this.state.settingPage === true ? this.setState({ settingPage: false }) : this.setState({ settingPage: true });
    return
  };
  addPoint = (player) => {
    if (this.state.points.P1 === this.state.points.P2 && this.state.points.P1 === 3) player === 'P1' ? this.setState({ points: { P1: this.state.points.P1 + 1, P2: 5 } }) : this.setState({ points: { P2: this.state.points.P2 + 1, P1: 5 } });
    else if (this.state.game.P2S === this.state.game.P1S && this.state.game.P2S === 6) { // Tiebreaker
      if ((this.state.tiebreaker.P1T + 1 >= this.state.tiebreaker.P2T + 2 && this.state.tiebreaker.P1T + 1 >= 7) || (this.state.tiebreaker.P1T + 2 <= this.state.tiebreaker.P2T + 1 && this.state.tiebreaker.P2T + 1 >= 7)) {
        if (this.state.score.length === 0) { // First set tiebreaker
          player === 'P1'
            ? this.setState(prevState => ({
              points: { P1: 0, P2: 0 },
              score: [{ ...prevState.game, P1S: this.state.game.P1S + 1, P1T: this.state.tiebreaker.P1T + 1, P2T: this.state.tiebreaker.P2T }],
              game: { P1S: 0, P2S: 0 },
              tiebreaker: false
            }))
            : this.setState(prevState => ({
              points: { P1: 0, P2: 0 },
              score: [{ ...prevState.game, P2S: this.state.game.P2S + 1, P2T: this.state.tiebreaker.P2T + 1, P1T: this.state.tiebreaker.P1T }],
              game: { P1S: 0, P2S: 0 },
              tiebreaker: false
            }));
        }
        else { // Subsequent set tiebreaker
          player === 'P1'
            ? this.setState(prevState => ({
              points: { P1: 0, P2: 0 },
              score: [...prevState.score,
              { ...prevState.game, P1S: this.state.game.P1S + 1, P1T: this.state.tiebreaker.P1T + 1, P2T: this.state.tiebreaker.P2T }],
              game: { P1S: 0, P2S: 0 },
              tiebreaker: false
            }))
            : this.setState(prevState => ({
              points: { P1: 0, P2: 0 },
              score: [...prevState.score,
              { ...prevState.game, P2S: this.state.game.P2S + 1, P2T: this.state.tiebreaker.P2T + 1, P1T: this.state.tiebreaker.P1T }],
              game: { P1S: 0, P2S: 0 },
              tiebreaker: false
            }));
        }
      }
      else {
        player === 'P1' ? this.setState(prevState => ({ tiebreaker: { ...prevState.tiebreaker, P1T: this.state.tiebreaker.P1T + 1 } })) : this.setState(prevState => ({ tiebreaker: { ...prevState.tiebreaker, P2T: this.state.tiebreaker.P2T + 1 } }));
      }
    }
    else if (this.state.points.P1 === 3 && player === 'P1') {
      if (this.state.score.length === 0) { // First Set
        if ((this.state.game.P1S + 1 === 6 && this.state.game.P2S < 5) || (this.state.game.P2S === 5 && this.state.game.P1S + 1 === 7)) {  // End of first set if 6 : <5
          this.setState(prevState => ({
            points: { P1: 0, P2: 0 },
            score: [
              { ...prevState.game, P1S: this.state.game.P1S + 1 }],
            game: { P1S: 0, P2S: 0 }
          }))
        }
        else { // Add game to first set
          this.setState(prevState => ({
            points: { P1: 0, P2: 0 },
            game: { ...prevState.game, P1S: this.state.game.P1S + 1 }
          }))
          if (this.state.game.P2S === this.state.game.P1S + 1 && this.state.game.P2S === 6 && !this.state.tiebreaker) this.setState({ tiebreaker: { P1T: 0, P2T: 0 } });
        }
      }
      else { // Anything after first set
        if ((this.state.game.P1S + 1 === 6 && this.state.game.P2S < 5) || (this.state.game.P2S === 5 && this.state.game.P1S + 1 === 7)) { // End of subsequent set if 6 : <5
          this.setState(prevState => ({
            points: { P1: 0, P2: 0 },
            score: [...prevState.score,
            { ...prevState.game, P1S: this.state.game.P1S + 1 }],
            game: { P1S: 0, P2S: 0 }
          }))
        }
        else { // Add game to subsequent set
          this.setState(prevState => ({
            points: { P1: 0, P2: 0 },
            game: {
              ...prevState.game,
              P1S: this.state.game.P1S + 1
            }
          }))
          if (this.state.game.P2S === this.state.game.P1S + 1 && this.state.game.P2S === 6 && !this.state.tiebreaker) this.setState({ tiebreaker: { P1T: 0, P2T: 0 } });
        }
      }
    }
    else if (this.state.points.P2 === 3 && player === 'P2') {
      if (this.state.score.length === 0) { // First Set
        if ((this.state.game.P2S + 1 === 6 && this.state.game.P1S < 5) || (this.state.game.P1S === 5 && this.state.game.P2S + 1 === 7)) {  // End of first set if 6 : <5 || 7 : 5
          this.setState(prevState => ({
            points: { P1: 0, P2: 0 },
            score: [
              { ...prevState.game, P2S: this.state.game.P2S + 1 }],
            game: { P2S: 0, P1S: 0 }
          }))
        }
        else { // Add game to first set
          this.setState(prevState => ({
            points: { P1: 0, P2: 0 },
            game: { ...prevState.game, P2S: this.state.game.P2S + 1 }
          }))
          if (this.state.game.P1S === this.state.game.P2S + 1 && this.state.game.P1S === 6 && !this.state.tiebreaker) this.setState({ tiebreaker: { P1T: 0, P2T: 0 } });
        }
      }
      else { // Anything after first set
        if ((this.state.game.P2S + 1 === 6 && this.state.game.P1S < 5) || (this.state.game.P1S === 5 && this.state.game.P2S + 1 === 7)) { // End of subsequent set if 6 : <5 || 7 : 5
          this.setState(prevState => ({
            points: { P1: 0, P2: 0 },
            score: [...prevState.score,
            { ...prevState.game, P2S: this.state.game.P2S + 1 }],
            game: { P2S: 0, P1S: 0 }
          }))
        }

        else { // Add game to subsequent set
          this.setState(prevState => ({
            points: { P1: 0, P2: 0 },
            game: {
              ...prevState.game,
              P2S: this.state.game.P2S + 1
            }
          }))
          if (this.state.game.P1S === this.state.game.P2S + 1 && this.state.game.P1S === 6 && !this.state.tiebreaker) this.setState({ tiebreaker: { P1T: 0, P2T: 0 } });
        }
      }
    }
    else if (this.state.points.P1 === 4) { // Handling Deuce P1
      if (player === 'P2') {
        this.setState({ points: { P1: 3, P2: 3 } })
      }
      else {
        if (this.state.score.length === 0) {
          if (this.state.game.P1S + 1 === 6 && this.state.game.P2S < 5) {
            this.setState(prevState => ({ points: { P1: 0, P2: 0 }, score: [{ ...prevState.game, P1S: this.state.game.P1S + 1 }] }))
          }
          else {
            this.setState(prevState => ({
              points: { P1: 0, P2: 0 },
              game: { ...prevState.game, P1S: this.state.game.P1S + 1 }
            }))
          }
        }
        else {
          if (this.state.game.P1S + 1 === 6 && this.state.game.P2S < 5) {
            this.setState(prevState => ({ points: { P1: 0, P2: 0 }, score: [...prevState.score, { ...prevState.game, P1S: this.state.game.P1S + 1 }] }));
          }
          else {
            this.setState(prevState => ({
              points: { P1: 0, P2: 0 },
              game: {
                ...prevState.game,
                P1S: this.state.game.P1S + 1
              }
            }))
          }
        }
      }
    }
    else if (this.state.points.P2 === 4) { // Handling Deuce P2
      if (player === 'P1') {
        this.setState({ points: { P1: 3, P2: 3 } })
      }
      else {
        if (this.state.score.length === 0) {
          if (this.state.game.P2S + 1 === 6 && this.state.game.P1S < 5) {
            this.setState(prevState => ({ points: { P1: 0, P2: 0 }, score: [{ ...prevState.game, P2S: this.state.game.P2S + 1 }] }))
          }
          else {
            this.setState(prevState => ({
              points: { P1: 0, P2: 0 },
              game: { ...prevState.game, P2S: this.state.game.P2S + 1 }
            }))
          }
        }
        else {
          if (this.state.game.P2S + 1 === 6 && this.state.game.P1S < 5) {
            this.setState(prevState => ({ points: { P1: 0, P2: 0 }, score: [...prevState.score, { ...prevState.game, P2S: this.state.game.P2S + 1 }] }));
          }
          else {
            this.setState(prevState => ({
              points: { P1: 0, P2: 0 },
              game: {
                ...prevState.game,
                P2S: this.state.game.P2S + 1
              }
            }))
          }
        }

      }
    }
    else if (player === 'P1') this.setState(prevState => ({ points: { ...prevState.points, P1: this.state.points.P1 + 1 } })); // Add a point for P1
    else if (player === 'P2') this.setState(prevState => ({ points: { ...prevState.points, P2: this.state.points.P2 + 1 } })); // Add a point for P2
  };
  render() {
    return (
      <div>
        <div className='container'>
          {this.state.menuPage === true && <MenuPage />}
          {this.state.settingPage === true && <SettingPage toggleSettings={this.toggleSettings} />}
          {this.state.settingPage !== true && <MainHeader toggleSettings={this.toggleSettings} toggleMenu={this.toggleMenu} />}
          <div className='row score-card'>
            <table>
              <tbody>
                <tr>
                  <td className='player-name'></td>
                  {this.state.score.length === 0 ? <td>1</td> : this.state.score.concat(this.state.game).map((set, index) => (<td key={'Set' + index + 1}>{index + 1}</td>))}
                </tr>
                <tr>
                  <td className='player-name'>{this.state.P1Name}</td>
                  {this.state.score.length > 0 ? this.state.score.map((set, index) => (<td key={'P1Set' + index + 1}>{set.P1S}{set.P1T && <span className='tiebreaker'>{set.P1T === 0 ? 0 : set.P1T }</span>}</td>)) : <td>{this.state.game.P1S}</td>}
                  {this.state.score.length > 0 && <td>{this.state.game.P1S}</td>}
                  <td className='points'>{this.state.tiebreaker ? this.state.tiebreaker.P1T : points[this.state.points.P1]}</td>
                </tr>
                <tr>
                  <td className='player-name'>{this.state.P2Name}</td>
                  {this.state.score.length > 0 ? this.state.score.map((set, index) => (<td key={'P2Set' + index + 1}>{set.P2S}{set.P2T && <span className='tiebreaker'>{set.P2T === 0 ? '0' : set.P2T}</span>}</td>)) : <td>{this.state.game.P2S}</td>}
                  {this.state.score.length > 0 && <td>{this.state.game.P2S}</td>}
                  <td className='points'>{this.state.tiebreaker ? this.state.tiebreaker.P2T : points[this.state.points.P2]}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='row'>
            <button id='P1' onClick={(e) => { this.addPoint(e.target.id) }}>Add Point</button>
          </div>
          <div className='row'>
            <button id='P2' onClick={(e) => { this.addPoint(e.target.id) }}>Add Point</button>
          </div>
        </div>
      </div>
    )
  };
};

export default App;

import React from 'react';
import Theme from './Theme';
import LoginLayout from './layouts/Login';
import HomeLayout from './layouts/Home';
import FriendsLayout from './layouts/Friends';
import './App.css';
import Header from './components/Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Alert from './components/Alert';

class Main extends React.Component {
  constructor() {
    super()
    this.state = {header: 'Home'}
    this.alert = React.createRef()
  }

  changeHeader(header) {
    if (this.state.header === header) return
    else this.setState({header})
  }

  render() {
    const Login = () => {
      return <LoginLayout
        alert={this.alert}
        changeHeader={this.changeHeader.bind(this)} />
    }

    const Register = () => {
      return <LoginLayout register={true}
        alert={this.alert}
        changeHeader={this.changeHeader.bind(this)} />
    }

    const Home = () => {
      return <HomeLayout
        alert={this.alert}
        changeHeader={this.changeHeader.bind(this)} />
    }

    const Friends = () => {
      return <FriendsLayout
        alert={this.alert}
        changeHeader={this.changeHeader.bind(this)} />
    }

    return (
      <Router>
        <MuiThemeProvider theme={Theme}>
          <React.Fragment>
            <CssBaseline />
            <Header header={this.state.header}/>
            <div className="mainView">
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/friends" component={Friends} />
            </div>
            <Alert ref={this.alert} />
          </React.Fragment>
        </MuiThemeProvider>
      </Router>
    );
  }
}

function App() {
  return (
    <Main />
  );
}

export default App;
import React from 'react'

import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'
import Config from '../Config'
import Utils from '../Utils'
import { Redirect } from 'react-router'

class Login extends React.Component {
  constructor(props) {
    super()
    this.props = props
    this.state = {}
    if (this.props.register) this.props.changeHeader('Register')
    else this.props.changeHeader('Login')
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  async onLogin() {
    if (this.state.username === '' || this.state.password === '') {
      return this.props.alert.current.show({
        title: 'Please fill in',
        text: 'Please fill in your username and password'
      })
    } else {
      this.setState({loading: true})
      const {username, password} = this.state
      const res = await axios.post(`${Config.BACKEND}/login`, {
        username, password
      })
      this.setState({loading: false})
      if (res.data.token) {
        Utils.setLocalStorage('token', res.data.token)
        this.setState({redirect: '/'})
      } else {
        return this.props.alert.current.show({
          title: 'Error',
          text: res.data.error
        })
      }
    }
  }

  async onRegister() {
    if (this.state.username === '' || this.state.password === '') {
      return this.props.alert.current.show({
        title: 'Please fill in',
        text: 'Please fill in your username and password'
      })
    } else {
      this.setState({loading: true})
      const {username, password} = this.state
      const res = await axios.post(`${Config.BACKEND}/register`, {
        username, password
      })
      this.setState({loading: false})
      if (res.data._id) {
        this.props.alert.current.show({
          title: 'Register successful',
          text: 'Please login to continue'
        })
        this.setState({redirect: '/login'})
      } else {
        return this.props.alert.current.show({
          title: 'Error',
          text: res.data.error
        })
      }
    }
  }

  render() {
    var classes = {
      input: {
        marginBottom: '20px',
        width: '500px',
        maxWidth: '100%'
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      cardStyle: {
        maxWidth: '500px',
        marginTop: '20px',
        marginRight: 'auto',
        marginLeft: 'auto',
      }
    }

    const loading = <div>
      <br/><br/><br/>
      <center><CircularProgress /></center>
    </div>

    const form = (
      <div>
        <Card style={classes.cardStyle}>
          <CardContent>
            <Typography variant="h5" component="h2">Dinosaur</Typography>
            {this.props.register
              ? <Typography color="textSecondary">Please fill in the registration form</Typography>
              : <Typography color="textSecondary">Please login to continue</Typography>
            }
            <TextField
              label="Username"
              type="text"
              value={this.state.username}
              style={classes.input}
              onChange={this.handleChange('username')}
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={this.state.password}
              style={classes.input}
              onChange={this.handleChange('password')}
              margin="normal"
            />
            {this.props.register
              ? <div>
                  <Button onClick={this.onRegister.bind(this)} color='primary'>Register</Button>
                  <Button onClick={() => this.setState({redirect: '/login'})} color='primary'>Back</Button>
                </div>
              : <div>
                  <Button onClick={this.onLogin.bind(this)} color='primary'>Login</Button>
                  <Button onClick={() => this.setState({redirect: '/register'})} color='primary'>Register</Button>
                </div>
            }
          </CardContent>        
        </Card>
      </div>
    )

    if (this.state.redirect) return <Redirect to={this.state.redirect} />
    return this.state.loading ? loading : form
  }
}

export default Login
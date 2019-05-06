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

class Welcome extends React.Component {
  constructor(props) {
    super()
    this.props = props
    this.state = {}
  }

  componentDidMount() {
    this.props.changeHeader('Login')
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
      const {username, password} = this.state
      const res = await axios.post(`${Config.BACKEND}/login`, {
        username, password
      })
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
      <CircularProgress />
    </div>

    const form = (
      <div>
        <Card style={classes.cardStyle}>
          <CardContent>
            <Typography variant="h5" component="h2">Dinosaur</Typography>
            <Typography color="textSecondary">Please login to continue</Typography>
            <TextField
              label="Username"
              type="text"
              value={this.state.quiz1}
              style={classes.input}
              onChange={this.handleChange('username')}
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={this.state.quiz1}
              style={classes.input}
              onChange={this.handleChange('password')}
              margin="normal"
            />
            <Button onClick={this.onLogin.bind(this)} color='primary'>Login</Button>
          </CardContent>        
        </Card>
      </div>
    )

    if (this.state.redirect) return <Redirect to={this.state.redirect} />
    return this.state.loading ? loading : form
  }
}

export default Welcome
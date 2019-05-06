import React from 'react'

import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'
import Config from '../Config'
import Utils from '../Utils'
import Profile from '../components/Profile'
import ProfileEdit from '../components/ProfileEdit'

class Home extends React.Component {
  constructor(props) {
    super()
    this.props = props
    this.state = {
      loading: true,
      profile: null
    }
    this.props.changeHeader('Dinosaur')
    this.token = Utils.getLocalStorage('token')
    this.loadData()
  }

  async loadData() {
    if (!this.token) window.location.href = '/login'
    const res = await axios.get(`${Config.BACKEND}/dinosaur/me?token=${this.token}`)
    this.setState({loading: false, profile: res.data})
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  onClickEdit() {
    this.setState({edit: true})
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

    const home = (
      <div style={classes.cardStyle}>
        <Profile profile={this.state.profile} edit={this.onClickEdit.bind(this)} />
      </div>
    )

    const edit = (
      <div style={classes.cardStyle}>
        <ProfileEdit profile={this.state.profile} />
      </div>
    )

    if (this.state.redirect) return <Redirect to={this.state.redirect} />
    return this.state.loading ? loading :
      this.state.edit ? edit : home
  }
}

export default Home
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Utils from '../Utils'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends React.Component {
  constructor(props) {
    super()
    this.props = props
    this.state = {
      anchorEl: null
    }
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked })
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  doLogout = () => {
    Utils.removeLocalStorage('token')
    window.location.href = '/login'
  }

  render() {
    const { match, location, history } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    const path = location.pathname
    const showBtns = !path.startsWith('/login') && !path.startsWith('/register')
    var title = this.props.header
    if (path.startsWith('/admin')) title = 'Admin'

    const goToHome = () => history.push('/')

    return (
      <div style={styles.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit" style={styles.grow}>
              {title}
            </Typography>

            { showBtns ? <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              > 
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={() => {window.location.href = '/'}}>Profile</MenuItem>
                <MenuItem onClick={() => {window.location.href = '/friends'}}>Friends</  MenuItem>
                <MenuItem onClick={this.doLogout.bind(this)}>Logout</  MenuItem>
              </Menu>
            </div> : null}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const AdaptiveHeader = withRouter(Header)

export default AdaptiveHeader
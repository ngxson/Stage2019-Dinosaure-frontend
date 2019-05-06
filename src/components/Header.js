import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

const styles = {
  root: {
    flexGrow: 1,
    display: 'fixed',
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
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { match, location, history } = this.props

    const path = location.pathname
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
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const AdaptiveHeader = withRouter(Header)

export default AdaptiveHeader
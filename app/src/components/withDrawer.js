import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import InboxIcon from '@material-ui/icons/Inbox'
import StarIcon from '@material-ui/icons/Star'
import DraftsIcon from '@material-ui/icons/Drafts'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { DRAWER_TOGGLED } from '../constants'

const VeteranListItems = (
  <div>
    <Link to="/" className="router-link">
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    <Link to="/resources" className="router-link">
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Resources" />
      </ListItem>
    </Link>
  </div>
)

const withDrawer = function(PageComponent) {
  const WrappedDrawerPageComponent = props => {
    return (
      <div>
        <PageComponent {...props} />
        <Drawer open={props.open} onClose={props.toggleDrawer}>
          <div tabIndex={0} role="button">
            {VeteranListItems}
          </div>
        </Drawer>
      </div>
    )
  }

  const mapStateToProps = state => {
    return { open: state.drawer.open }
  }
  const mapActionsToProps = dispatch => {
    return {
      toggleDrawer: () => {
        console.log('FIRE!!!')
        dispatch({ type: DRAWER_TOGGLED })
      }
    }
  }

  const connector = connect(
    mapStateToProps,
    mapActionsToProps
  )

  return connector(WrappedDrawerPageComponent)
}

export default withDrawer

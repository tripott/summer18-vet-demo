import React from "react"
import Drawer from "@material-ui/core/Drawer"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import HomeIcon from "@material-ui/icons/Home"
import StarIcon from "@material-ui/icons/Star"
import DraftsIcon from "@material-ui/icons/Drafts"
import { Link } from "react-router-dom"

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
  </div>
)

const withDrawer = function(PageComponent) {
  const WrappedDrawerPageComponent = props => {
    return (
      <div>
        <PageComponent {...props} />
        <Drawer open={true}>
          <div tabIndex={0} role="button">
            {VeteranListItems}
          </div>
        </Drawer>
      </div>
    )
  }

  return WrappedDrawerPageComponent
}

export default withDrawer
